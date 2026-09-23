import Groq from 'groq-sdk'
import fs from 'fs'
import path from 'path'
import { TranscriptionService } from './service'
import { TranscriptionResult } from './types'
import { SubtitleSegment } from '@/types/subtitle'

interface GroqSegment {
  id?: number
  seek?: number
  start: number
  end: number
  text: string
  tokens?: number[]
  temperature?: number
  avg_logprob?: number
  compression_ratio?: number
  no_speech_prob?: number
}

interface GroqTranscriptionResponse {
  text: string
  segments?: GroqSegment[]
  language?: string
  duration?: number
  x_groq?: { id: string }
}

export class GroqTranscriptionService implements TranscriptionService {
  private client: Groq

  constructor() {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      throw new Error(
        'GROQ_API_KEY environment variable is not set. ' +
        'Get a free API key from https://console.groq.com'
      )
    }
    this.client = new Groq({ apiKey })
  }

  async transcribe(audioPath: string): Promise<TranscriptionResult> {
    if (!fs.existsSync(audioPath)) {
      throw new Error(`Audio file not found: ${audioPath}`)
    }

    const fileStream = fs.createReadStream(audioPath)
    const fileName = path.basename(audioPath)

    const response = await this.client.audio.transcriptions.create({
      file: fileStream,
      model: 'whisper-large-v3',
      response_format: 'verbose_json',
      timestamp_granularities: ['segment'],
      language: undefined, // auto-detect
    }) as GroqTranscriptionResponse

    const segments = this.normalizeSegments(response.segments ?? [])

    // Fallback: if no segments returned but we have text, create a single segment
    if (segments.length === 0 && response.text?.trim()) {
      segments.push({
        id: 'sub-1',
        start: 0,
        end: response.duration ?? 10,
        text: response.text.trim(),
      })
    }

    return {
      segments,
      language: response.language,
      duration: response.duration,
    }
  }

  private normalizeSegments(rawSegments: GroqSegment[]): SubtitleSegment[] {
    return rawSegments
      .filter((seg) => seg.text?.trim())
      .map((seg, i) => ({
        id: `sub-${i + 1}`,
        start: Math.max(0, seg.start),
        end: Math.max(seg.start + 0.1, seg.end),
        text: seg.text.trim(),
      }))
  }
}

/**
 * Factory function — creates the appropriate transcription service.
 * Add new providers here without changing callers.
 */
export function createTranscriptionService(): TranscriptionService {
  // In future: check env var to select provider
  return new GroqTranscriptionService()
}
