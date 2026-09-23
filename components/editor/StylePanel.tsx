'use client'

import { useEditorStore } from '@/store/editorStore'
import { SubtitleStyle } from '@/types/subtitle'

const FONTS = ['Inter', 'Arial', 'Georgia', 'Courier New', 'Trebuchet MS', 'Times New Roman']
const FONT_SIZES = [14, 16, 18, 20, 22, 24, 28, 32, 36]

export default function StylePanel() {
  const { style, updateStyle } = useEditorStore()

  const update = <K extends keyof SubtitleStyle>(key: K, value: SubtitleStyle[K]) => {
    updateStyle({ [key]: value })
  }

  return (
    <div className="p-3 space-y-4 overflow-y-auto h-full">
      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
        Subtitle Style
      </h3>

      {/* Font */}
      <section className="space-y-2">
        <label className="text-xs text-text-muted">Font</label>
        <select
          className="input text-sm"
          value={style.fontFamily}
          onChange={(e) => update('fontFamily', e.target.value)}
          aria-label="Font family"
        >
          {FONTS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </section>

      {/* Size & Weight */}
      <div className="grid grid-cols-2 gap-2">
        <section className="space-y-1">
          <label className="text-xs text-text-muted">Size</label>
          <select
            className="input text-sm"
            value={style.fontSize}
            onChange={(e) => update('fontSize', parseInt(e.target.value))}
            aria-label="Font size"
          >
            {FONT_SIZES.map((s) => (
              <option key={s} value={s}>{s}px</option>
            ))}
          </select>
        </section>
        <section className="space-y-1">
          <label className="text-xs text-text-muted">Weight</label>
          <select
            className="input text-sm"
            value={style.fontWeight}
            onChange={(e) => update('fontWeight', e.target.value as SubtitleStyle['fontWeight'])}
            aria-label="Font weight"
          >
            <option value="normal">Normal</option>
            <option value="600">Semi-bold</option>
            <option value="bold">Bold</option>
          </select>
        </section>
      </div>

      {/* Text color */}
      <section className="space-y-1">
        <label className="text-xs text-text-muted">Text Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={style.color}
            onChange={(e) => update('color', e.target.value)}
            className="w-8 h-8 rounded cursor-pointer bg-transparent border border-bg-border"
            aria-label="Text color"
          />
          <input
            type="text"
            className="input text-xs font-mono flex-1"
            value={style.color}
            onChange={(e) => {
              if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                update('color', e.target.value)
              }
            }}
            aria-label="Text color hex"
          />
        </div>
      </section>

      {/* Background */}
      <section className="space-y-1">
        <label className="text-xs text-text-muted">Background</label>
        <div className="flex items-center gap-2 mb-1">
          <input
            type="color"
            value={style.backgroundColor}
            onChange={(e) => update('backgroundColor', e.target.value)}
            className="w-8 h-8 rounded cursor-pointer bg-transparent border border-bg-border"
            aria-label="Background color"
          />
          <input
            type="text"
            className="input text-xs font-mono flex-1"
            value={style.backgroundColor}
            onChange={(e) => {
              if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                update('backgroundColor', e.target.value)
              }
            }}
            aria-label="Background color hex"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-text-muted w-16">Opacity</label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={style.backgroundOpacity}
            onChange={(e) => update('backgroundOpacity', parseInt(e.target.value))}
            className="flex-1 accent-accent"
            aria-label="Background opacity"
          />
          <span className="text-xs text-text-muted w-8 text-right">
            {style.backgroundOpacity}%
          </span>
        </div>
      </section>

      {/* Position */}
      <section className="space-y-1">
        <label className="text-xs text-text-muted">Position</label>
        <div className="flex gap-1">
          {(['top', 'center', 'bottom'] as const).map((pos) => (
            <button
              key={pos}
              className={`flex-1 text-xs py-1.5 rounded border transition-colors capitalize ${
                style.position === pos
                  ? 'bg-accent border-accent text-white'
                  : 'border-bg-border text-text-secondary hover:border-accent/50'
              }`}
              onClick={() => update('position', pos)}
              aria-pressed={style.position === pos}
            >
              {pos}
            </button>
          ))}
        </div>
      </section>

      {/* Alignment */}
      <section className="space-y-1">
        <label className="text-xs text-text-muted">Alignment</label>
        <div className="flex gap-1">
          {(['left', 'center', 'right'] as const).map((align) => (
            <button
              key={align}
              className={`flex-1 text-xs py-1.5 rounded border transition-colors capitalize ${
                style.textAlign === align
                  ? 'bg-accent border-accent text-white'
                  : 'border-bg-border text-text-secondary hover:border-accent/50'
              }`}
              onClick={() => update('textAlign', align)}
              aria-pressed={style.textAlign === align}
            >
              {align}
            </button>
          ))}
        </div>
      </section>

      {/* Outline */}
      <section className="flex items-center justify-between">
        <label className="text-xs text-text-muted" htmlFor="outline-toggle">
          Text outline
        </label>
        <button
          id="outline-toggle"
          role="switch"
          aria-checked={style.outline}
          className={`relative w-9 h-5 rounded-full transition-colors ${
            style.outline ? 'bg-accent' : 'bg-bg-elevated'
          }`}
          onClick={() => update('outline', !style.outline)}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
              style.outline ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          />
        </button>
      </section>

      {style.outline && (
        <section className="space-y-1">
          <label className="text-xs text-text-muted">Outline Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={style.outlineColor}
              onChange={(e) => update('outlineColor', e.target.value)}
              className="w-8 h-8 rounded cursor-pointer bg-transparent border border-bg-border"
              aria-label="Outline color"
            />
            <input
              type="text"
              className="input text-xs font-mono flex-1"
              value={style.outlineColor}
              onChange={(e) => {
                if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                  update('outlineColor', e.target.value)
                }
              }}
              aria-label="Outline color hex"
            />
          </div>
        </section>
      )}

      {/* Max width */}
      <section className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs text-text-muted">Max Width</label>
          <span className="text-xs text-text-muted">{style.maxWidth}%</span>
        </div>
        <input
          type="range"
          min={40}
          max={100}
          step={5}
          value={style.maxWidth}
          onChange={(e) => update('maxWidth', parseInt(e.target.value))}
          className="w-full accent-accent"
          aria-label="Max subtitle width"
        />
      </section>
    </div>
  )
}
