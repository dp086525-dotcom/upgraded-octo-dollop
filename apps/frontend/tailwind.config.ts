import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { surface: '#0f172a', panel: '#111827', accent: '#38bdf8' },
      boxShadow: { glow: '0 0 60px rgba(56, 189, 248, 0.18)' }
    }
  },
  plugins: []
} satisfies Config;
