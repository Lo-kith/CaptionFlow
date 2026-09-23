import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'CaptionFlow — AI Subtitle Editor',
  description:
    'Turn your videos into perfectly timed subtitles. Upload a video and let AI automatically transcribe, synchronize and prepare subtitles.',
  keywords: ['subtitle editor', 'AI transcription', 'caption generator', 'SRT', 'VTT'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
