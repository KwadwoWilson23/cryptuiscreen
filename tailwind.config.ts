import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        desktop: '430px',
      },
      colors: {
        accent: '#00FF85',
        pending: '#F5C542',
        danger: '#FF3D55',
        sky: '#3B82F6',
        bone: '#FAF7F2',
        cream: '#FFF7E6',
        ink: '#0A0A0A',
        btc: '#F7931A',
        eth: '#627EEA',
        sol: '#9945FF',
        avax: '#E84142',
        bnb: '#F3BA2F',
        ada: '#0033AD',
        dot: '#E6007A',
        usdt: '#26A17B',
      },
      fontFamily: {
        mono: ['var(--font-space-mono)', 'ui-monospace', 'monospace'],
        syne: ['var(--font-syne)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
