'use client'

import {
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Gauge,
} from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { getActiveSubtitle, formatTimeShort } from '@/lib/subtitles/utils'
import { SubtitleStyle } from '@/types/subtitle'
import clsx from 'clsx'

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    video,
    subtitles,
    currentTime,
    isPlaying,
    style,
    selectedSubtitleId,
    setCurrentTime,
    setIsPlaying,
    setDuration,
    selectSubtitle,
  } = useEditorStore()

  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeSubtitle = getActiveSubtitle(subtitles, currentTime)

  // ─── Sync video time → store ────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }
    const onDurationChange = () => {
      if (video.duration && isFinite(video.duration)) {
        setDuration(video.duration)
      }
    }
    const onEnded = () => setIsPlaying(false)

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('durationchange', onDurationChange)
    video.addEventListener('ended', onEnded)

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('durationchange', onDurationChange)
      video.removeEventListener('ended', onEnded)
    }
  }, [setCurrentTime, setDuration, setIsPlaying])

  // ─── Sync store isPlaying → video ───────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false))
    } else {
      video.pause()
    }
  }, [isPlaying, setIsPlaying])

  // ─── Seek video when currentTime is changed externally ──────────────────
  const lastExternalSeek = useRef(0)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // Only seek if the difference is large enough (external seek, not natural playback)
    if (Math.abs(video.currentTime - currentTime) > 0.5) {
      video.currentTime = currentTime
      lastExternalSeek.current = currentTime
    }
  }, [currentTime])

  // ─── Volume ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.volume = isMuted ? 0 : volume
    video.muted = isMuted
  }, [volume, isMuted])

  // ─── Playback speed ──────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = playbackSpeed
  }, [playbackSpeed])

  // ─── Auto-highlight active subtitle ─────────────────────────────────────
  useEffect(() => {
    if (activeSubtitle && activeSubtitle.id !== selectedSubtitleId) {
      // Don't auto-select while playing — just highlight via CSS
    }
  }, [activeSubtitle, selectedSubtitleId])

  // ─── Fullscreen ──────────────────────────────────────────────────────────
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      container.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // ─── Progress bar click ──────────────────────────────────────────────────
  const onProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current
      if (!video || !video.duration) return
      const rect = e.currentTarget.getBoundingClientRect()
      const ratio = (e.clientX - rect.left) / rect.width
      const newTime = ratio * video.duration
      video.currentTime = newTime
      setCurrentTime(newTime)
    },
    [setCurrentTime]
  )

  // ─── Controls visibility ─────────────────────────────────────────────────
  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
    if (isPlaying) {
      hideControlsTimer.current = setTimeout(() => setShowControls(false), 2500)
    }
  }, [isPlaying])

  const duration = videoRef.current?.duration ?? 0
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  const subtitleStyle = buildSubtitleStyle(style)

  if (!video) {
    return (
      <div className="video-container flex-1 flex items-center justify-center">
        <p className="text-text-muted text-sm">No video loaded</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="video-container flex-1 group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={video.url}
        className="max-w-full max-h-full"
        onClick={() => setIsPlaying(!isPlaying)}
        preload="metadata"
        playsInline
      />

      {/* Subtitle overlay */}
      {activeSubtitle && (
        <div
          className={clsx(
            'subtitle-overlay',
            style.position === 'top' && 'subtitle-overlay-top',
            style.position === 'center' && 'subtitle-overlay-center'
          )}
          style={{
            maxWidth: `${style.maxWidth}%`,
          }}
        >
          <span style={subtitleStyle}>{activeSubtitle.text}</span>
        </div>
      )}

      {/* Controls overlay */}
      <div
        className={clsx(
          'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-200',
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Progress bar */}
        <div
          className="mx-3 mb-2 h-1 rounded-full bg-white/20 cursor-pointer hover:h-2 transition-all"
          onClick={onProgressClick}
          role="slider"
          aria-label="Video progress"
          aria-valuenow={progressPercent}
          tabIndex={0}
        >
          <div
            className="h-full bg-accent rounded-full pointer-events-none"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Controls bar */}
        <div className="flex items-center gap-2 px-3 pb-3">
          {/* Play/Pause */}
          <button
            className="btn btn-ghost p-1.5 text-white hover:text-white"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Skip back 5s */}
          <button
            className="btn btn-ghost p-1.5 text-white/70 hover:text-white"
            onClick={() => {
              const v = videoRef.current
              if (v) { v.currentTime = Math.max(0, v.currentTime - 5); setCurrentTime(v.currentTime) }
            }}
            aria-label="Skip back 5 seconds"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          {/* Skip forward 5s */}
          <button
            className="btn btn-ghost p-1.5 text-white/70 hover:text-white"
            onClick={() => {
              const v = videoRef.current
              if (v) { v.currentTime = Math.min(v.duration, v.currentTime + 5); setCurrentTime(v.currentTime) }
            }}
            aria-label="Skip forward 5 seconds"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Time */}
          <span className="text-xs text-white/80 font-mono ml-1">
            {formatTimeShort(currentTime)} / {formatTimeShort(duration)}
          </span>

          <div className="flex-1" />

          {/* Volume */}
          <div className="flex items-center gap-1.5">
            <button
              className="btn btn-ghost p-1.5 text-white/70 hover:text-white"
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const v = parseFloat(e.target.value)
                setVolume(v)
                setIsMuted(v === 0)
              }}
              className="w-16 h-1 accent-accent cursor-pointer"
              aria-label="Volume"
            />
          </div>

          {/* Playback speed */}
          <div className="relative">
            <button
              className="btn btn-ghost p-1.5 text-white/70 hover:text-white flex items-center gap-1 text-xs"
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              aria-label="Playback speed"
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>{playbackSpeed}×</span>
            </button>
            {showSpeedMenu && (
              <div className="absolute bottom-full right-0 mb-1 bg-bg-elevated border border-bg-border rounded-lg py-1 min-w-[80px] shadow-lg z-50">
                {PLAYBACK_SPEEDS.map((speed) => (
                  <button
                    key={speed}
                    className={clsx(
                      'w-full text-left px-3 py-1.5 text-xs hover:bg-bg-hover transition-colors',
                      speed === playbackSpeed ? 'text-accent' : 'text-text-primary'
                    )}
                    onClick={() => { setPlaybackSpeed(speed); setShowSpeedMenu(false) }}
                  >
                    {speed}×
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <button
            className="btn btn-ghost p-1.5 text-white/70 hover:text-white"
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function buildSubtitleStyle(style: SubtitleStyle): React.CSSProperties {
  const bgAlpha = Math.round(style.backgroundOpacity * 2.55)
    .toString(16)
    .padStart(2, '0')
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`
  }

  return {
    display: 'inline-block',
    fontFamily: style.fontFamily,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    color: style.color,
    backgroundColor: hexToRgba(style.backgroundColor, style.backgroundOpacity),
    textAlign: style.textAlign,
    padding: '4px 10px',
    borderRadius: '3px',
    textShadow: style.outline
      ? `1px 1px 2px ${style.outlineColor}, -1px -1px 2px ${style.outlineColor}`
      : undefined,
    lineHeight: 1.4,
  }
}
