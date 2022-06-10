module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './sections/**/*.liquid',
    './layout/**/*.liquid',
    './snippets/**/*.{liquid, *}',
  ],
  safelist: [
    'justify-start',
    'justify-end'
  ],
  theme: {
    fontFamily: {
      base: ['basis', 'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif'],
      headline: ['founders', 'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif'],
      display: ['marche', 'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: 'var(--theme-color-primary)',
        brand: 'var(--theme-color-brand)',
        accent: 'var(--theme-color-accent-primary)',
        secondary: 'var(--theme-color-accent-secondary)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
