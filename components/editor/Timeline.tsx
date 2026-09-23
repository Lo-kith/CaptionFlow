'use client'

import {
  useRef,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react'
import { useEditorStore } from '@/store/editorStore'
import { SubtitleSegment } from '@/types/subtitle'
import { getActiveSubtitle, clamp, sortSubtitles } from '@/lib/subtitles/utils'
import clsx from 'clsx'

const MIN_DURATION = 0.1
const RULER_HEIGHT = 28

interface DragState {
  type: 'move' | 'resize-left' | 'resize-right'
  subtitleId: string
  startX: number
  originalStart: number
  originalEnd: number
}

export default function Timeline() {
  const {
    subtitles,
    duration,
    currentTime,
    zoom,
    selectedSubtitleId,
    isPlaying,
    setCurrentTime,
    setIsPlaying,
    selectSubtitle,
    updateSubtitle,
  } = useEditorStore()

  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const animFrameRef = useRef<number>(0)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const sorted = sortSubtitles(subtitles)
  const activeSubtitle = getActiveSubtitle(subtitles, currentTime)

  // Pixels per second
  const pps = zoom

  // Total width of the timeline content
  const totalWidth = Math.max(duration * pps + 120, 800)

  // ─── Ruler marks ─────────────────────────────────────────────────────────
  const rulerMarks = useMemo(() => {
    const marks: { time: number; label: string; isMajor: boolean }[] = []
    if (!duration) return marks

    // Choose step based on zoom
    let stepSec = 1
    if (zoom < 30) stepSec = 10
    else if (zoom < 60) stepSec = 5
    else if (zoom < 120) stepSec = 2
    else if (zoom >= 200) stepSec = 0.5

    for (let t = 0; t <= duration; t += stepSec) {
      const isMajor = stepSec >= 1 || Math.round(t) === t
      const mins = Math.floor(t / 60)
      const secs = (t % 60).toFixed(stepSec < 1 ? 1 : 0)
      const label = `${String(mins).padStart(2, '0')}:${String(secs).padStart(stepSec < 1 ? 4 : 2, '0')}`
      marks.push({ time: t, label, isMajor })
    }
    return marks
  }, [duration, zoom])

  // ─── Playhead ─────────────────────────────────────────────────────────────
  const playheadX = currentTime * pps

  // Auto-scroll playhead into view
  useEffect(() => {
    if (!isPlaying || !containerRef.current) return
    const container = containerRef.current
    const margin = 80
    if (
      playheadX < container.scrollLeft + margin ||
      playheadX > container.scrollLeft + container.clientWidth - margin
    ) {
      container.scrollLeft = playheadX - container.clientWidth / 2
    }
  }, [playheadX, isPlaying])

  // ─── Timeline click → seek ────────────────────────────────────────────────
  const handleTimelineClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (dragRef.current) return
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left + container.scrollLeft
      const time = clamp(x / pps, 0, duration)
      setCurrentTime(time)
      if (isPlaying) setIsPlaying(false)
    },
    [pps, duration, setCurrentTime, isPlaying, setIsPlaying]
  )

  // ─── Drag logic ───────────────────────────────────────────────────────────
  const startDrag = useCallback(
    (
      e: React.MouseEvent,
      subtitle: SubtitleSegment,
      type: DragState['type']
    ) => {
      e.stopPropagation()
      e.preventDefault()
      selectSubtitle(subtitle.id)

      dragRef.current = {
        type,
        subtitleId: subtitle.id,
        startX: e.clientX,
        originalStart: subtitle.start,
        originalEnd: subtitle.end,
      }
      setDraggedId(subtitle.id)
    },
    [selectSubtitle]
  )

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const drag = dragRef.current
      if (!drag) return

      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = requestAnimationFrame(() => {
        const dx = e.clientX - drag.startX
        const dt = dx / pps

        const sub = subtitles.find((s) => s.id === drag.subtitleId)
        if (!sub) return

        let newStart = drag.originalStart
        let newEnd = drag.originalEnd

        if (drag.type === 'move') {
          const d = drag.originalEnd - drag.originalStart
          newStart = clamp(drag.originalStart + dt, 0, duration - d)
          newEnd = newStart + d
        } else if (drag.type === 'resize-left') {
          newStart = clamp(drag.originalStart + dt, 0, drag.originalEnd - MIN_DURATION)
        } else if (drag.type === 'resize-right') {
          newEnd = clamp(drag.originalEnd + dt, drag.originalStart + MIN_DURATION, duration)
        }

        updateSubtitle(drag.subtitleId, { start: newStart, end: newEnd })
      })
    }

    const onMouseUp = () => {
      if (!dragRef.current) return
      cancelAnimationFrame(animFrameRef.current)
      dragRef.current = null
      setDraggedId(null)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [pps, subtitles, duration, updateSubtitle])

  return (
    <div className="timeline-container select-none" ref={containerRef}>
      {/* Inner scrollable area */}
      <div
        style={{ width: totalWidth, position: 'relative' }}
        onClick={handleTimelineClick}
      >
        {/* ─── Ruler ──────────────────────────────────────────────────────── */}
        <div
          className="timeline-ruler flex items-end overflow-hidden"
          style={{ width: totalWidth }}
        >
          {rulerMarks.map(({ time, label, isMajor }) => (
            <div
              key={time}
              className="absolute flex flex-col items-center"
              style={{ left: time * pps }}
            >
              <span className="text-[10px] text-text-disabled leading-none mb-0.5">
                {isMajor ? label : ''}
              </span>
              <div
                className={clsx(
                  'w-px',
                  isMajor ? 'h-3 bg-bg-border' : 'h-2 bg-bg-border/50'
                )}
              />
            </div>
          ))}
        </div>

        {/* ─── Track ──────────────────────────────────────────────────────── */}
        <div
          className="timeline-track"
          style={{ width: totalWidth }}
        >
          {sorted.map((sub) => {
            const left = sub.start * pps
            const width = Math.max((sub.end - sub.start) * pps, 4)
            const isActive = activeSubtitle?.id === sub.id
            const isSelected = selectedSubtitleId === sub.id
            const isDragging = draggedId === sub.id

            return (
              <div
                key={sub.id}
                className={clsx(
                  'timeline-block',
                  isActive && 'active',
                  isSelected && 'selected',
                  isDragging && 'opacity-90'
                )}
                style={{ left, width }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  startDrag(e, sub, 'move')
                  setCurrentTime(sub.start)
                }}
                role="button"
                aria-label={`Subtitle: ${sub.text}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    selectSubtitle(sub.id)
                    setCurrentTime(sub.start)
                  }
                }}
              >
                {/* Resize left */}
                <div
                  className="timeline-resize-handle timeline-resize-handle-left"
                  onMouseDown={(e) => startDrag(e, sub, 'resize-left')}
                />

                {/* Label */}
                <span className="timeline-block-label pointer-events-none">
                  {sub.text}
                </span>

                {/* Resize right */}
                <div
                  className="timeline-resize-handle timeline-resize-handle-right"
                  onMouseDown={(e) => startDrag(e, sub, 'resize-right')}
                />
              </div>
            )
          })}
        </div>

        {/* ─── Playhead ─────────────────────────────────────────────────── */}
        <div
          className="playhead"
          style={{ left: playheadX, top: 0, bottom: 0, height: '100%' }}
        />
      </div>
    </div>
  )
}
