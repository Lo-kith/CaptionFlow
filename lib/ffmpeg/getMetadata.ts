import { VideoMetadata } from '@/types/video'
import { spawn } from 'child_process'
import { getFFmpegPath, getFFprobePath } from './paths'

/**
 * Extract video metadata using FFprobe.
 * Uses spawn to avoid shell injection.
 */
export async function getVideoMetadata(filePath: string): Promise<VideoMetadata> {
  return new Promise((resolve, reject) => {
    const args = [
      '-v', 'quiet',
      '-print_format', 'json',
      '-show_streams',
      '-show_format',
      filePath,
    ]

    const proc = spawn(getFFprobePath(), args)
    let stdout = ''
    let stderr = ''

    proc.stdout.on('data', (chunk: Buffer) => { stdout += chunk.toString() })
    proc.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString() })

    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`FFprobe failed (code ${code}): ${stderr}`))
        return
      }

      try {
        const data = JSON.parse(stdout)
        const streams: Record<string, unknown>[] = data.streams ?? []
        const format: Record<string, unknown> = data.format ?? {}

        const videoStream = streams.find((s) => s.codec_type === 'video') as Record<string, string | number> | undefined
        const audioStream = streams.find((s) => s.codec_type === 'audio')

        if (!videoStream) {
          reject(new Error('No video stream found in file'))
          return
        }

        // Parse FPS
        let fps = 25
        if (typeof videoStream.r_frame_rate === 'string') {
          const [num, den] = videoStream.r_frame_rate.split('/').map(Number)
          if (den && den > 0) fps = num / den
        }

        const duration = parseFloat(String(format.duration ?? videoStream.duration ?? 0))
        const width = Number(videoStream.width ?? 0)
        const height = Number(videoStream.height ?? 0)
        const size = parseInt(String(format.size ?? 0), 10)
        const formatName = String(format.format_name ?? 'unknown')

        resolve({
          duration,
          width,
          height,
          fps: Math.round(fps * 100) / 100,
          hasAudio: !!audioStream,
          size,
          format: formatName,
        })
      } catch (err) {
        reject(new Error(`Failed to parse FFprobe output: ${err}`))
      }
    })

    proc.on('error', (err) => {
      reject(new Error(`FFprobe not found or failed to start: ${err.message}. Make sure FFmpeg/FFprobe is installed.`))
    })
  })
}

/**
 * Check if FFmpeg is available on the system.
 */
export async function checkFFmpegAvailable(): Promise<boolean> {
  return new Promise((resolve) => {
    const proc = spawn(getFFmpegPath(), ['-version'])
    proc.on('close', (code) => resolve(code === 0))
    proc.on('error', () => resolve(false))
  })
}
