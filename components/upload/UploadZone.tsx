'use client'

import { useCallback, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Film, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { VideoMetadata } from '@/types/video'
import { formatFileSize, formatTimeShort } from '@/lib/subtitles/utils'

type UploadStep =
  | 'idle'
  | 'uploading'
  | 'extracting'
  | 'transcribing'
  | 'ready'
  | 'error'

interface UploadProgress {
  step: UploadStep
  percent: number
  message: string
}

const STEP_MESSAGES: Record<UploadStep, string> = {
  idle: '',
  uploading: 'Uploading video...',
  extracting: 'Extracting audio...',
  transcribing: 'Transcribing speech with AI...',
  ready: 'Processing complete!',
  error: 'Something went wrong',
}

export default function UploadZone() {
  const router = useRouter()
  const { setVideo, setSubtitles, setDuration } = useEditorStore()

  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState<UploadProgress>({
    step: 'idle',
    percent: 0,
    message: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const setStep = (step: UploadStep, percent: number) => {
    setProgress({ step, percent, message: STEP_MESSAGES[step] })
  }

  const handleFile = useCallback(
    async (file: File) => {
      setError(null)
      setSelectedFile(file)
      setStep('uploading', 10)

      try {
        // ── Step 1: Upload ──────────────────────────────────────────────────
        const formData = new FormData()
        formData.append('video', file)

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadRes.ok) {
          const data = await uploadRes.json()
          throw new Error(data.error ?? 'Upload failed')
        }

        const uploadData = await uploadRes.json() as {
          jobId: string
          filePath: string
          metadata: VideoMetadata
          originalName: string
        }

        setMetadata(uploadData.metadata)
        setStep('extracting', 35)

        // ── Step 2: Transcribe (includes audio extraction) ─────────────────
        setStep('transcribing', 55)

        const transcribeRes = await fetch('/api/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId: uploadData.jobId,
            filePath: uploadData.filePath,
          }),
        })

        if (!transcribeRes.ok) {
          const data = await transcribeRes.json()
          throw new Error(data.error ?? 'Transcription failed')
        }

        const { segments } = await transcribeRes.json()
        setStep('ready', 100)

        // ── Step 3: Set editor state and navigate ─────────────────────────
        const videoUrl = URL.createObjectURL(file)

        setVideo({
          filePath: uploadData.filePath,
          url: videoUrl,
          metadata: uploadData.metadata,
        })
        setSubtitles(segments)
        setDuration(uploadData.metadata.duration)

        // Short delay to show the "ready" state before navigating
        await new Promise((r) => setTimeout(r, 600))
        router.push('/editor')
      } catch (err) {
        const message = (err as Error).message
        setError(message)
        setStep('error', 0)
      }
    },
    [router, setVideo, setSubtitles, setDuration]
  )

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const isProcessing = ['uploading', 'extracting', 'transcribing'].includes(progress.step)

  return (
    <div
      className={`upload-zone w-full max-w-2xl mx-auto ${isDragging ? 'dragging' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => !isProcessing && fileInputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="Upload video file"
      onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/x-matroska,video/x-msvideo,video/webm,.mp4,.mov,.mkv,.avi,.webm"
        onChange={onFileChange}
        className="hidden"
        aria-hidden
      />

      <div className="p-10 text-center">
        {progress.step === 'idle' && (
          <>
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-2xl bg-bg-elevated flex items-center justify-center border border-bg-border">
                <Upload className="w-7 h-7 text-accent" />
              </div>
            </div>
            <p className="text-base font-medium text-text-primary mb-1">
              Drop your video here
            </p>
            <p className="text-sm text-text-muted mb-4">or click to browse</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {['MP4', 'MOV', 'MKV', 'AVI', 'WebM'].map((fmt) => (
                <span key={fmt} className="text-xs px-2 py-1 rounded bg-bg-elevated text-text-secondary border border-bg-border">
                  {fmt}
                </span>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-3">
              Up to {process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB ?? 500}MB
            </p>
          </>
        )}

        {isProcessing && (
          <div className="animate-fade-in">
            {/* File info */}
            {selectedFile && (
              <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-bg-elevated border border-bg-border">
                <Film className="w-5 h-5 text-accent flex-shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {formatFileSize(selectedFile.size)}
                    {metadata && ` · ${formatTimeShort(metadata.duration)}`}
                    {metadata && ` · ${metadata.width}×${metadata.height}`}
                  </p>
                </div>
              </div>
            )}

            {/* Steps */}
            <div className="space-y-3 mb-5">
              {(
                [
                  { step: 'uploading', label: 'Uploading video' },
                  { step: 'extracting', label: 'Extracting audio' },
                  { step: 'transcribing', label: 'Transcribing with AI' },
                ] as const
              ).map(({ step, label }) => {
                const stepOrder: UploadStep[] = ['uploading', 'extracting', 'transcribing']
                const currentIdx = stepOrder.indexOf(progress.step)
                const thisIdx = stepOrder.indexOf(step)
                const isDone = thisIdx < currentIdx
                const isCurrent = thisIdx === currentIdx

                return (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                      {isDone ? (
                        <CheckCircle className="w-4 h-4 text-status-success" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-accent animate-spin" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-bg-border" />
                      )}
                    </div>
                    <span className={`text-sm ${isCurrent ? 'text-text-primary' : isDone ? 'text-status-success' : 'text-text-disabled'}`}>
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Progress bar */}
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress.percent}%` }} />
            </div>
          </div>
        )}

        {progress.step === 'ready' && (
          <div className="animate-fade-in flex flex-col items-center gap-3">
            <CheckCircle className="w-10 h-10 text-status-success" />
            <p className="text-sm font-medium text-text-primary">Processing complete!</p>
            <p className="text-xs text-text-muted">Opening editor...</p>
          </div>
        )}

        {progress.step === 'error' && (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-10 h-10 text-status-error" />
            </div>
            <p className="text-sm font-medium text-status-error mb-2">Processing failed</p>
            <p className="text-sm text-text-secondary mb-5 max-w-sm mx-auto">{error}</p>
            <button
              className="btn btn-secondary"
              onClick={(e) => {
                e.stopPropagation()
                setProgress({ step: 'idle', percent: 0, message: '' })
                setError(null)
                setSelectedFile(null)
                setMetadata(null)
              }}
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
