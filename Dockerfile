# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────────────────────
# CaptionFlow — multi-stage build
#
# Debian (not Alpine) is required: onnxruntime-node, sharp and the
# ffmpeg-static binaries are all glibc-linked native modules.
# ─────────────────────────────────────────────────────────────────────────────

ARG NODE_VERSION=22

# ─── Stage 1: dependencies ────────────────────────────────────────────────
FROM node:${NODE_VERSION}-bookworm-slim AS deps
WORKDIR /app

# ffmpeg-static / ffprobe-static / onnxruntime-node fetch prebuilt binaries on
# postinstall, so npm needs a toolchain and CA certs to fetch over HTTPS.
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates python3 make g++ \
 && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
# --ignore-scripts would skip the binary downloads above — do not add it.
RUN npm ci --no-audit --no-fund

# npm does not always hoist onnxruntime-node; in this tree it lands nested at
# node_modules/@huggingface/transformers/node_modules/. Normalise both layouts
# into one predictable path so the runner stage can copy it unconditionally
# (a COPY of a missing source fails the build).
RUN mkdir -p /opt/native \
 && (cp -r node_modules/onnxruntime-node /opt/native/ 2>/dev/null \
     || cp -r node_modules/@huggingface/transformers/node_modules/onnxruntime-node /opt/native/) \
 && test -d /opt/native/onnxruntime-node \
 && echo "onnxruntime-node staged at /opt/native/onnxruntime-node"


# ─── Stage 2: build ───────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-bookworm-slim AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# This project has no public/ directory today; create it so the runner-stage
# COPY of ./public cannot fail if assets are added later.
RUN mkdir -p public

RUN npm run build

# Next's standalone output mirrors the whole project root, which drags .env and
# the entire .git history into .next/standalone. .dockerignore already keeps
# them out of the build context, but strip them here too so the runtime image
# can never contain secrets or repo history.
RUN rm -rf .next/standalone/.env .next/standalone/.env.* .next/standalone/.git


# ─── Stage 3: runtime ─────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    TEMP_DIR=/data/temp \
    WHISPER_CACHE_DIR=/data/models

# ffmpeg + ffprobe on PATH. lib/ffmpeg/paths.ts falls back to the bare binary
# names when the static npm packages cannot be resolved, so these are the
# safety net that keeps audio extraction working in the image.
RUN apt-get update \
 && apt-get install -y --no-install-recommends ffmpeg \
 && rm -rf /var/lib/apt/lists/*

# Run unprivileged. /data is the writable volume for uploads + model cache.
RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs \
 && mkdir -p /data/temp /data/models \
 && chown -R nextjs:nodejs /data

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Next's standalone tracer does not follow native/dynamic requires, so
# onnxruntime-node is absent from .next/standalone. Copy it in explicitly or
# Whisper cannot load its .node binary at runtime.
COPY --from=deps --chown=nextjs:nodejs /opt/native/onnxruntime-node ./node_modules/onnxruntime-node
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/sharp ./node_modules/sharp
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/@img ./node_modules/@img

USER nextjs
EXPOSE 3000

# Only checks the server is serving — it deliberately does not exercise the
# Whisper pipeline, since the first run downloads a ~150 MB model.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]