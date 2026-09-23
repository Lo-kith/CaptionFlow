'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Captions, Download, Settings, RotateCcw, RotateCw, ChevronLeft } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import VideoPlayer from '@/components/video/VideoPlayer'
import SubtitleEditor from '@/components/editor/SubtitleEditor'
import Timeline from '@/components/editor/Timeline'
import TimelineControls from '@/components/editor/TimelineControls'
import StylePanel from '@/components/editor/StylePanel'
import ExportDialog from '@/components/export/ExportDialog'

type SideTab = 'subtitles' | 'style'

export default function EditorPage() {
  const router = useRouter()
  const { video, undo, redo, historyIndex, history } = useEditorStore()
  const [showExport, setShowExport] = useState(false)
  const [sideTab, setSideTab] = useState<SideTab>('subtitles')

  // Register global keyboard shortcuts
  useKeyboardShortcuts()

  // Redirect to home if no video loaded
  useEffect(() => {
    if (!video) {
      router.push('/')
    }
  }, [video, router])

  if (!video) return null

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  return (
    <div className="editor-layout">
      {/* ─── Top Bar ──────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-4 border-b border-bg-border bg-bg-secondary flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            className="btn btn-ghost p-1.5 text-text-muted"
            onClick={() => router.push('/')}
            aria-label="Back to home"
            title="Back to home"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-accent flex items-center justify-center">
              <Captions className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight">CaptionFlow</span>
          </div>
          <div className="h-4 w-px bg-bg-border mx-1" />
          <span className="text-xs text-text-muted truncate max-w-[200px]">
            {video.metadata.width}×{video.metadata.height}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Undo/Redo */}
          <button
            className="btn btn-ghost p-1.5"
            onClick={undo}
            disabled={!canUndo}
            aria-label="Undo"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            className="btn btn-ghost p-1.5"
            onClick={redo}
            disabled={!canRedo}
            aria-label="Redo"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-4 bg-bg-border mx-1" />

          {/* Export */}
          <button
            className="btn btn-primary text-sm"
            onClick={() => setShowExport(true)}
            aria-label="Export subtitles or video"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </header>

      {/* ─── Main Area ────────────────────────────────────────────────────── */}
      <div className="editor-main min-h-0">
        {/* Left: Video Player */}
        <div className="flex flex-col min-h-0 border-r border-bg-border">
          <VideoPlayer />
        </div>

        {/* Right: Side Panel */}
        <div className="flex flex-col min-h-0 overflow-hidden bg-bg-secondary">
          {/* Tab bar */}
          <div className="flex border-b border-bg-border flex-shrink-0">
            <button
              className={`flex-1 py-2 text-xs font-medium transition-colors border-b-2 ${
                sideTab === 'subtitles'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-muted hover:text-text-primary'
              }`}
              onClick={() => setSideTab('subtitles')}
              aria-selected={sideTab === 'subtitles'}
            >
              Subtitles
            </button>
            <button
              className={`flex-1 py-2 text-xs font-medium transition-colors border-b-2 ${
                sideTab === 'style'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-muted hover:text-text-primary'
              }`}
              onClick={() => setSideTab('style')}
              aria-selected={sideTab === 'style'}
            >
              Style
            </button>
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-hidden">
            {sideTab === 'subtitles' ? <SubtitleEditor /> : <StylePanel />}
          </div>
        </div>
      </div>

      {/* ─── Timeline ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col min-h-0">
        <TimelineControls />
        <Timeline />
      </div>

      {/* ─── Export Dialog ────────────────────────────────────────────────── */}
      {showExport && <ExportDialog onClose={() => setShowExport(false)} />}
    </div>
  )
}
