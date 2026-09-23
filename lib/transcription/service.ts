import { TranscriptionResult } from './types'

/**
 * Clean abstraction for speech-to-text providers.
 *
 * Implementations:
 *  - LocalWhisperService  (lib/transcription/whisper.ts) — default, runs locally
 *
 * To add a new provider, implement this interface and update createTranscriptionService().
 */
export interface TranscriptionService {
  transcribe(audioPath: string): Promise<TranscriptionResult>
}
