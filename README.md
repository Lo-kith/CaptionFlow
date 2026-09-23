# CaptionFlow

**AI-powered subtitle editor** — upload a video, transcribe speech automatically, edit subtitles on a professional timeline, and export SRT, VTT, or video with burned-in captions.

![CaptionFlow Editor](./public/preview.png)

---

## Features

- 🎬 **Drag-and-drop video upload** — MP4, MOV, MKV, AVI, WebM
- 🤖 **AI transcription** — Groq Whisper with accurate word-level timestamps
- ✏️ **Professional subtitle editor** — edit text, start/end times inline
- 🎯 **Visual timeline** — drag and resize subtitle blocks with precision
- ▶️ **Video player with subtitle overlay** — live preview as you edit
- ✂️ **Split / Merge** subtitles with one click
- ↩️ **Undo/Redo** — full history stack (50 states)
- 🎨 **Subtitle styling** — font, size, color, background, position, alignment, outline
- ⌨️ **Keyboard shortcuts** — Space, arrows, S (split), Delete, Ctrl+Z/Y
- 📤 **Export SRT, VTT, or burned-in video** via FFmpeg

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 18, TypeScript, Tailwind CSS |
| State | Zustand |
| Icons | Lucide React |
| Backend | Next.js API Routes |
| Video processing | FFmpeg / FFprobe |
| Transcription | Groq Whisper (`whisper-large-v3`) |
| File upload | Native FormData / Next.js |

---

## Requirements

- **Node.js** 18+
- **FFmpeg** and **FFprobe** installed and in PATH
- **Groq API key** (free tier available at https://console.groq.com)

---

## FFmpeg Installation

### Windows
Download from https://ffmpeg.org/download.html and add the `bin` directory to your PATH.

Or use winget:
```powershell
winget install Gyan.FFmpeg
```

### macOS
```bash
brew install ffmpeg
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update && sudo apt install ffmpeg
```

Verify:
```bash
ffmpeg -version
ffprobe -version
```

---

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

```env
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional
MAX_FILE_SIZE_MB=500
```

Get your free Groq API key at https://console.groq.com

---

## Installation

```bash
git clone https://github.com/your-org/captionflow
cd captionflow
npm install
cp .env.example .env.local
# Edit .env.local with your GROQ_API_KEY
```

---

## Development

```bash
npm run dev
```

Open http://localhost:3000

---

## Production Build

```bash
npm run build
npm start
```

---

## How Transcription Works

1. User uploads a video file
2. FFprobe validates the video and extracts metadata
3. FFmpeg extracts audio as 16kHz mono WAV (optimal for Whisper)
4. Audio is sent to Groq's Whisper API (`whisper-large-v3`)
5. Groq returns transcript with segment-level timestamps
6. Segments are normalized into `SubtitleSegment[]` with `start/end` in seconds
7. The audio file is deleted after transcription
8. The subtitle editor opens with the generated segments

### Transcription Provider Abstraction

The transcription provider is decoupled via:

```ts
interface TranscriptionService {
  transcribe(audioPath: string): Promise<TranscriptionResult>
}
```

To add a new provider (e.g., OpenAI Whisper, AssemblyAI), implement this interface and update the factory in `lib/transcription/groq.ts`.

---

## How Subtitle Burn-in Works

1. User clicks Export → "Video with burned-in subtitles"
2. Current subtitle state is sent to `/api/export`
3. Server generates a temporary `.srt` file from the subtitles
4. FFmpeg is called with the `subtitles` filter and ASS style overrides
5. Output MP4 is written to the temp `output/` directory
6. File is streamed back via `/api/download/[id]`
7. Temp SRT file is cleaned up after rendering

### FFmpeg command (equivalent):
```bash
ffmpeg -i input.mp4 \
  -vf "subtitles='subs.srt':force_style='FontName=Inter,FontSize=22,...'" \
  -c:a copy \
  output.mp4
```

---

## Temporary Files

Files are stored in `{os.tmpdir()}/captionflow/`:

```
captionflow/
├── uploads/    # Uploaded video files
├── audio/      # Extracted audio (WAV) — deleted after transcription
├── subtitles/  # Temporary SRT files for burn-in — deleted after export
└── output/     # Exported videos with burned-in subtitles
```

---

## Project Structure

```
captionflow/
├── app/
│   ├── page.tsx                    # Upload / Landing page
│   ├── editor/page.tsx             # Main editor
│   ├── layout.tsx
│   ├── globals.css
│   └── api/
│       ├── upload/route.ts         # Video upload + validation
│       ├── transcribe/route.ts     # Audio extraction + transcription
│       ├── export/route.ts         # Subtitle burn-in
│       └── download/[id]/route.ts  # Stream exported file
├── components/
│   ├── upload/UploadZone.tsx
│   ├── video/VideoPlayer.tsx
│   ├── editor/
│   │   ├── SubtitleEditor.tsx
│   │   ├── SubtitleRow.tsx
│   │   ├── Timeline.tsx
│   │   ├── TimelineControls.tsx
│   │   └── StylePanel.tsx
│   └── export/ExportDialog.tsx
├── hooks/useKeyboardShortcuts.ts
├── lib/
│   ├── ffmpeg/
│   │   ├── extractAudio.ts
│   │   ├── getMetadata.ts
│   │   └── burnSubtitles.ts
│   ├── transcription/
│   │   ├── service.ts              # Interface
│   │   └── groq.ts                 # Groq Whisper implementation
│   ├── subtitles/
│   │   ├── srt.ts
│   │   ├── vtt.ts
│   │   └── utils.ts
│   └── utils/tempFiles.ts
├── store/editorStore.ts
├── types/
│   ├── subtitle.ts
│   └── video.ts
├── .env.example
└── README.md
```

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `Space` | Play / Pause |
| `←` | Seek back 1 second |
| `→` | Seek forward 1 second |
| `Shift + ←` | Seek back 5 seconds |
| `Shift + →` | Seek forward 5 seconds |
| `S` | Split selected subtitle at playhead |
| `Delete` | Delete selected subtitle |
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |

---

## Security

- MIME type and file extension validation on upload
- Upload size limit (configurable via `MAX_FILE_SIZE_MB`)
- Unique UUID-based filenames — original filenames never used in paths
- Path traversal prevention on all file operations
- FFmpeg called via `spawn()` with argument arrays — no shell string injection
- Temporary files cleaned up after use
- API keys never exposed to the browser

---

## Known Limitations

- Only one video session at a time (no persistence between refreshes — by design for the MVP)
- Subtitle burn-in for very long videos may take a while (FFmpeg re-encodes)
- Temporary files in the output directory are not automatically cleaned up after download (manual cleanup needed for production)
- The Groq free tier has rate limits — large videos may fail if audio extraction produces a large file

---

## Future Improvements

- [ ] Session persistence (save/load projects)
- [ ] Multi-track support
- [ ] Speaker diarization
- [ ] Translation support
- [ ] Waveform visualization in timeline
- [ ] WebSocket-based real-time processing status
- [ ] Cleanup scheduler for temp files
- [ ] Authentication and user accounts
