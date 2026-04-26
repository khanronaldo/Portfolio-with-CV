import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rose:    '#f2c4ce',
        blush:   '#f9e8ec',
        gold:    '#c9a96e',
        gold2:   '#e8d5b0',
        cream:   '#fdf6f0',
        deep:    '#1a0a10',
        muted:   '#7a5c68',
        ink:     '#2d1520',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        script:  ['var(--font-greatvibes)', 'cursive'],
        body:    ['var(--font-jost)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
