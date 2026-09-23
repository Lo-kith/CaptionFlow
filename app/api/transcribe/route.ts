import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { extractAudio } from '@/lib/ffmpeg/extractAudio'
import { createTranscriptionService } from '@/lib/transcription/whisper'
import { TEMP_DIRS, ensureTempDirs } from '@/lib/utils/tempFiles'
import fs from 'fs'

export async function POST(req: NextRequest) {
  try {
    ensureTempDirs()

    const body = await req.json()
    const { jobId, filePath } = body as { jobId?: string; filePath?: string }

    if (!jobId || !filePath) {
      return NextResponse.json({ error: 'Missing jobId or filePath' }, { status: 400 })
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

    // ─── Extract audio ─────────────────────────────────────────────────────
    let audioPath: string
    try {
      audioPath = await extractAudio(resolvedPath, TEMP_DIRS.audio)
    } catch (err) {
      console.error('[transcribe] Audio extraction failed:', err)
      return NextResponse.json(
        { error: `Audio extraction failed: ${(err as Error).message}` },
        { status: 500 }
      )
    }

    // ─── Transcribe ────────────────────────────────────────────────────────
    let result
    try {
      const service = createTranscriptionService()
      result = await service.transcribe(audioPath)
    } catch (err) {
      console.error('[transcribe] Transcription failed:', err)
      const message = (err as Error).message
      return NextResponse.json(
        { error: `Transcription failed: ${message}` },
        { status: 500 }
      )
    } finally {
      // Clean up audio file
      try { fs.unlinkSync(audioPath) } catch {}
    }

    if (result.segments.length === 0) {
      return NextResponse.json(
        { error: 'No speech detected in the video. Please check that the video contains spoken audio.' },
        { status: 422 }
      )
    }

    return NextResponse.json({
      segments: result.segments,
      language: result.language,
      duration: result.duration,
    })
  } catch (err) {
    console.error('[transcribe] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Transcription failed unexpectedly. Please try again.' },
      { status: 500 }
    )
  }
}
