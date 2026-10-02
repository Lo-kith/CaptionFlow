'use client'

import { create } from 'zustand'
import { SubtitleSegment, SubtitleStyle, DEFAULT_SUBTITLE_STYLE } from '@/types/subtitle'
import { VideoMetadata } from '@/types/video'
import {
  splitSubtitle,
  mergeSubtitles,
  generateSubtitleId,
  sortSubtitles,
  clamp,
} from '@/lib/subtitles/utils'

const MAX_HISTORY = 50

export interface VideoState {
  filePath: string
  url: string
  metadata: VideoMetadata
}

export interface EditorState {
  // Video
  video: VideoState | null

  // Subtitles
  subtitles: SubtitleSegment[]
  selectedSubtitleId: string | null

  // Playback
  currentTime: number
  isPlaying: boolean
  duration: number

  // Timeline
  zoom: number // pixels per second

  // Style
  style: SubtitleStyle

  // History for undo/redo
  history: SubtitleSegment[][]
  historyIndex: number

  // UI state
  isExporting: boolean
  exportProgress: string | null
}

export interface EditorActions {
  // Video
  setVideo: (video: VideoState) => void

  // Subtitles (all history-tracked)
  setSubtitles: (subtitles: SubtitleSegment[]) => void
  updateSubtitle: (id: string, changes: Partial<SubtitleSegment>) => void
  addSubtitle: (after?: string) => void
  deleteSubtitle: (id: string) => void
  splitSubtitleAtTime: (id: string, time: number) => void
  mergeWithNext: (id: string) => void

  // Selection
  selectSubtitle: (id: string | null) => void

  // Playback
  setCurrentTime: (time: number) => void
  setIsPlaying: (playing: boolean) => void
  setDuration: (duration: number) => void

  // Timeline
  setZoom: (zoom: number) => void
  zoomOut: (factor: number) => void

  // Style
  updateStyle: (changes: Partial<SubtitleStyle>) => void

  // History
  undo: () => void
  redo: () => void

  // Export
  setExporting: (exporting: boolean, progress?: string) => void

  // Reset
  reset: () => void
}

const initialState: EditorState = {
  video: null,
  subtitles: [],
  selectedSubtitleId: null,
  currentTime: 0,
  isPlaying: false,
  duration: 0,
  zoom: 100,
  style: DEFAULT_SUBTITLE_STYLE,
  history: [],
  historyIndex: -1,
  isExporting: false,
  exportProgress: null,
}

export const useEditorStore = create<EditorState & EditorActions>((set, get) => ({
  ...initialState,

  // ─── Video ────────────────────────────────────────────────────────────────

  setVideo: (video) => set({ video }),

  // ─── Subtitle helpers ─────────────────────────────────────────────────────

  setSubtitles: (subtitles) => {
    pushHistory(set, get, subtitles)
  },

  updateSubtitle: (id, changes) => {
    const { subtitles } = get()
    const updated = subtitles.map((s) =>
      s.id === id ? { ...s, ...changes } : s
    )
    pushHistory(set, get, updated)
  },

  addSubtitle: (afterId) => {
    const { subtitles, duration } = get()
    const sorted = sortSubtitles(subtitles)

    let start = 0
    let end = Math.min(3, duration)

    if (afterId) {
      const idx = sorted.findIndex((s) => s.id === afterId)
      if (idx !== -1) {
        const prev = sorted[idx]
        start = prev.end
        end = Math.min(prev.end + 3, duration)
      }
    } else if (sorted.length > 0) {
      const last = sorted[sorted.length - 1]
      start = last.end
      end = Math.min(last.end + 3, duration)
    }

    const newSub: SubtitleSegment = {
      id: generateSubtitleId(),
      start,
      end,
      text: 'New subtitle',
    }

    const updated = sortSubtitles([...subtitles, newSub])
    pushHistory(set, get, updated)
    set({ selectedSubtitleId: newSub.id })
  },

  deleteSubtitle: (id) => {
    const { subtitles } = get()
    const updated = subtitles.filter((s) => s.id !== id)
    pushHistory(set, get, updated)
    set({ selectedSubtitleId: null })
  },

  splitSubtitleAtTime: (id, time) => {
    const { subtitles } = get()
    const sub = subtitles.find((s) => s.id === id)
    if (!sub) return

    const result = splitSubtitle(sub, time)
    if (!result) return

    const [first, second] = result
    const updated = subtitles
      .filter((s) => s.id !== id)
      .concat([first, second])

    pushHistory(set, get, sortSubtitles(updated))
    set({ selectedSubtitleId: first.id })
  },

  mergeWithNext: (id) => {
    const { subtitles } = get()
    const sorted = sortSubtitles(subtitles)
    const idx = sorted.findIndex((s) => s.id === id)
    if (idx === -1 || idx >= sorted.length - 1) return

    const merged = mergeSubtitles(sorted[idx], sorted[idx + 1])
    const updated = [
      ...sorted.slice(0, idx),
      merged,
      ...sorted.slice(idx + 2),
    ]

    pushHistory(set, get, updated)
    set({ selectedSubtitleId: merged.id })
  },

  // ─── Selection ────────────────────────────────────────────────────────────

  selectSubtitle: (id) => set({ selectedSubtitleId: id }),

  // ─── Playback ─────────────────────────────────────────────────────────────

  setCurrentTime: (time) => set({ currentTime: time }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setDuration: (duration) => set({ duration }),

  // ─── Timeline ─────────────────────────────────────────────────────────────

  setZoom: (zoom) => set({ zoom: clamp(zoom, 20, 500) }),

  zoomOut: (factor) =>
    set((state) => ({ zoom: clamp(state.zoom * factor, 20, 500) })),

  // ─── Style ────────────────────────────────────────────────────────────────

  updateStyle: (changes) =>
    set((state) => ({ style: { ...state.style, ...changes } })),

  // ─── History ──────────────────────────────────────────────────────────────

  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex <= 0) return
    const newIndex = historyIndex - 1
    set({ subtitles: history[newIndex], historyIndex: newIndex })
  },

  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex >= history.length - 1) return
    const newIndex = historyIndex + 1
    set({ subtitles: history[newIndex], historyIndex: newIndex })
  },

  // ─── Export ───────────────────────────────────────────────────────────────

  setExporting: (isExporting: boolean, exportProgress?: string) =>
    set({ isExporting, exportProgress: exportProgress ?? null }),

  // ─── Reset ────────────────────────────────────────────────────────────────

  reset: () => set(initialState),
}))

/**
 * Push a new state to history, truncating any redo branch.
 */
function pushHistory(
  set: (partial: Partial<EditorState & EditorActions>) => void,
  get: () => EditorState & EditorActions,
  subtitles: SubtitleSegment[]
): void {
  const { history, historyIndex } = get()
  const newHistory = history.slice(0, historyIndex + 1)
  newHistory.push(subtitles)
  if (newHistory.length > MAX_HISTORY) {
    newHistory.shift()
  }
  set({
    subtitles,
    history: newHistory,
    historyIndex: newHistory.length - 1,
  })
}
