'use client';

import { motion } from 'framer-motion';
import CryptoLogo from './CryptoLogo';

export interface AssetData {
  ticker: string;
  name: string;
  price: number;
  change: number;
}

function formatPrice(n: number) {
  if (n >= 1) {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}

export default function AssetRow({
  asset,
  showSparkline = false,
}: {
  asset: AssetData;
  showSparkline?: boolean;
}) {
  const positive = asset.change >= 0;

  return (
    <motion.div
      whileTap={{ scale: 0.985 }}
      className="flex items-center justify-between py-3 border-b border-black/15 active:bg-black/5 cursor-pointer"
    >
      <div className="flex items-center gap-3 min-w-0">
        <CryptoLogo ticker={asset.ticker} size={36} />
        <div className="flex flex-col min-w-0">
          <span className="font-syne text-[13px] font-semibold tracking-wide truncate">
            {asset.name}
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em] text-black/50">
            {asset.ticker}
          </span>
        </div>
      </div>

      {showSparkline && (
        <svg
          width="58"
          height="22"
          viewBox="0 0 58 22"
          className="shrink-0 mx-2"
        >
          <polyline
            points={
              positive
                ? '0,17 9,13 18,15 27,7 36,11 45,4 58,8'
                : '0,4 9,8 18,6 27,12 36,9 45,16 58,14'
            }
            fill="none"
            stroke={positive ? '#00FF85' : '#FF3D55'}
            strokeWidth="1.4"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
        </svg>
      )}

      <div className="flex flex-col items-end shrink-0">
        <span className="font-mono text-[13px] font-bold leading-tight">
          ${formatPrice(asset.price)}
        </span>
        <span
          className={`font-mono text-[10px] mt-0.5 px-1 leading-tight ${
            positive ? 'bg-accent text-black' : 'bg-danger text-white'
          }`}
        >
          {positive ? '+' : ''}
          {asset.change.toFixed(2)}%
        </span>
      </div>
    </motion.div>
  );
}
