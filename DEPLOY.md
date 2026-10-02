# Deploying CaptionFlow

Whisper runs **in-process** via `onnxruntime-node`, so the container needs a real
CPU, ~4 GB RAM, and outbound access to `huggingface.co` on first request.

---

## 1. Build and run locally

```bash
docker build -t captionflow:latest .
docker run -d --name captionflow -p 3000:3000 \
  -v captionflow-data:/data/temp \
  -v captionflow-models:/data/models \
  captionflow:latest
```

Or with compose (same thing, plus resource limits):

```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```

Then open <http://localhost:3000>.

**Use volumes.** Without `-v captionflow-models:/data/models` the Whisper model
lands in the image's node_modules and is re-downloaded (~150 MB) after every
rebuild. Without the data volume, uploads vanish on restart.

---

## 2. Push to Docker Hub

```bash
# one-time: create the repo at hub.docker.com, then
docker login

# tag and push (lowercase username/repo required)
docker tag captionflow:latest <docker-username>/captionflow:latest
docker push <docker-username>/captionflow:latest
```

---

## 3. Auto-deploy on push (GitHub Actions)

`.github/workflows/deploy.yml` builds on every push to `main` and pushes to
Docker Hub.

**Required secret:** `DOCKERHUB_TOKEN` — a Docker Hub **Access Token**
(Account Settings → Personal access tokens), *not* your password.
Add it under **Settings → Secrets and variables → Actions**.

```bash
git add .github/workflows/deploy.yml Dockerfile .dockerignore docker-compose.yml
git commit -m "ci: build and push image to Docker Hub on push to main"
git push
```

---

## 4. Auto-deploy to a host (SSH)

Run on the server:

```bash
mkdir -p ~/captionflow && cd ~/captionflow
git clone <your-repo-url> .
docker compose up -d --build
```

Then add this to `.github/workflows/deploy.yml`:

```yaml
- name: Deploy over SSH
  uses: appleboy/ssh-action@v1
  with:
    host: ${{ secrets.DEPLOY_HOST }}
    username: ${{ secrets.DEPLOY_USER }}
    key: ${{ secrets.DEPLOY_SSH_KEY }}
    script: cd ~/captionflow && git pull && docker compose up -d --build
```

---

## 5. One-click platforms

| Platform | How |
| --- | --- |
| **Railway** | New Project → Deploy from Docker repo. Volumes: `/data/temp` + `/data/models`. |
| **Render** | New → Web Service → Docker. Disk mounted at `/data`. |
| **Fly.io** | `fly launch --dockerfile Dockerfile --vm-size shared-cpu-2x --memory 4096` then `fly volumes create models_data --size 1` and mount at `/data/models`. |
| **Coolify / Dokploy** | Point at the repo, set Dockerfile, add the two volumes. |

All of them need `WHISPER_MODEL=base` set, and both volumes mounted, or you
re-download the model on every restart.

---

## Environment variables

| Variable | Default | Used by |
| --- | --- | --- |
| `WHISPER_MODEL` | `base` | `lib/transcription/whisper.ts` — model size alias or full HF id |
| `MAX_FILE_SIZE_MB` | `500` | `app/api/upload/route.ts` — server-side upload cap |
| `NEXT_PUBLIC_MAX_FILE_SIZE_MB` | `500` | `components/upload/UploadZone.tsx` — the "Up to X MB" label only |
| `WHISPER_CACHE_DIR` | unset | `lib/transcription/whisper.ts` — model cache (set this in Docker) |
| `TEMP_DIR` | `os.tmpdir()/captionflow` | `lib/utils/tempFiles.ts` — uploads + audio scratch |
| `FFMPEG_PATH` / `FFPROBE_PATH` | auto-detected | `lib/ffmpeg/paths.ts` — override binary discovery |

All are optional. Every one has a default, so the app boots with no `.env` at all.

> `MAX_FILE_SIZE_MB` and `NEXT_PUBLIC_MAX_FILE_SIZE_MB` are separate variables.
> Set **both** or the UI label will disagree with the limit actually enforced.

---

## Troubleshooting

**`Error: /onnxruntime_binding.node` or similar on first transcription**
`onnxruntime-node` is not covered by Next's standalone file tracing, so the
Dockerfile copies it in explicitly. If you add another native dependency, add it
to that `COPY` list too.

**Container restarts / OOMKilled during transcription**
Bump memory to 4 GB+ (`docker compose` already sets `deploy.resources.limits`).
`whisper-small` and above need considerably more than `base`.

**First upload takes minutes**
That is the model downloading. It happens once per volume — check
`docker compose logs -f` for `[whisper] Loading model`.

**`FFprobe not found`**
The image installs ffmpeg via apt as a fallback. If you build with
`--target` something custom, confirm `ffmpeg -version` works in the runner stage.

**422 "No speech detected" on a video with clear speech**
This was the old `@xenova/transformers` v2 bug (`return_timestamps` threw and the
fallback hallucinated). Fixed by moving to `@huggingface/transformers` v4 — make
sure the deployed image is built from current `main`.

---

## Image size

The runner image is roughly 1.5–2 GB: ~700 MB of that is ffmpeg, the rest is the
ONNX runtime, `sharp`, and the Node base layer. `output: 'standalone'` in
`next.config.js` is what keeps the app code itself small.