module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './sections/**/*.liquid',
    './layout/**/*.liquid',
    './snippets/**/*.{liquid, *}',
  ],
  safelist: [
    'justify-start',
    'justify-end',
    'object-center',
    'object-left',
    'object-right',
  ],
  theme: {
    fontFamily: {
      base: [
        'basis',
        'Franklin Gothic Medium',
        'Arial Narrow',
        'Arial',
        'sans-serif',
      ],
      headline: [
        'founders',
        'Franklin Gothic Medium',
        'Arial Narrow',
        'Arial',
        'sans-serif',
      ],
      display: [
        'marche',
        'Franklin Gothic Medium',
        'Arial Narrow',
        'Arial',
        'sans-serif',
      ],
    },
    variables: {
      DEFAULT: {
        sizes: {
          'mobile-header': '112px',
          header: '140px',
        },
      },
    },
    extend: {
      spacing: {
        fullscreen: 'calc(100vh - var(--sizes-header))',
        'mobile-fullscreen': 'calc(100vh - var(--sizes-mobile-header))',
      },
      colors: {
        primary: 'var(--theme-color-primary)',
        brand: 'var(--theme-color-brand)',
        accent: 'var(--theme-color-accent-primary)',
        secondary: 'var(--theme-color-accent-secondary)',
        tertiary: '#F5EA60',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@mertasan/tailwindcss-variables'),
  ],
}
