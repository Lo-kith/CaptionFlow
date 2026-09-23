export interface SubtitleSegment {
  id: string
  start: number // seconds
  end: number   // seconds
  text: string
}

export interface SubtitleStyle {
  fontFamily: string
  fontSize: number
  fontWeight: 'normal' | 'bold' | '600'
  color: string
  backgroundColor: string
  backgroundOpacity: number
  position: 'top' | 'center' | 'bottom'
  textAlign: 'left' | 'center' | 'right'
  outline: boolean
  outlineColor: string
  maxWidth: number // percentage of video width
}

export const DEFAULT_SUBTITLE_STYLE: SubtitleStyle = {
  fontFamily: 'Inter',
  fontSize: 22,
  fontWeight: 'bold',
  color: '#ffffff',
  backgroundColor: '#000000',
  backgroundOpacity: 70,
  position: 'bottom',
  textAlign: 'center',
  outline: true,
  outlineColor: '#000000',
  maxWidth: 80,
}
