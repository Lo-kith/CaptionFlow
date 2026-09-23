export interface VideoMetadata {
  duration: number   // seconds
  width: number
  height: number
  fps: number
  hasAudio: boolean
  size: number       // bytes
  format: string
}

export interface ProcessingJob {
  id: string
  status: ProcessingStatus
  videoPath: string
  audioPath?: string
  subtitles?: string // JSON path
  outputPath?: string
  error?: string
  createdAt: number
}

export type ProcessingStatus =
  | 'uploading'
  | 'validating'
  | 'extracting_audio'
  | 'transcribing'
  | 'ready'
  | 'exporting'
  | 'done'
  | 'error'

export const SUPPORTED_VIDEO_FORMATS = ['mp4', 'mov', 'mkv', 'avi', 'webm'] as const
export const SUPPORTED_MIME_TYPES = [
  'video/mp4',
  'video/quicktime',
  'video/x-matroska',
  'video/x-msvideo',
  'video/webm',
] as const

export type SupportedVideoFormat = typeof SUPPORTED_VIDEO_FORMATS[number]
