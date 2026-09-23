import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { TEMP_DIRS } from '@/lib/utils/tempFiles'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate ID — only allow safe characters
    if (!/^[a-zA-Z0-9_.-]+$/.test(id)) {
      return NextResponse.json({ error: 'Invalid file ID' }, { status: 400 })
    }

    const outputDir = path.resolve(TEMP_DIRS.output)
    const filePath = path.resolve(path.join(TEMP_DIRS.output, id))

    // Prevent path traversal
    if (!filePath.startsWith(outputDir)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const stat = fs.statSync(filePath)
    const fileStream = fs.createReadStream(filePath)
    const fileName = path.basename(filePath)

    // Determine content type
    const ext = path.extname(fileName).toLowerCase()
    const contentTypeMap: Record<string, string> = {
      '.mp4': 'video/mp4',
      '.mov': 'video/quicktime',
      '.mkv': 'video/x-matroska',
      '.avi': 'video/x-msvideo',
      '.webm': 'video/webm',
    }
    const contentType = contentTypeMap[ext] ?? 'application/octet-stream'

    // Stream the file
    const readable = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => controller.enqueue(chunk))
        fileStream.on('end', () => controller.close())
        fileStream.on('error', (err) => controller.error(err))
      },
    })

    return new NextResponse(readable, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(stat.size),
        'Content-Disposition': `attachment; filename="captionflow-export${ext}"`,
      },
    })
  } catch (err) {
    console.error('[download] Error:', err)
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}
