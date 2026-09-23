'use client'

import { ZoomIn, ZoomOut, Scissors, Undo2, Redo2 } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { formatTimeShort } from '@/lib/subtitles/utils'

export default function TimelineControls() {
  const {
    zoom,
    setZoom,
    currentTime,
    duration,
    selectedSubtitleId,
    subtitles,
    splitSubtitleAtTime,
    undo,
    redo,
    historyIndex,
    history,
  } = useEditorStore()

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  const canSplit = !!selectedSubtitleId && (() => {
    const sub = subtitles.find((s) => s.id === selectedSubtitleId)
    if (!sub) return false
    return currentTime > sub.start + 0.1 && currentTime < sub.end - 0.1
  })()

  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-b border-bg-border bg-bg-secondary flex-shrink-0">
      {/* Left: time info */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-text-muted">
          {formatTimeShort(currentTime)}
        </span>
        <span className="text-xs text-text-disabled">/</span>
        <span className="text-xs font-mono text-text-disabled">
          {formatTimeShort(duration)}
        </span>
      </div>

      {/* Center: actions */}
      <div className="flex items-center gap-1">
        <button
          className="btn btn-ghost p-1.5 text-xs gap-1"
          onClick={undo}
          disabled={!canUndo}
          aria-label="Undo"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>
        <button
          className="btn btn-ghost p-1.5 text-xs gap-1"
          onClick={redo}
          disabled={!canRedo}
          aria-label="Redo"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-bg-border mx-1" />

        <button
          className="btn btn-ghost p-1.5 text-xs gap-1 disabled:opacity-40"
          onClick={() => {
            if (selectedSubtitleId) {
              splitSubtitleAtTime(selectedSubtitleId, currentTime)
            }
          }}
          disabled={!canSplit}
          aria-label="Split subtitle at playhead"
          title="Split (S)"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>Split</span>
        </button>
      </div>

      {/* Right: zoom */}
      <div className="flex items-center gap-2">
        <button
          className="btn btn-ghost p-1.5"
          onClick={() => setZoom(zoom / 1.5)}
          aria-label="Zoom out"
          title="Zoom out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="text-xs text-text-muted w-12 text-center">
          {Math.round((zoom / 100) * 100)}%
        </span>
        <button
          className="btn btn-ghost p-1.5"
          onClick={() => setZoom(zoom * 1.5)}
          aria-label="Zoom in"
          title="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
