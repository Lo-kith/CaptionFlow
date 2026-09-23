import { SubtitleSegment } from '@/types/subtitle'

// ─── Core result type ──────────────────────────────────────────────────────

export interface TranscriptionResult {
  segments: SubtitleSegment[]
  language?: string
  duration?: number
}

// ─── Raw Whisper output types (from @xenova/transformers) ──────────────────

export interface WhisperChunk {
  timestamp: [number, number | null]
  text: string
}

export interface WhisperOutput {
  text: string
  chunks?: WhisperChunk[]
}

// ─── Model info ────────────────────────────────────────────────────────────

export type WhisperModelSize = 'tiny' | 'base' | 'small' | 'medium' | 'large'

export const WHISPER_MODELS: Record<WhisperModelSize, string> = {
  tiny:   'Xenova/whisper-tiny',
  base:   'Xenova/whisper-base',
  small:  'Xenova/whisper-small',
  medium: 'Xenova/whisper-medium',
  large:  'Xenova/whisper-large',
}

export const DEFAULT_WHISPER_MODEL = 'Xenova/whisper-base'
