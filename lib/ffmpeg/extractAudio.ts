import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'
import { getFFmpegPath } from './paths'

/**
 * Extract audio from video using FFmpeg.
 * Outputs a WAV file optimized for speech-to-text (16kHz, mono).
 */
export async function extractAudio(
  videoPath: string,
  outputDir: string
): Promise<string> {
  const audioFileName = `audio-${Date.now()}.wav`
  const audioPath = path.join(outputDir, audioFileName)

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true })

  return new Promise((resolve, reject) => {
    const args = [
      '-i', videoPath,
      '-vn',                    // No video
      '-acodec', 'pcm_s16le',   // PCM 16-bit
      '-ar', '16000',           // 16kHz sample rate (Whisper optimal)
      '-ac', '1',               // Mono
      '-y',                     // Overwrite output
      audioPath,
    ]

    const proc = spawn(getFFmpegPath(), args)
    let stderr = ''

    proc.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString() })

    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`FFmpeg audio extraction failed (code ${code}): ${stderr}`))
        return
      }

      if (!fs.existsSync(audioPath)) {
        reject(new Error('Audio file was not created by FFmpeg'))
        return
      }

      resolve(audioPath)
    })

    proc.on('error', (err) => {
      reject(new Error(`FFmpeg failed to start: ${err.message}. Make sure FFmpeg is installed and in PATH.`))
    })
  })
}
