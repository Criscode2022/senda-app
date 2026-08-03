module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        bg: '#F6F1EA', surface: '#FFFFFF', ink: '#1A1F2E', 'ink-muted': '#5C6478',
        primary: { DEFAULT: '#2F3A6B', soft: '#E8E4F0', strong: '#232B52' },
        accent: '#C26B4A', border: '#E4DCD2',
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
