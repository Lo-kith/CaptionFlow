/**
 * Local Whisper transcription using @xenova/transformers (Transformers.js).
 *
 * Runs entirely on-device — no API key, no internet required after
 * the first model download. Models are cached in the HuggingFace
 * cache directory (~/.cache/huggingface/hub).
 *
 * Audio pipeline:
 *   Video → FFmpeg (16 kHz mono WAV) → wavefile decoder → Float32Array
 *     → Xenova/whisper-* → chunk timestamps → SubtitleSegment[]
 */

import fs from 'fs'
import { pipeline, env } from '@xenova/transformers'
import { WaveFile } from 'wavefile'
import { TranscriptionService } from './service'
import { TranscriptionResult, WhisperOutput, DEFAULT_WHISPER_MODEL } from './types'
import { SubtitleSegment } from '@/types/subtitle'

// ─── Configure transformers.js for server-side Node.js ────────────────────

// Prevent the library from trying to use browser-only APIs
env.useBrowserCache = false
env.allowLocalModels = false  // always fetch from HuggingFace hub

// ─── Singleton pipeline (shared across requests) ──────────────────────────

type ASRPipeline = Awaited<ReturnType<typeof pipeline>>

let _pipelinePromise: Promise<ASRPipeline> | null = null
let _loadedModelId: string | null = null

/**
 * Lazily load (and cache) the ASR pipeline.
 * The first call downloads the model; subsequent calls reuse it.
 */
async function getOrCreatePipeline(modelId: string): Promise<ASRPipeline> {
  // If model changed, reset
  if (_loadedModelId && _loadedModelId !== modelId) {
    _pipelinePromise = null
    _loadedModelId = null
  }

  if (!_pipelinePromise) {
    console.log(`[whisper] Loading model "${modelId}" (first-time download may take a few minutes)...`)
    _loadedModelId = modelId
    _pipelinePromise = pipeline('automatic-speech-recognition', modelId, {
      // Use quantized (int8) ONNX model for faster inference + smaller download
      quantized: true,
    })
  }

  return _pipelinePromise
}

// ─── WAV audio decoder ────────────────────────────────────────────────────

/**
 * Read a WAV file and return its samples as a Float32Array at 16 kHz.
 *
 * FFmpeg has already output 16 kHz mono PCM, but we use wavefile to
 * robustly decode the RIFF header and handle edge cases.
 */
function decodeWavFile(filePath: string): Float32Array {
  const buffer = fs.readFileSync(filePath)
  const wav = new WaveFile(buffer)

  // Normalize to 32-bit float and 16 kHz (Whisper requirement)
  wav.toBitDepth('32f')
  wav.toSampleRate(16000)

  // getSamples() returns an array of channel arrays; take the first channel
  const raw = wav.getSamples()
  const samples: Float32Array = Array.isArray(raw) ? raw[0] : raw

  return samples
}

// ─── Service implementation ───────────────────────────────────────────────

export class LocalWhisperService implements TranscriptionService {
  private modelId: string

  constructor(modelId = DEFAULT_WHISPER_MODEL) {
    this.modelId = modelId
  }

  async transcribe(audioPath: string): Promise<TranscriptionResult> {
    if (!fs.existsSync(audioPath)) {
      throw new Error(`Audio file not found: ${audioPath}`)
    }

    // 1. Load model (cached after first run)
    const transcriber = await getOrCreatePipeline(this.modelId)

    // 2. Decode WAV → Float32Array
    let audioSamples: Float32Array
    try {
      audioSamples = decodeWavFile(audioPath)
    } catch (err) {
      throw new Error(`Failed to decode audio file: ${(err as Error).message}`)
    }

    if (audioSamples.length === 0) {
      throw new Error('Audio file is empty or contains no samples')
    }

    console.log(`[whisper] Transcribing ${(audioSamples.length / 16000).toFixed(1)}s of audio with model "${this.modelId}"...`)

    // 3. Run transcription with timestamp chunks
    const output = (await (transcriber as any)(audioSamples, {
      return_timestamps: true,   // Return segment-level timestamps
      chunk_length_s: 30,        // Process 30-second windows
      stride_length_s: 5,        // 5-second overlap between windows
      language: undefined,       // Auto-detect language
      task: 'transcribe',
    })) as WhisperOutput

    console.log(`[whisper] Transcription complete. Segments: ${output.chunks?.length ?? 0}`)

    // 4. Normalize output into SubtitleSegment[]
    const segments = this.normalizeSegments(output)

    return {
      segments,
      language: undefined, // @xenova/transformers doesn't expose detected language easily
      duration: audioSamples.length / 16000,
    }
  }

  private normalizeSegments(output: WhisperOutput): SubtitleSegment[] {
    // If we have chunk-level timestamps, use them
    if (output.chunks && output.chunks.length > 0) {
      return output.chunks
        .filter((chunk) => chunk.text?.trim().length > 0)
        .map((chunk, i) => {
          const start = chunk.timestamp[0] ?? 0
          // If end is null (last chunk), estimate from start
          const end = chunk.timestamp[1] ?? start + 3

          return {
            id: `sub-${i + 1}`,
            start: Math.max(0, start),
            end: Math.max(start + 0.1, end),
            text: chunk.text.trim(),
          }
        })
    }

    // Fallback: no chunks → single segment with full text
    if (output.text?.trim()) {
      return [
        {
          id: 'sub-1',
          start: 0,
          end: 30,
          text: output.text.trim(),
        },
      ]
    }

    return []
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────

/**
 * Resolve model ID from environment.
 *
 * WHISPER_MODEL env var accepts:
 *   - A full HuggingFace model ID:  "Xenova/whisper-small"
 *   - A short alias:                "tiny" | "base" | "small" | "medium" | "large"
 *
 * Defaults to "Xenova/whisper-base" — good balance of speed and accuracy.
 */
function resolveModelId(): string {
  const raw = process.env.WHISPER_MODEL?.trim()
  if (!raw) return DEFAULT_WHISPER_MODEL

  // Short alias → full model ID
  const aliases: Record<string, string> = {
    tiny:   'Xenova/whisper-tiny',
    base:   'Xenova/whisper-base',
    small:  'Xenova/whisper-small',
    medium: 'Xenova/whisper-medium',
    large:  'Xenova/whisper-large',
    // English-only variants (faster)
    'tiny.en':   'Xenova/whisper-tiny.en',
    'base.en':   'Xenova/whisper-base.en',
    'small.en':  'Xenova/whisper-small.en',
    'medium.en': 'Xenova/whisper-medium.en',
  }

  return aliases[raw] ?? raw
}

export function createTranscriptionService(): TranscriptionService {
  const modelId = resolveModelId()
  return new LocalWhisperService(modelId)
}
