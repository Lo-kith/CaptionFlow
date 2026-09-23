import { SubtitleSegment } from '@/types/subtitle'

// ─── Timestamp Formatting ──────────────────────────────────────────────────

/**
 * Format seconds to SRT timestamp: 00:00:00,000
 */
export function formatSRT(seconds: number): string {
  const totalMs = Math.round(seconds * 1000)
  const ms = totalMs % 1000
  const totalSeconds = Math.floor(totalMs / 1000)
  const secs = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const mins = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)
  return `${pad(hours)}:${pad(mins)}:${pad(secs)},${pad(ms, 3)}`
}

/**
 * Format seconds to VTT timestamp: 00:00.000
 */
export function formatVTT(seconds: number): string {
  const totalMs = Math.round(seconds * 1000)
  const ms = totalMs % 1000
  const totalSeconds = Math.floor(totalMs / 1000)
  const secs = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const mins = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)
  if (hours > 0) {
    return `${pad(hours)}:${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`
  }
  return `${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`
}

/**
 * Format seconds to display timestamp: MM:SS.mmm
 */
export function formatTimestamp(seconds: number): string {
  const totalMs = Math.round(seconds * 1000)
  const ms = totalMs % 1000
  const totalSeconds = Math.floor(totalMs / 1000)
  const secs = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const mins = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)
  if (hours > 0) {
    return `${pad(hours)}:${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`
  }
  return `${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`
}

/**
 * Format seconds to short display: MM:SS
 */
export function formatTimeShort(seconds: number): string {
  const totalSeconds = Math.floor(seconds)
  const secs = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const mins = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)
  if (hours > 0) {
    return `${pad(hours)}:${pad(mins)}:${pad(secs)}`
  }
  return `${pad(mins)}:${pad(secs)}`
}

/**
 * Parse a timestamp string to seconds.
 * Accepts: MM:SS.mmm, HH:MM:SS.mmm, MM:SS,mmm, HH:MM:SS,mmm
 */
export function parseTimestamp(str: string): number {
  // Normalize separator
  const normalized = str.trim().replace(',', '.')
  const parts = normalized.split(':')
  
  if (parts.length === 2) {
    // MM:SS.mmm
    const mins = parseFloat(parts[0])
    const secs = parseFloat(parts[1])
    return mins * 60 + secs
  } else if (parts.length === 3) {
    // HH:MM:SS.mmm
    const hours = parseFloat(parts[0])
    const mins = parseFloat(parts[1])
    const secs = parseFloat(parts[2])
    return hours * 3600 + mins * 60 + secs
  }
  
  return 0
}

function pad(n: number, width = 2): string {
  return String(Math.floor(n)).padStart(width, '0')
}

// ─── Active Subtitle ───────────────────────────────────────────────────────

/**
 * Find the active subtitle at a given video time.
 */
export function getActiveSubtitle(
  subtitles: SubtitleSegment[],
  currentTime: number
): SubtitleSegment | null {
  for (const sub of subtitles) {
    if (currentTime >= sub.start && currentTime < sub.end) {
      return sub
    }
  }
  return null
}

// ─── Subtitle Operations ───────────────────────────────────────────────────

const MIN_DURATION = 0.1

/**
 * Split a subtitle at the given time. Returns two new segments.
 */
export function splitSubtitle(
  sub: SubtitleSegment,
  splitTime: number
): [SubtitleSegment, SubtitleSegment] | null {
  if (splitTime <= sub.start + MIN_DURATION || splitTime >= sub.end - MIN_DURATION) {
    return null
  }
  
  const wordMidpoint = Math.floor(sub.text.length / 2)
  const spaceNear = findNearestSpace(sub.text, wordMidpoint)
  const firstText = sub.text.slice(0, spaceNear).trim()
  const secondText = sub.text.slice(spaceNear).trim()
  
  const first: SubtitleSegment = {
    id: `${sub.id}-a`,
    start: sub.start,
    end: splitTime,
    text: firstText || sub.text,
  }
  const second: SubtitleSegment = {
    id: `${sub.id}-b`,
    start: splitTime,
    end: sub.end,
    text: secondText || sub.text,
  }
  return [first, second]
}

function findNearestSpace(text: string, pos: number): number {
  let left = pos
  let right = pos
  while (left > 0 || right < text.length) {
    if (left > 0 && text[left] === ' ') return left
    if (right < text.length && text[right] === ' ') return right
    left--
    right++
  }
  return pos
}

/**
 * Merge two subtitles into one.
 */
export function mergeSubtitles(
  a: SubtitleSegment,
  b: SubtitleSegment
): SubtitleSegment {
  return {
    id: a.id,
    start: Math.min(a.start, b.start),
    end: Math.max(a.end, b.end),
    text: `${a.text} ${b.text}`.trim(),
  }
}

/**
 * Validate that a subtitle segment has valid times.
 */
export function validateSegment(
  seg: SubtitleSegment,
  videoDuration: number
): string | null {
  if (isNaN(seg.start) || isNaN(seg.end)) return 'Invalid timestamp (NaN)'
  if (seg.start < 0) return 'Start time cannot be negative'
  if (seg.end < 0) return 'End time cannot be negative'
  if (seg.end <= seg.start) return 'End must be after start'
  if (seg.end - seg.start < MIN_DURATION) return `Minimum duration is ${MIN_DURATION}s`
  if (seg.start > videoDuration) return 'Start time exceeds video duration'
  if (seg.end > videoDuration) return 'End time exceeds video duration'
  return null
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Generate a unique subtitle ID
 */
export function generateSubtitleId(): string {
  return `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

/**
 * Sort subtitles by start time
 */
export function sortSubtitles(subtitles: SubtitleSegment[]): SubtitleSegment[] {
  return [...subtitles].sort((a, b) => a.start - b.start)
}

/**
 * Format file size to human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}
