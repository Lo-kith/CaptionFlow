'use client'

import { useState, useCallback } from 'react'
import { X, Download, Loader2, CheckCircle } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { generateSRT } from '@/lib/subtitles/srt'
import { generateVTT } from '@/lib/subtitles/vtt'
import { sortSubtitles } from '@/lib/subtitles/utils'

interface ExportDialogProps {
  onClose: () => void
}

type ExportFormat = 'srt' | 'vtt' | 'video'

interface ExportStep {
  label: string
  done: boolean
  active: boolean
}

export default function ExportDialog({ onClose }: ExportDialogProps) {
  const { subtitles, style, video, setExporting, isExporting, exportProgress } = useEditorStore()

  const [format, setFormat] = useState<ExportFormat>('srt')
  const [steps, setSteps] = useState<ExportStep[]>([])
  const [isDone, setIsDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sorted = sortSubtitles(subtitles)

  // ─── Download text file (SRT/VTT) ─────────────────────────────────────────
  const downloadTextFile = useCallback(
    (content: string, filename: string, mimeType: string) => {
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    []
  )

  const handleExport = useCallback(async () => {
    setError(null)
    setIsDone(false)

    if (format === 'srt') {
      const content = generateSRT(sorted)
      downloadTextFile(content, 'subtitles.srt', 'text/srt')
      setIsDone(true)
      return
    }

    if (format === 'vtt') {
      const content = generateVTT(sorted)
      downloadTextFile(content, 'subtitles.vtt', 'text/vtt')
      setIsDone(true)
      return
    }

    // ── Video export ────────────────────────────────────────────────────────
    if (!video?.filePath) {
      setError('No video file available for export')
      return
    }

    setSteps([
      { label: 'Preparing subtitles...', done: false, active: true },
      { label: 'Rendering subtitles into video...', done: false, active: false },
      { label: 'Finalizing...', done: false, active: false },
    ])

    setExporting(true, 'Rendering...')

    try {
      // Step 1
      setSteps((s) => [
        { ...s[0], active: true },
        s[1],
        s[2],
      ])

      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePath: video.filePath,
          subtitles: sorted,
          style,
        }),
      })

      // Step 2
      setSteps((s) => [
        { ...s[0], done: true, active: false },
        { ...s[1], active: true },
        s[2],
      ])

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Export failed')
      }

      const { outputPath } = await res.json() as { outputPath: string }

      // Step 3
      setSteps((s) => [
        s[0],
        { ...s[1], done: true, active: false },
        { ...s[2], active: true },
      ])

      // Download the exported video
      const fileName = outputPath.split(/[\\/]/).pop() ?? 'output.mp4'
      const a = document.createElement('a')
      a.href = `/api/download/${fileName}`
      a.download = 'captionflow-export.mp4'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      setSteps((s) => s.map((step) => ({ ...step, done: true, active: false })))
      setIsDone(true)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setExporting(false)
    }
  }, [format, sorted, style, video, setExporting, downloadTextFile])

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-bg-secondary border border-bg-border rounded-xl w-full max-w-md shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-bg-border">
          <h2 className="font-semibold text-text-primary">Export</h2>
          <button
            className="btn btn-ghost p-1.5"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {!isExporting && !isDone && (
            <>
              <p className="text-sm text-text-secondary">
                {sorted.length} subtitle{sorted.length !== 1 ? 's' : ''} will be exported.
              </p>

              {/* Format selection */}
              <div className="space-y-2">
                <label className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                  Format
                </label>
                {(
                  [
                    { value: 'srt' as const, label: 'SRT Subtitle File', desc: 'Standard subtitle format, widely supported' },
                    { value: 'vtt' as const, label: 'VTT Subtitle File', desc: 'WebVTT format for web video players' },
                    { value: 'video' as const, label: 'Video with Burned-in Subtitles', desc: 'Subtitles permanently embedded in MP4' },
                  ]
                ).map(({ value, label, desc }) => (
                  <label
                    key={value}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      format === value
                        ? 'border-accent bg-accent-subtle'
                        : 'border-bg-border hover:border-bg-hover'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={value}
                      checked={format === value}
                      onChange={() => setFormat(value)}
                      className="mt-0.5 accent-accent"
                    />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{label}</p>
                      <p className="text-xs text-text-muted mt-0.5">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-status-error/10 border border-status-error/30">
                  <p className="text-sm text-status-error">{error}</p>
                </div>
              )}
            </>
          )}

          {isExporting && (
            <div className="py-2 space-y-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                    {step.done ? (
                      <CheckCircle className="w-4 h-4 text-status-success" />
                    ) : step.active ? (
                      <Loader2 className="w-4 h-4 text-accent animate-spin" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border border-bg-border" />
                    )}
                  </div>
                  <span className={`text-sm ${step.active ? 'text-text-primary' : step.done ? 'text-status-success' : 'text-text-disabled'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {isDone && !isExporting && (
            <div className="flex flex-col items-center py-4 gap-3">
              <CheckCircle className="w-10 h-10 text-status-success" />
              <p className="text-sm font-medium text-text-primary">Export complete!</p>
              <p className="text-xs text-text-muted">Your file has been downloaded.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isExporting && (
          <div className="flex items-center justify-end gap-2 p-4 border-t border-bg-border">
            <button className="btn btn-secondary" onClick={onClose}>
              {isDone ? 'Close' : 'Cancel'}
            </button>
            {!isDone && (
              <button
                className="btn btn-primary"
                onClick={handleExport}
                disabled={sorted.length === 0}
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
