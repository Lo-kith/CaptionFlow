import type { Metadata } from 'next'
import UploadZone from '@/components/upload/UploadZone'
import { Captions, Sparkles, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CaptionFlow — AI Subtitle Editor',
  description: 'Upload your video and get perfectly timed AI-generated subtitles in seconds.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-bg-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <Captions className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-base tracking-tight">CaptionFlow</span>
        </div>
        <nav className="flex items-center gap-4">
          <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Features
          </a>
        </nav>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-subtle border border-accent/20 text-accent text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3" />
            Powered Loki-chaos creator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4 leading-tight">
            Turn your videos into<br />
            <span className="text-accent">perfectly timed subtitles</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Upload a video and let AI automatically transcribe, synchronize
            and prepare editable subtitles. Edit on a professional timeline.
            Export SRT, VTT, or burned-in video.
          </p>
        </div>

        <UploadZone />

        {/* Features */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 max-w-3xl w-full">
          {[
            {
              icon: Zap,
              title: 'AI Transcription',
              desc: 'Whisper-powered speech recognition with accurate timestamps',
            },
            {
              icon: Captions,
              title: 'Professional Editor',
              desc: 'Edit subtitles on a visual timeline with drag-and-drop precision',
            },
            {
              icon: Sparkles,
              title: 'Flexible Export',
              desc: 'Download SRT, VTT, or video with burned-in subtitles',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-5 rounded-xl bg-bg-secondary border border-bg-border"
            >
              <div className="w-9 h-9 rounded-lg bg-accent-subtle border border-accent/20 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-accent" />
              </div>
              <h3 className="font-semibold text-sm text-text-primary mb-1">{title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-bg-border px-6 py-4 text-center">
        <p className="text-xs text-text-muted">
          CaptionFlow — built with Next.js, FFmpeg, and Groq Whisper
        </p>
      </footer>
    </main>
  )
}
