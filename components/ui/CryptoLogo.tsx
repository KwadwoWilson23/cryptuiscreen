'use client';

interface Props {
  ticker: string;
  size?: number;
  className?: string;
}

export const CRYPTO_BG: Record<string, string> = {
  BTC: '#F7931A',
  ETH: '#627EEA',
  SOL: '#000000',
  AVAX: '#E84142',
  BNB: '#F3BA2F',
  XRP: '#23292F',
  ADA: '#0033AD',
  DOT: '#E6007A',
  USDT: '#26A17B',
};

export default function CryptoLogo({
  ticker,
  size = 36,
  className = '',
}: Props) {
  const common = {
    width: size,
    height: size,
    className,
    viewBox: '0 0 64 64',
  } as const;

  switch (ticker) {
    case 'BTC':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="#F7931A" />
          <path
            d="M40.6 26.8c.5-3.4-2.1-5.2-5.6-6.4l1.1-4.6-2.8-.7-1.1 4.5c-.7-.2-1.5-.3-2.3-.5l1.1-4.5-2.8-.7-1.1 4.6c-.6-.1-1.2-.3-1.8-.4v0l-3.9-1-.7 3s2.1.5 2 .5c1.1.3 1.3 1 1.3 1.6L21.7 30c.1 0 .2.1.3.1l-.3-.1L20 36.7c-.1.3-.5.8-1.3.6 0 .1-2-.5-2-.5l-1.4 3.2 3.7 1c.7.2 1.4.4 2 .5l-1.1 4.7 2.8.7 1.1-4.6c.8.2 1.5.4 2.3.6l-1.1 4.5 2.8.7 1.1-4.7c4.8.9 8.4.6 9.9-3.8 1.2-3.5-.1-5.6-2.7-6.9 1.9-.4 3.3-1.7 3.7-4.3zm-6.6 9.1c-.9 3.5-6.8 1.6-8.7 1.1l1.5-6.1c1.9.5 8 1.4 7.2 5zm.9-9.2c-.8 3.2-5.7 1.6-7.3 1.2l1.4-5.6c1.6.4 6.7 1.2 5.9 4.4z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'ETH':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="#627EEA" />
          <g fill="#FFFFFF">
            <path d="M32 8 L32 26 L46 32 Z" fillOpacity="0.6" />
            <path d="M32 8 L18 32 L32 26 Z" />
            <path d="M32 36 L32 56 L46 38 Z" fillOpacity="0.6" />
            <path d="M32 36 L18 38 L32 56 Z" />
            <path d="M32 26 L32 35 L46 32 Z" fillOpacity="0.4" />
            <path d="M32 26 L32 35 L18 32 Z" fillOpacity="0.6" />
          </g>
        </svg>
      );
    case 'SOL':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id={`solg-${ticker}-${size}`}
              x1="0"
              y1="0"
              x2="64"
              y2="64"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#9945FF" />
              <stop offset="1" stopColor="#14F195" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="32" fill="#0F0F12" />
          <path
            d="M18 21 L42 21 L48 15 L24 15 Z"
            fill={`url(#solg-${ticker}-${size})`}
          />
          <path
            d="M18 35 L42 35 L48 29 L24 29 Z"
            fill={`url(#solg-${ticker}-${size})`}
          />
          <path
            d="M18 49 L42 49 L48 43 L24 43 Z"
            fill={`url(#solg-${ticker}-${size})`}
          />
        </svg>
      );
    case 'AVAX':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="#E84142" />
          <path
            d="M32 14 L48 44 L38 44 L34 36 L26 36 L22 44 L12 44 Z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'BNB':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="#F3BA2F" />
          <g fill="#FFFFFF">
            <rect
              x="29"
              y="11"
              width="6"
              height="6"
              transform="rotate(45 32 14)"
            />
            <rect
              x="13"
              y="29"
              width="6"
              height="6"
              transform="rotate(45 16 32)"
            />
            <rect
              x="45"
              y="29"
              width="6"
              height="6"
              transform="rotate(45 48 32)"
            />
            <rect
              x="29"
              y="47"
              width="6"
              height="6"
              transform="rotate(45 32 50)"
            />
            <rect x="28" y="28" width="8" height="8" />
          </g>
        </svg>
      );
    case 'XRP':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="#0F0F12" />
          <path
            d="M14 18 L28 32 L14 46 M50 18 L36 32 L50 46"
            stroke="#FFFFFF"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'ADA':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="#0033AD" />
          <g fill="#FFFFFF">
            <circle cx="32" cy="13" r="2.5" />
            <circle cx="32" cy="51" r="2.5" />
            <circle cx="13" cy="32" r="2.5" />
            <circle cx="51" cy="32" r="2.5" />
            <circle cx="20" cy="19" r="2" />
            <circle cx="44" cy="19" r="2" />
            <circle cx="20" cy="45" r="2" />
            <circle cx="44" cy="45" r="2" />
            <circle cx="32" cy="32" r="3.6" />
          </g>
        </svg>
      );
    case 'DOT':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="#FFFFFF" />
          <g fill="#E6007A">
            <ellipse cx="32" cy="13" rx="6" ry="4" />
            <ellipse cx="32" cy="51" rx="6" ry="4" />
            <ellipse
              cx="16"
              cy="22"
              rx="6"
              ry="4"
              transform="rotate(60 16 22)"
            />
            <ellipse
              cx="48"
              cy="42"
              rx="6"
              ry="4"
              transform="rotate(60 48 42)"
            />
            <ellipse
              cx="16"
              cy="42"
              rx="6"
              ry="4"
              transform="rotate(-60 16 42)"
            />
            <ellipse
              cx="48"
              cy="22"
              rx="6"
              ry="4"
              transform="rotate(-60 48 22)"
            />
          </g>
        </svg>
      );
    case 'USDT':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="#26A17B" />
          <path
            d="M16 18 H48 V25 H37 V30 C42 30.4 46 31.4 46 32.5 C46 33.6 42 34.6 37 35 V47 H27 V35 C22 34.6 18 33.6 18 32.5 C18 31.4 22 30.4 27 30 V25 H16 V18 Z"
            fill="#FFFFFF"
          />
        </svg>
      );
    default:
      return (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: CRYPTO_BG[ticker] || '#000000',
            color: '#FFFFFF',
          }}
          className={`flex items-center justify-center rounded-full font-syne text-[13px] font-bold ${className}`}
        >
          {ticker[0]}
        </div>
      );
  }
}
