/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          light: '#9AD7EF',
          DEFAULT: '#7CC9EA',
          dark: '#5FB4DC',
        },
        wall: {
          DEFAULT: '#E6A9BB',
          dark: '#D992A8',
        },
        cream: {
          DEFAULT: '#FBF2DC',
          dim: '#F3E6C8',
        },
        coral: {
          light: '#F58BA0',
          DEFAULT: '#EE6A86',
          dark: '#D6516D',
        },
      },
      fontFamily: {
        script: ['"Caveat"', 'cursive'],
        marker: ['"Permanent Marker"', 'cursive'],
      },
    },
  },
  plugins: [],
}
