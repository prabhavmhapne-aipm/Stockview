/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Scalable Capital brand palette
        surface: {
          0: '#101112',   // Woodsmoke — page background
          1: '#1a1b1d',   // card background
          2: '#222426',   // elevated card / hover
          3: '#2c2e31',   // border-level surface
        },
        accent: {
          DEFAULT: '#28EBCF',   // Bright Turquoise
          light:   '#5df0da',
          dark:    '#1abfaa',
        },
        positive: {
          DEFAULT: '#28EBCF',   // teal = positive (matches accent)
          bg:      'rgba(40,235,207,0.10)',
        },
        negative: {
          DEFAULT: '#f43f5e',   // rose red
          bg:      'rgba(244,63,94,0.10)',
        },
        warning: {
          DEFAULT: '#f59e0b',   // amber
          bg:      'rgba(245,158,11,0.10)',
        },
        text: {
          1: '#ffffff',   // primary — white
          2: '#8a8f96',   // secondary — muted gray
          3: '#4a4f56',   // tertiary — dim
        },
        border: '#2c2e31',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card:  '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(26,37,64,0.8)',
        float: '0 8px 32px rgba(0,0,0,0.6)',
      },
      animation: {
        shimmer:    'shimmer 1.5s infinite',
        'fade-in':  'fadeIn 0.15s ease-out',
        'slide-down':'slideDown 0.18s ease-out',
        pulse:      'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'live-dot': 'liveDot 1.8s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition:  '1000px 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        liveDot: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)'    },
          '50%':      { opacity: '0.4', transform: 'scale(0.75)' },
        },
      },
    },
  },
  plugins: [],
}
