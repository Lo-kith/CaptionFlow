import os from 'os'
import path from 'path'
import fs from 'fs'

const BASE_DIR = process.env.TEMP_DIR ?? path.join(os.tmpdir(), 'captionflow')

export const TEMP_DIRS = {
  uploads: path.join(BASE_DIR, 'uploads'),
  audio: path.join(BASE_DIR, 'audio'),
  subtitles: path.join(BASE_DIR, 'subtitles'),
  output: path.join(BASE_DIR, 'output'),
}

/**
 * Ensure all temp directories exist.
 */
export function ensureTempDirs(): void {
  Object.values(TEMP_DIRS).forEach((dir) => {
    fs.mkdirSync(dir, { recursive: true })
  })
}

/**
 * Safely delete a file (non-throwing).
 */
export function safeUnlink(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  } catch {
    // Ignore cleanup errors
  }
}

/**
 * Sanitize a filename to be safe for use in paths.
 * Strips path traversal and dangerous characters.
 */
export function sanitizeFilename(name: string): string {
  return path
    .basename(name)
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 100)
}
