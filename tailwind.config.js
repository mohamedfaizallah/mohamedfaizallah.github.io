/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Terminal / code-editor inspired palette
        bg: {
          DEFAULT: '#0a0e14',
          soft: '#0f141c',
          card: '#11161f',
          elevated: '#161c27',
        },
        border: {
          DEFAULT: '#1f2733',
          soft: '#2a3340',
        },
        accent: {
          DEFAULT: '#39d0d8', // cyan glow
          soft: '#5be8c4',
          violet: '#8b7cff',
        },
        terminal: {
          green: '#5be8a3',
          yellow: '#ffcb6b',
          red: '#ff6b81',
          blue: '#82aaff',
          purple: '#c792ea',
          comment: '#5c6773',
        },
        muted: '#8b97a7',
        text: '#d7dee8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(57,208,216,0.18), 0 0 24px -4px rgba(57,208,216,0.25)',
        'glow-violet': '0 0 0 1px rgba(139,124,255,0.18), 0 0 24px -4px rgba(139,124,255,0.25)',
        card: '0 8px 30px -12px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(600px circle at 50% 0%, rgba(57,208,216,0.08), transparent 60%)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
