import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { TEMP_DIRS, ensureTempDirs, sanitizeFilename } from '@/lib/utils/tempFiles'
import { getVideoMetadata } from '@/lib/ffmpeg/getMetadata'
import { SUPPORTED_MIME_TYPES, SUPPORTED_VIDEO_FORMATS } from '@/types/video'

const MAX_FILE_SIZE_BYTES = parseInt(process.env.MAX_FILE_SIZE_MB ?? '500', 10) * 1024 * 1024

export async function POST(req: NextRequest) {
  try {
    ensureTempDirs()

    const formData = await req.formData()
    const file = formData.get('video') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No video file provided' }, { status: 400 })
    }

    // ─── Validate file size ────────────────────────────────────────────────
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${process.env.MAX_FILE_SIZE_MB ?? 500}MB` },
        { status: 413 }
      )
    }

    // ─── Validate MIME type ────────────────────────────────────────────────
    const mimeType = file.type as string
    if (!SUPPORTED_MIME_TYPES.includes(mimeType as typeof SUPPORTED_MIME_TYPES[number])) {
      // Also check by extension as fallback
      const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
      if (!SUPPORTED_VIDEO_FORMATS.includes(ext as typeof SUPPORTED_VIDEO_FORMATS[number])) {
        return NextResponse.json(
          {
            error: 'Unsupported file format. Please upload MP4, MOV, MKV, AVI, or WebM.',
          },
          { status: 415 }
        )
      }
    }

    // ─── Generate safe filename ────────────────────────────────────────────
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'mp4'
    const safeExt = SUPPORTED_VIDEO_FORMATS.includes(ext as typeof SUPPORTED_VIDEO_FORMATS[number]) ? ext : 'mp4'
    const jobId = uuidv4()
    const fileName = `${jobId}.${safeExt}`
    const filePath = path.join(TEMP_DIRS.uploads, fileName)

    // ─── Write file to disk ────────────────────────────────────────────────
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)

    // ─── Extract metadata ──────────────────────────────────────────────────
    let metadata
    try {
      metadata = await getVideoMetadata(filePath)
    } catch (err) {
      return NextResponse.json(
        { error: `Could not read video file. ${(err as Error).message}` },
        { status: 422 }
      )
    }

    if (!metadata.hasAudio) {
      return NextResponse.json(
        {
          error:
            "This video doesn't contain an audio track. Please upload a video with spoken audio.",
        },
        { status: 422 }
      )
    }

    return NextResponse.json({
      jobId,
      filePath,
      metadata,
      originalName: sanitizeFilename(file.name),
    })
  } catch (err) {
    console.error('[upload] Error:', err)
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    )
  }
}
