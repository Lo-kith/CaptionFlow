/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a self-contained server bundle in .next/standalone so the Docker
  // runner image can stay small. Required for the Dockerfile.
  output: 'standalone',

  // Keep native / dynamically-loaded packages out of the server bundle so
  // Next resolves them from node_modules at runtime. Bundling these breaks
  // their native binaries (.node) and wasm backends.
  serverExternalPackages: [
    'fluent-ffmpeg',
    'formidable',
    '@huggingface/transformers',
    'onnxruntime-node',
    'onnxruntime-web',
    'sharp',
    'wavefile',
    'ffmpeg-static',
    'ffprobe-static',
  ],
}

module.exports = nextConfig