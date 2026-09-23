'use client'

import { useEffect, useRef } from 'react'
import { Plus, RotateCcw, RotateCw } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { getActiveSubtitle, sortSubtitles } from '@/lib/subtitles/utils'
import SubtitleRow from './SubtitleRow'

export default function SubtitleEditor() {
  const {
    subtitles,
    selectedSubtitleId,
    currentTime,
    addSubtitle,
    undo,
    redo,
    historyIndex,
    history,
  } = useEditorStore()

  const listRef = useRef<HTMLDivElement>(null)
  const sorted = sortSubtitles(subtitles)
  const activeSubtitle = getActiveSubtitle(subtitles, currentTime)

  // Auto-scroll to active subtitle
  useEffect(() => {
    if (!activeSubtitle || !listRef.current) return
    const el = listRef.current.querySelector(`[data-sub-id="${activeSubtitle.id}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeSubtitle?.id])

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  return (
    <div className="flex flex-col h-full bg-bg-secondary border-l border-bg-border">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-bg-border flex-shrink-0">
        <h2 className="text-sm font-semibold text-text-primary">
          Subtitles
          <span className="ml-2 text-xs font-normal text-text-muted">
            {sorted.length}
          </span>
        </h2>
        <div className="flex items-center gap-1">
          <button
            className="btn btn-ghost p-1.5"
            onClick={undo}
            disabled={!canUndo}
            aria-label="Undo (Ctrl+Z)"
            title="Undo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            className="btn btn-ghost p-1.5"
            onClick={redo}
            disabled={!canRedo}
            aria-label="Redo (Ctrl+Y)"
            title="Redo"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-bg-border mx-1" />
          <button
            className="btn btn-ghost p-1.5 flex items-center gap-1 text-xs"
            onClick={() => addSubtitle(selectedSubtitleId ?? undefined)}
            aria-label="Add subtitle"
            title="Add subtitle"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* List */}
      <div ref={listRef} className="flex-1 overflow-y-auto" role="grid" aria-label="Subtitle list">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <p className="text-sm text-text-muted mb-3">No subtitles yet</p>
            <button className="btn btn-secondary text-xs" onClick={() => addSubtitle()}>
              <Plus className="w-3.5 h-3.5" />
              Add subtitle
            </button>
          </div>
        ) : (
          sorted.map((sub, i) => (
            <div key={sub.id} data-sub-id={sub.id}>
              <SubtitleRow
                subtitle={sub}
                index={i}
                isActive={activeSubtitle?.id === sub.id}
                isSelected={selectedSubtitleId === sub.id}
                canMergeNext={i < sorted.length - 1}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
