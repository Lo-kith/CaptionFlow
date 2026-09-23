import { SubtitleSegment } from '@/types/subtitle'
import { formatVTT } from './utils'

/**
 * Generate a valid .vtt (WebVTT) file from subtitle segments.
 */
export function generateVTT(subtitles: SubtitleSegment[]): string {
  const sorted = [...subtitles].sort((a, b) => a.start - b.start)
  
  const cues = sorted
    .map((sub) => {
      return `${formatVTT(sub.start)} --> ${formatVTT(sub.end)}\n${sub.text.trim()}`
    })
    .join('\n\n')
  
  return `WEBVTT\n\n${cues}`
}
