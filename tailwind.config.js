/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark editor palette
        bg: {
          primary: '#0d0d0f',
          secondary: '#141416',
          tertiary: '#1a1a1e',
          elevated: '#1f1f24',
          hover: '#252529',
          border: '#2a2a30',
        },
        accent: {
          DEFAULT: '#6366f1',
          hover: '#818cf8',
          muted: '#4338ca',
          subtle: 'rgba(99,102,241,0.12)',
        },
        text: {
          primary: '#f1f1f3',
          secondary: '#9b9ba8',
          muted: '#6b6b7a',
          disabled: '#4a4a58',
        },
        timeline: {
          bg: '#111114',
          track: '#1a1a1e',
          block: '#3b3bf0',
          blockActive: '#6366f1',
          blockHover: '#4f52e0',
          ruler: '#2a2a30',
        },
        status: {
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
      },
    },
  },
  plugins: [],
}
