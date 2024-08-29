import type { Config } from 'tailwindcss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#FAFAFA',
          100: '#EEEEEE',
          200: '#D9D9D9',
          300: '#9FA6B2',
          400: '#787486',
        },
        black: {
          500: '#4B4B4B',
          600: '#333236',
          700: '#171717',
        },
        violet: '#5534DA',
        'violet-white': '#F1EFFD',
        red: '#D6173A',
        green: '#7AC555',
        purple: '#760DDE',
        orange: '#FFA500',
        blue: '#76A5EA',
        pink: '#E876EA',
      },
    },
  },
  plugins: [
    ({ addUtilities }: PluginAPI) => {
      addUtilities({});
    },
  ],
};
export default config;
