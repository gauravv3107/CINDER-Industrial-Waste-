/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        card: {
          DEFAULT: 'var(--bg-card)',
          raised: 'var(--bg-card-raised)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
        tprimary: 'var(--text-primary)',
        tsecondary: 'var(--text-secondary)',
        tmuted: 'var(--text-muted)',
        thermal: {
          DEFAULT: 'var(--accent-thermal)',
          hover: 'var(--accent-thermal-hover)',
          tint: 'var(--accent-thermal-tint)',
        },
        sustainability: {
          DEFAULT: 'var(--accent-sustainability)',
          tint: 'var(--accent-sustainability-tint)',
        },
      },
      borderRadius: {
        'panel': '20px',
        'card': '16px',
        'element': '11px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-dark': '0 4px 24px -2px rgba(0, 0, 0, 0.35), 0 2px 8px -1px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
