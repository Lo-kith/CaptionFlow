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
    let output: WhisperOutput
    try {
      output = (await (transcriber as any)(audioSamples, {
        return_timestamps: true,   // Return segment-level timestamps
        chunk_length_s: 30,        // Process 30-second windows
        task: 'transcribe',
      })) as WhisperOutput
    } catch (err) {
      console.warn(`[whisper] Timestamp extraction failed (${(err as Error).message}), retrying without chunking...`)
      output = (await (transcriber as any)(audioSamples, {
        task: 'transcribe',
      })) as WhisperOutput
    }

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
    if (!output.chunks || output.chunks.length === 0) {
      if (output.text?.trim()) {
        const cleaned = sanitizeText(output.text.trim())
        if (cleaned) {
          return this.splitTextIntoPhraseSegments(cleaned, 0, 30)
        }
      }
      return []
    }

    const validChunks = output.chunks
      .map((c) => ({
        ...c,
        cleanText: sanitizeText(c.text || ''),
      }))
      .filter((c) => c.cleanText.length > 0 && !isHallucinated(c.cleanText))

    const result: SubtitleSegment[] = []

    validChunks.forEach((chunk, i) => {
      const start = Math.max(0, chunk.timestamp[0] ?? 0)
      let end = chunk.timestamp[1]

      if (end === null || end === undefined || end <= start) {
        if (
          i < validChunks.length - 1 &&
          validChunks[i + 1].timestamp[0] !== null &&
          (validChunks[i + 1].timestamp[0] as number) > start
        ) {
          end = validChunks[i + 1].timestamp[0] as number
        } else {
          const wordCount = chunk.cleanText.split(/\s+/).length
          end = start + Math.max(1.5, wordCount * 0.35)
        }
      }

      const phraseSegments = this.splitTextIntoPhraseSegments(chunk.cleanText, start, end)
      result.push(...phraseSegments)
    })

    // Deduplicate consecutive identical segments
    const finalSegments: SubtitleSegment[] = []
    result.forEach((seg) => {
      if (
        finalSegments.length > 0 &&
        finalSegments[finalSegments.length - 1].text.toLowerCase() === seg.text.toLowerCase()
      ) {
        // Extend the previous segment's end time instead of adding duplicate text
        finalSegments[finalSegments.length - 1].end = seg.end
      } else {
        finalSegments.push(seg)
      }
    })

    return finalSegments.map((seg, idx) => ({
      ...seg,
      id: `sub-${idx + 1}`,
    }))
  }

  private splitTextIntoPhraseSegments(
    fullText: string,
    startTime: number,
    endTime: number
  ): SubtitleSegment[] {
    const cleaned = sanitizeText(fullText)
    if (!cleaned || isHallucinated(cleaned)) return []

    const totalDuration = Math.max(0.2, endTime - startTime)
    const words = cleaned.split(/\s+/).filter(Boolean)

    if (words.length === 0) return []

    // If chunk is short (<= 7 words and <= 3.5s), keep as single segment
    if (words.length <= 7 && totalDuration <= 3.5) {
      return [
        {
          id: '',
          start: Number(startTime.toFixed(3)),
          end: Number(endTime.toFixed(3)),
          text: words.join(' '),
        },
      ]
    }

    // Split text into phrase groups by punctuation or max word count (5-7 words)
    const phrases: string[] = []
    let currentWords: string[] = []

    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      currentWords.push(word)

      const hasPunctuation = /[,.?!;:]$/.test(word)
      if (currentWords.length >= 7 || (hasPunctuation && currentWords.length >= 3) || i === words.length - 1) {
        phrases.push(currentWords.join(' '))
        currentWords = []
      }
    }

    if (currentWords.length > 0) {
      if (phrases.length > 0) {
        phrases[phrases.length - 1] += ' ' + currentWords.join(' ')
      } else {
        phrases.push(currentWords.join(' '))
      }
    }

    const totalCharCount = words.join('').length || 1
    let currentStart = startTime

    return phrases.map((phrase, idx) => {
      const phraseCharCount = phrase.replace(/\s+/g, '').length
      const phraseDuration = (phraseCharCount / totalCharCount) * totalDuration
      const isLast = idx === phrases.length - 1
      const subEnd = isLast ? endTime : Math.min(endTime - 0.05, currentStart + phraseDuration)

      const segment: SubtitleSegment = {
        id: '',
        start: Number(currentStart.toFixed(3)),
        end: Number(Math.max(currentStart + 0.1, subEnd).toFixed(3)),
        text: phrase,
      }
      currentStart = subEnd
      return segment
    })
  }
}

/**
 * Remove repeated hallucinated tokens (e.g., "R R R R R", "RRRRRRR.", ". . . .")
 */
function sanitizeText(text: string): string {
  let cleaned = text.trim()

  // Remove trailing or leading repeated single/double letter words e.g. "Sunday evening, R R R R R." -> "Sunday evening,"
  cleaned = cleaned.replace(/(\b[A-Za-z]{1,2}\b[.,!?]?\s+){2,}\b[A-Za-z]{1,2}\b[.,!?]?/gi, '').trim()

  // Remove repeating single character runs like "RRRRRRR" or "RRRRRRR."
  cleaned = cleaned.replace(/\b([a-zA-Z0-9])\1{2,}\b[.,!?]?/gi, '').trim()

  // Remove standalone non-alphanumeric symbols
  cleaned = cleaned.replace(/^[^a-zA-Z0-9\s]+$/g, '').trim()

  return cleaned
}

/**
 * Check if text is a Whisper hallucination (e.g. repeated token loop, non-speech noise)
 */
function isHallucinated(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) return true

  // Strip punctuation to evaluate core alphanumeric content
  const alphaOnly = trimmed.replace(/[^a-zA-Z0-9]/g, '')
  if (!alphaOnly || alphaOnly.length < 2) return true

  // 1. Repeating single character pattern e.g. "RRRRRRR", "R R R R R"
  if (/^([a-zA-Z0-9])\1+$/i.test(alphaOnly)) {
    return true
  }

  // 2. Repeating short n-gram pattern e.g. "ababab", "xyzxyzxyz"
  if (/^(.{1,4})\1{2,}$/i.test(alphaOnly)) {
    return true
  }

  // 3. High ratio of identical words / letters
  const words = trimmed.split(/\s+/).map((w) => w.replace(/[^a-zA-Z0-9]/g, '')).filter(Boolean)
  if (words.length > 0) {
    const firstWord = words[0].toUpperCase()
    const identicalCount = words.filter((w) => w.toUpperCase() === firstWord).length
    if (identicalCount / words.length >= 0.5 && firstWord.length <= 3) {
      return true
    }
  }

  // 4. Common Whisper silence/noise/outro hallucinations
  const lower = trimmed.toLowerCase()
  if (
    lower.includes('subtitles by') ||
    lower.includes('amara.org') ||
    lower.includes('thank you for watching') ||
    lower.includes('subscribe') ||
    /^\[.*\]$/.test(lower) ||
    /^\(.*\)$/.test(lower) ||
    lower === 'you' ||
    lower === 'bye' ||
    lower === 'thanks'
  ) {
    return true
  }

  return false
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
