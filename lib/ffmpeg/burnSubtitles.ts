import { spawn } from 'child_process'
import { SubtitleSegment, SubtitleStyle } from '@/types/subtitle'
import { generateSRT } from '@/lib/subtitles/srt'
import path from 'path'
import fs from 'fs'
import { getFFmpegPath } from './paths'

/**
 * Burn subtitles into video using FFmpeg.
 * Generates a temporary SRT file and uses the subtitles filter.
 */
export async function burnSubtitles(
  videoPath: string,
  subtitles: SubtitleSegment[],
  style: SubtitleStyle,
  outputDir: string
): Promise<string> {
  fs.mkdirSync(outputDir, { recursive: true })

  // Write temporary SRT file
  const srtContent = generateSRT(subtitles)
  const srtPath = path.join(outputDir, `subs-${Date.now()}.srt`)
  fs.writeFileSync(srtPath, srtContent, 'utf-8')

  const outputFileName = `output-${Date.now()}.mp4`
  const outputPath = path.join(outputDir, outputFileName)

  // Build ASS style override string for FFmpeg
  const fontStyle = buildFontStyle(style)

  // Use forward slashes and escape colons for Windows FFmpeg paths
  const srtPathFFmpeg = srtPath.replace(/\\/g, '/').replace(':', '\\:')

  return new Promise((resolve, reject) => {
    const args = [
      '-i', videoPath,
      '-vf', `subtitles='${srtPathFFmpeg}':force_style='${fontStyle}'`,
      '-c:a', 'copy',
      '-y',
      outputPath,
    ]

    const proc = spawn(getFFmpegPath(), args)
    let stderr = ''

    proc.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString() })

    proc.on('close', (code) => {
      // Clean up temp SRT file
      try { fs.unlinkSync(srtPath) } catch {}

      if (code !== 0) {
        reject(new Error(`FFmpeg burn subtitles failed (code ${code}): ${stderr.slice(-500)}`))
        return
      }

      if (!fs.existsSync(outputPath)) {
        reject(new Error('Output video was not created by FFmpeg'))
        return
      }

      resolve(outputPath)
    })

    proc.on('error', (err) => {
      try { fs.unlinkSync(srtPath) } catch {}
      reject(new Error(`FFmpeg failed to start: ${err.message}`))
    })
  })
}

function buildFontStyle(style: SubtitleStyle): string {
  const positionMap: Record<string, string> = {
    top: 'Alignment=6',
    center: 'Alignment=5',
    bottom: 'Alignment=2',
  }

  const colorHexToASS = (hex: string): string => {
    // ASS uses AABBGGRR format
    const r = hex.slice(1, 3)
    const g = hex.slice(3, 5)
    const b = hex.slice(5, 7)
    return `&H00${b}${g}${r}`
  }

  const textColorASS = colorHexToASS(style.color)
  const outlineColorASS = colorHexToASS(style.outlineColor)
  const opacity = Math.round((100 - style.backgroundOpacity) * 2.55).toString(16).padStart(2, '0').toUpperCase()
  const bgColorHex = style.backgroundColor.slice(1)
  const bgR = bgColorHex.slice(0, 2)
  const bgG = bgColorHex.slice(2, 4)
  const bgB = bgColorHex.slice(4, 6)
  const backColorASS = `&H${opacity}${bgB}${bgG}${bgR}`

  const parts = [
    `FontName=${style.fontFamily}`,
    `FontSize=${style.fontSize}`,
    `Bold=${style.fontWeight === 'bold' ? '1' : '0'}`,
    `PrimaryColour=${textColorASS}`,
    `OutlineColour=${outlineColorASS}`,
    `BackColour=${backColorASS}`,
    `Outline=${style.outline ? '2' : '0'}`,
    `Shadow=0`,
    `MarginV=20`,
    positionMap[style.position] ?? 'Alignment=2',
  ]

  return parts.join(',')
}
