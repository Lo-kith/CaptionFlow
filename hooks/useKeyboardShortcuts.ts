'use client'

import { useEffect, useCallback } from 'react'
import { useEditorStore } from '@/store/editorStore'
import { getActiveSubtitle } from '@/lib/subtitles/utils'

/**
 * Global keyboard shortcuts for the editor.
 * Only active when the editor is mounted.
 */
export function useKeyboardShortcuts() {
  const {
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    selectedSubtitleId,
    subtitles,
    splitSubtitleAtTime,
    deleteSubtitle,
    undo,
    redo,
    historyIndex,
    history,
  } = useEditorStore()

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't intercept when typing in an input, textarea, or select
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        return
      }

      switch (e.key) {
        case ' ':
          e.preventDefault()
          setIsPlaying(!isPlaying)
          break

        case 'ArrowLeft':
          e.preventDefault()
          setCurrentTime(Math.max(0, currentTime - (e.shiftKey ? 5 : 1)))
          break

        case 'ArrowRight':
          e.preventDefault()
          setCurrentTime(Math.min(duration, currentTime + (e.shiftKey ? 5 : 1)))
          break

        case 's':
        case 'S':
          if (!e.ctrlKey && !e.metaKey && selectedSubtitleId) {
            e.preventDefault()
            splitSubtitleAtTime(selectedSubtitleId, currentTime)
          }
          break

        case 'Delete':
        case 'Backspace':
          if (selectedSubtitleId && e.key === 'Delete') {
            e.preventDefault()
            deleteSubtitle(selectedSubtitleId)
          }
          break

        case 'z':
        case 'Z':
          if ((e.ctrlKey || e.metaKey) && !e.shiftKey && canUndo) {
            e.preventDefault()
            undo()
          }
          break

        case 'y':
        case 'Y':
          if ((e.ctrlKey || e.metaKey) && canRedo) {
            e.preventDefault()
            redo()
          }
          break
      }
    },
    [
      isPlaying,
      setIsPlaying,
      currentTime,
      setCurrentTime,
      duration,
      selectedSubtitleId,
      splitSubtitleAtTime,
      deleteSubtitle,
      undo,
      redo,
      canUndo,
      canRedo,
    ]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
