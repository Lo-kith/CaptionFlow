import { SubtitleSegment } from '@/types/subtitle'
import { formatSRT } from './utils'

/**
 * Generate a valid .srt file from subtitle segments.
 */
export function generateSRT(subtitles: SubtitleSegment[]): string {
  const sorted = [...subtitles].sort((a, b) => a.start - b.start)
  
  return sorted
    .map((sub, i) => {
      return [
        String(i + 1),
        `${formatSRT(sub.start)} --> ${formatSRT(sub.end)}`,
        sub.text.trim(),
        '',
      ].join('\n')
    })
    .join('\n')
    .trim()
}
