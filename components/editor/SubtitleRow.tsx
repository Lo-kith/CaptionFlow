'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { Trash2, Scissors, Merge, Plus } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { SubtitleSegment } from '@/types/subtitle'
import { formatTimestamp, parseTimestamp } from '@/lib/subtitles/utils'
import clsx from 'clsx'

interface SubtitleRowProps {
  subtitle: SubtitleSegment
  index: number
  isActive: boolean
  isSelected: boolean
  canMergeNext: boolean
}

export default function SubtitleRow({
  subtitle,
  index,
  isActive,
  isSelected,
  canMergeNext,
}: SubtitleRowProps) {
  const {
    updateSubtitle,
    deleteSubtitle,
    splitSubtitleAtTime,
    mergeWithNext,
    selectSubtitle,
    setCurrentTime,
    currentTime,
  } = useEditorStore()

  const [editingStart, setEditingStart] = useState(false)
  const [editingEnd, setEditingEnd] = useState(false)
  const [startValue, setStartValue] = useState('')
  const [endValue, setEndValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = ta.scrollHeight + 'px'
  }, [subtitle.text])

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateSubtitle(subtitle.id, { text: e.target.value })
    },
    [subtitle.id, updateSubtitle]
  )

  const handleStartEdit = () => {
    setStartValue(formatTimestamp(subtitle.start))
    setEditingStart(true)
  }

  const handleEndEdit = () => {
    setEndValue(formatTimestamp(subtitle.end))
    setEditingEnd(true)
  }

  const commitStart = () => {
    const parsed = parseTimestamp(startValue)
    if (!isNaN(parsed) && parsed >= 0 && parsed < subtitle.end) {
      updateSubtitle(subtitle.id, { start: parsed })
    }
    setEditingStart(false)
  }

  const commitEnd = () => {
    const parsed = parseTimestamp(endValue)
    if (!isNaN(parsed) && parsed > subtitle.start) {
      updateSubtitle(subtitle.id, { end: parsed })
    }
    setEditingEnd(false)
  }

  const handleRowClick = () => {
    selectSubtitle(subtitle.id)
    setCurrentTime(subtitle.start)
  }

  return (
    <div
      className={clsx(
        'subtitle-row flex gap-2 p-2 cursor-pointer',
        isActive && 'active',
        isSelected && !isActive && 'selected'
      )}
      onClick={handleRowClick}
      role="row"
      aria-selected={isSelected}
    >
      {/* Index */}
      <div className="flex-shrink-0 w-6 text-right">
        <span className="text-xs text-text-disabled font-mono leading-8">{index + 1}</span>
      </div>

      {/* Timestamps */}
      <div className="flex-shrink-0 flex flex-col gap-1 pt-1">
        {/* Start */}
        {editingStart ? (
          <input
            className="input w-24 text-xs font-mono py-0.5"
            value={startValue}
            autoFocus
            onChange={(e) => setStartValue(e.target.value)}
            onBlur={commitStart}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitStart()
              if (e.key === 'Escape') setEditingStart(false)
              e.stopPropagation()
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <button
            className="text-xs font-mono text-text-secondary hover:text-accent bg-transparent border-none cursor-text text-left w-24"
            onClick={(e) => { e.stopPropagation(); handleStartEdit() }}
            aria-label={`Edit start time: ${formatTimestamp(subtitle.start)}`}
          >
            {formatTimestamp(subtitle.start)}
          </button>
        )}

        {/* Arrow */}
        <span className="text-xs text-text-disabled text-center">↓</span>

        {/* End */}
        {editingEnd ? (
          <input
            className="input w-24 text-xs font-mono py-0.5"
            value={endValue}
            autoFocus
            onChange={(e) => setEndValue(e.target.value)}
            onBlur={commitEnd}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitEnd()
              if (e.key === 'Escape') setEditingEnd(false)
              e.stopPropagation()
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <button
            className="text-xs font-mono text-text-secondary hover:text-accent bg-transparent border-none cursor-text text-left w-24"
            onClick={(e) => { e.stopPropagation(); handleEndEdit() }}
            aria-label={`Edit end time: ${formatTimestamp(subtitle.end)}`}
          >
            {formatTimestamp(subtitle.end)}
          </button>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <textarea
          ref={textareaRef}
          className="input resize-none text-sm leading-relaxed min-h-[40px] overflow-hidden"
          value={subtitle.text}
          onChange={handleTextChange}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          aria-label={`Subtitle ${index + 1} text`}
          rows={1}
        />
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex flex-col gap-1 pt-1">
        <button
          className="btn btn-ghost p-1 text-text-muted hover:text-accent"
          onClick={(e) => {
            e.stopPropagation()
            splitSubtitleAtTime(subtitle.id, currentTime)
          }}
          data-tooltip="Split at playhead (S)"
          aria-label="Split subtitle at playhead"
          title="Split at playhead"
        >
          <Scissors className="w-3 h-3" />
        </button>

        {canMergeNext && (
          <button
            className="btn btn-ghost p-1 text-text-muted hover:text-accent"
            onClick={(e) => {
              e.stopPropagation()
              mergeWithNext(subtitle.id)
            }}
            data-tooltip="Merge with next"
            aria-label="Merge with next subtitle"
            title="Merge with next"
          >
            <Merge className="w-3 h-3" />
          </button>
        )}

        <button
          className="btn btn-ghost p-1 text-text-muted hover:text-status-error"
          onClick={(e) => {
            e.stopPropagation()
            deleteSubtitle(subtitle.id)
          }}
          data-tooltip="Delete (Del)"
          aria-label="Delete subtitle"
          title="Delete subtitle"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
