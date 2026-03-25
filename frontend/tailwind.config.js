/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Scalable Capital dark navy palette
        surface: {
          0: '#07090f',   // page background — deepest navy
          1: '#0c1120',   // card background
          2: '#111827',   // elevated card / hover
          3: '#1a2540',   // border-level surface
        },
        accent: {
          DEFAULT: '#00c4a0',   // Scalable Capital teal
          light:   '#33d4b5',
          dark:    '#009e82',
        },
        positive: {
          DEFAULT: '#00c4a0',   // teal = positive (matches accent)
          bg:      'rgba(0,196,160,0.10)',
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
          1: '#f0f4ff',   // primary — near white with blue tint
          2: '#7890a8',   // secondary — muted blue-gray
          3: '#3a5070',   // tertiary — dim
        },
        border: '#1a2540',
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
