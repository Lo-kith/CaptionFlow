import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { burnSubtitles } from '@/lib/ffmpeg/burnSubtitles'
import { TEMP_DIRS, ensureTempDirs } from '@/lib/utils/tempFiles'
import { SubtitleSegment, SubtitleStyle, DEFAULT_SUBTITLE_STYLE } from '@/types/subtitle'
import fs from 'fs'

export async function POST(req: NextRequest) {
  try {
    ensureTempDirs()

    const body = await req.json()
    const {
      filePath,
      subtitles,
      style,
    } = body as {
      filePath?: string
      subtitles?: SubtitleSegment[]
      style?: SubtitleStyle
    }

    if (!filePath || !subtitles || subtitles.length === 0) {
      return NextResponse.json(
        { error: 'Missing filePath or subtitles' },
        { status: 400 }
      )
    }

    // ─── Security: ensure filePath is within uploads dir ──────────────────
    const uploadsDir = path.resolve(TEMP_DIRS.uploads)
    const resolvedPath = path.resolve(filePath)
    if (!resolvedPath.startsWith(uploadsDir)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 403 })
    }

    if (!fs.existsSync(resolvedPath)) {
      return NextResponse.json({ error: 'Video file not found' }, { status: 404 })
    }

    // ─── Validate subtitle timestamps ──────────────────────────────────────
    for (const sub of subtitles) {
      if (typeof sub.start !== 'number' || typeof sub.end !== 'number') {
        return NextResponse.json(
          { error: 'Invalid subtitle timestamps' },
          { status: 400 }
        )
      }
      if (isNaN(sub.start) || isNaN(sub.end) || sub.end <= sub.start) {
        return NextResponse.json(
          { error: `Invalid subtitle: start=${sub.start} end=${sub.end}` },
          { status: 400 }
        )
      }
    }

    const subtitleStyle = style ?? DEFAULT_SUBTITLE_STYLE

    // ─── Burn subtitles ────────────────────────────────────────────────────
    let outputPath: string
    try {
      outputPath = await burnSubtitles(
        resolvedPath,
        subtitles,
        subtitleStyle,
        TEMP_DIRS.output
      )
    } catch (err) {
      console.error('[export] Burn subtitles failed:', err)
      return NextResponse.json(
        { error: `Export failed: ${(err as Error).message}` },
        { status: 500 }
      )
    }

    // Return the output path so the download route can serve it
    return NextResponse.json({ outputPath })
  } catch (err) {
    console.error('[export] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Export failed unexpectedly. Please try again.' },
      { status: 500 }
    )
  }
}
