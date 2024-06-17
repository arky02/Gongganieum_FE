import type { Config } from 'tailwindcss';

const createPxEntries = (size: number) => {
  return {
    0: '0',
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i * 4}`]: `${i * 4}px` };
    }),
  };
};

const PX_ENTRIES = createPxEntries(500);

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    spacing: PX_ENTRIES,
    zIndex: {
      base: '1',
      nav: '2',
      popup: '999',
      floating: '1000',
    },
    fontSize: {
      12: '1.2rem',
      14: '1.4rem',
      16: '1.6rem',
      18: '1.8rem',
      20: '2.0rem',
      24: '2.4rem',
      28: '2.8rem',
      32: '3.2rem',
    },
    fontWeight: {
      400: '400',
      500: '500',
      600: '600',
      700: '700',
      800: '800',
    },
    fontFamily: {
      sans: ['Pretendard', 'Arial'],
    },
    borderRadius: {
      none: '0px',
      8: '0.8rem',
      10: '1rem',
      12: '1.2rem',
      16: '1.6rem',
      24: '2.4rem',
      full: '9999px',
    },
    colors: {
      transparent: 'transparent',
      white: 'rgb(var(--white) / <alpha-value>)',
      black: 'rgb(var(--black) / <alpha-value>)',
      gray: {
        100: 'rgb(var(--gray-100) / <alpha-value>)',
        200: 'rgb(var(--gray-200) / <alpha-value>)',
        300: 'rgb(var(--gray-300) / <alpha-value>)',
        400: 'rgb(var(--gray-400) / <alpha-value>)',
      },
      red: 'rgb(var(--red) / <alpha-value>)',
      green: {
        DEFAULT: 'rgb(var(--green) / <alpha-value>)',
        light: 'rgb(var(--green-light) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
export default config;
