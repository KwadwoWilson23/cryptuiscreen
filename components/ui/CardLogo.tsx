'use client';

export interface CardBrandConfig {
  name: string;
  bg: string;
  fg: string;
  accent: string;
}

export const CARD_BRANDS: Record<string, CardBrandConfig> = {
  AMAZON: { name: 'amazon', bg: '#131A22', fg: '#FFFFFF', accent: '#FF9900' },
  ITUNES: { name: 'iTunes', bg: '#FB466E', fg: '#FFFFFF', accent: '#FFFFFF' },
  'GOOGLE PLAY': { name: 'Google Play', bg: '#FFFFFF', fg: '#202124', accent: '#34A853' },
  STEAM: { name: 'Steam', bg: '#1B2838', fg: '#66C0F4', accent: '#FFFFFF' },
  NETFLIX: { name: 'Netflix', bg: '#000000', fg: '#E50914', accent: '#E50914' },
  VISA: { name: 'Visa', bg: '#1A1F71', fg: '#FFFFFF', accent: '#F7B600' },
};

export default function CardLogo({ brand }: { brand: string }) {
  const config = CARD_BRANDS[brand];
  if (!config) return null;

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: config.bg }}
    >
      {/* subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, #ffffff 0 1px, transparent 1px 8px)',
        }}
      />

      {brand === 'AMAZON' && (
        <div className="flex flex-col items-center relative">
          <span className="text-white font-syne text-[16px] font-extrabold lowercase tracking-tight leading-none">
            amazon
          </span>
          <svg
            width="46"
            height="9"
            viewBox="0 0 46 9"
            className="mt-0.5"
            fill="none"
          >
            <path
              d="M2 3 Q 23 9 42 3"
              stroke="#FF9900"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M37 1 L42 3 L40 6"
              stroke="#FF9900"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      )}

      {brand === 'ITUNES' && (
        <div className="flex flex-col items-center gap-1 relative">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M9 17a3 3 0 1 1-3-3 3 3 0 0 1 1.5.4V5l11-2v9a3 3 0 1 1-3-3 3 3 0 0 1 1.5.4V6.2L9 7.8z" />
          </svg>
          <span className="text-white font-syne text-[12px] font-extrabold tracking-tight leading-none">
            iTunes
          </span>
        </div>
      )}

      {brand === 'GOOGLE PLAY' && (
        <div className="flex items-center gap-1.5 relative">
          <svg width="22" height="24" viewBox="0 0 22 24">
            <path d="M2 1.6 L2 22.4 L11.5 12 Z" fill="#34A853" />
            <path d="M2 1.6 L17.8 10.5 L11.5 12 Z" fill="#FBBC04" />
            <path d="M2 22.4 L17.8 13.5 L11.5 12 Z" fill="#EA4335" />
            <path d="M17.8 10.5 L20.4 12 L17.8 13.5 L11.5 12 Z" fill="#4285F4" />
          </svg>
          <span className="text-black font-syne text-[10px] font-extrabold leading-[1.05]">
            Google
            <br />
            Play
          </span>
        </div>
      )}

      {brand === 'STEAM' && (
        <div className="flex items-center gap-1.5 relative">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="#66C0F4"
              strokeWidth="1.5"
            />
            <circle cx="15" cy="9" r="3" fill="#66C0F4" />
            <circle cx="15" cy="9" r="1" fill="#1B2838" />
            <circle cx="9" cy="15" r="2.5" fill="#66C0F4" />
            <path
              d="M12.2 9.5 L9.5 13"
              stroke="#66C0F4"
              strokeWidth="0.8"
              fill="none"
            />
          </svg>
          <span className="font-syne text-[12px] font-extrabold tracking-[0.2em]" style={{ color: '#66C0F4' }}>
            STEAM
          </span>
        </div>
      )}

      {brand === 'NETFLIX' && (
        <div className="flex items-center gap-2 relative">
          <svg width="14" height="22" viewBox="0 0 14 22">
            <path
              d="M2 1 L2 21 L5 21 L5 11 L9 21 L12 21 L12 1 L9 1 L9 12 L5 1 Z"
              fill="#E50914"
            />
          </svg>
          <span className="font-syne text-[14px] font-black tracking-tighter" style={{ color: '#E50914' }}>
            NETFLIX
          </span>
        </div>
      )}

      {brand === 'VISA' && (
        <div className="flex flex-col items-center w-full relative">
          <div
            className="w-3/5 h-[3px] mb-1.5"
            style={{ backgroundColor: '#F7B600' }}
          />
          <span className="font-syne italic text-[20px] font-black tracking-wider text-white leading-none">
            VISA
          </span>
        </div>
      )}

      {/* corner code chip */}
      <div className="absolute top-1.5 left-2 w-5 h-3.5 border border-white/20 bg-white/5" />
      <span className="absolute bottom-1.5 right-2 font-mono text-[7px] tracking-[0.18em] text-white/60">
        ★ GIFT
      </span>
    </div>
  );
}
