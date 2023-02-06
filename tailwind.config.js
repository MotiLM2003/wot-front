module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1979BE',

        prime: {
          50: '#e8f4fc',
          100: '#bbdef6',
          150: '#8ec7f0',
          'default': '#349be4',
          250: '#1b81cb',
          300: '#15649e',
          350: '#0f4871',
        },

        secondary: '#1D1E1D',
        tertiary: '#FDB035',
        'offwhite': '#F8F8F8',
        'paragraph': '#5A5D6B',
        'gray': '#8F93A3',
        'red': '#ED604F',
        'red-h': '#e93f2a',
        'light-blue': '#dee0e2',
        'default-background': '#fafafa',
        'success': '#29DC26',
        shades: {
          50: '#F8F8F8',
          100: '#EFEFEF',
          200: '#EAEAEA',
          300: '#E5E5E5',
          400: '#1D1E1D',
          500: '#E0DEDE',
          600: '#454545',
        },
      },
    },
  },
  plugins: [],
};
