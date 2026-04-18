'use client';

import { useMemo, useState } from 'react';
import { Copy, ArrowDownToLine, ArrowUpFromLine, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CryptoLogo from '../ui/CryptoLogo';

interface Holding {
  ticker: string;
  name: string;
  amount: string;
  usd: number;
}

interface HistoryRow {
  type: 'in' | 'out';
  asset: string;
  amount: string;
  time: string;
  status: 'completed' | 'pending';
}

const ADDRESS = '0x7A3F2c8B9Eaa4c1d8f29B03e5cE8dF1a92E7B6D4';

const HOLDINGS: Holding[] = [
  { ticker: 'BTC', name: 'Bitcoin', amount: '0.45821', usd: 31082.45 },
  { ticker: 'ETH', name: 'Ethereum', amount: '4.2310', usd: 14478.18 },
  { ticker: 'SOL', name: 'Solana', amount: '23.5400', usd: 4364.31 },
];

const HISTORY: HistoryRow[] = [
  { type: 'in', asset: 'BTC', amount: '+0.0234', time: '2H AGO', status: 'completed' },
  { type: 'out', asset: 'ETH', amount: '-1.5000', time: '5H AGO', status: 'completed' },
  { type: 'in', asset: 'USDT', amount: '+250.00', time: '1D AGO', status: 'pending' },
  { type: 'out', asset: 'SOL', amount: '-2.1000', time: '2D AGO', status: 'completed' },
  { type: 'in', asset: 'BTC', amount: '+0.0150', time: '3D AGO', status: 'completed' },
];

const totalUsd = HOLDINGS.reduce((s, h) => s + h.usd, 0);

function QRPattern() {
  const cells = useMemo(() => {
    const out: { x: number; y: number; on: boolean }[] = [];
    for (let r = 0; r < 25; r++) {
      for (let c = 0; c < 25; c++) {
        const inFinder =
          (r < 7 && c < 7) || (r < 7 && c > 17) || (r > 17 && c < 7);
        if (inFinder) continue;
        const v = (Math.sin(r * 12.9898 + c * 78.233) * 43758.5453) % 1;
        out.push({ x: c, y: r, on: Math.abs(v) > 0.55 });
      }
    }
    return out;
  }, []);

  return (
    <svg width="120" height="120" viewBox="0 0 25 25" shapeRendering="crispEdges">
      <rect width="25" height="25" fill="#ffffff" />
      {cells.map(
        (cell, i) =>
          cell.on && (
            <rect
              key={i}
              x={cell.x}
              y={cell.y}
              width="1"
              height="1"
              fill="#000000"
            />
          )
      )}
      {[
        [0, 0],
        [0, 18],
        [18, 0],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="7" height="7" fill="#000" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="#000" />
        </g>
      ))}
    </svg>
  );
}

export default function WalletScreen() {
  const [copied, setCopied] = useState(false);
  const truncated = `${ADDRESS.slice(0, 8)}...${ADDRESS.slice(-6)}`;

  const copy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(ADDRESS);
      }
    } catch {
      // ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-8">
      <div className="px-5 pt-4">
        <div className="flex items-end justify-between mb-4">
          <h1 className="font-syne text-[26px] font-extrabold uppercase tracking-tight leading-none">
            Wallet
          </h1>
          <span className="font-mono text-[10px] tracking-wider bg-black text-white px-2 py-1 leading-none">
            ETHEREUM
          </span>
        </div>

        {/* Balance summary */}
        <div className="border border-black bg-black text-white p-4 mb-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-btc" />
            <div className="flex-1 bg-eth" />
            <div className="flex-1 bg-sol" />
          </div>
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/60 mb-1 mt-1">
            TOTAL BALANCE
          </div>
          <div className="font-mono text-[26px] font-bold leading-none">
            $
            {totalUsd.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>

        {/* Address */}
        <div className="border border-black p-4 mb-3 flex items-center justify-between gap-3 bg-cream">
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[10px] tracking-[0.18em] text-black/50 mb-1">
              WALLET ADDRESS
            </div>
            <div className="font-mono text-[13px] font-bold truncate">
              {truncated}
            </div>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={copy}
            className={`shrink-0 border border-black px-2.5 py-1.5 flex items-center gap-1.5 ${
              copied
                ? 'bg-accent text-black'
                : 'bg-white text-black active:bg-black active:text-white'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.12 }}
                  className="flex items-center gap-1.5"
                >
                  <Check size={12} strokeWidth={2.5} />
                  <span className="font-mono text-[9px] tracking-[0.18em] font-bold">
                    COPIED!
                  </span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.12 }}
                  className="flex items-center gap-1.5"
                >
                  <Copy size={12} strokeWidth={2} />
                  <span className="font-mono text-[9px] tracking-[0.18em]">
                    COPY
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* QR */}
        <div className="border border-black p-4 mb-4 flex flex-col items-center bg-bone">
          <div className="border border-black p-2 bg-white">
            <QRPattern />
          </div>
          <div className="font-mono text-[9px] tracking-[0.2em] mt-3 text-black/60">
            SCAN TO SEND
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            className="border border-black py-3 font-syne text-[12px] font-bold tracking-[0.2em] flex items-center justify-center gap-2 bg-accent text-black"
          >
            <ArrowDownToLine size={14} strokeWidth={2.4} />
            DEPOSIT
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            className="border border-black py-3 font-syne text-[12px] font-bold tracking-[0.2em] flex items-center justify-center gap-2 bg-black text-white"
          >
            <ArrowUpFromLine size={14} strokeWidth={2.4} />
            WITHDRAW
          </motion.button>
        </div>

        {/* Holdings */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-4 bg-accent" />
          <h2 className="font-syne text-[12px] font-bold uppercase tracking-[0.18em]">
            Holdings
          </h2>
        </div>
        <div className="border border-black mb-5">
          {HOLDINGS.map((b, i) => (
            <div
              key={b.ticker}
              className={`flex items-center justify-between p-3 ${
                i < HOLDINGS.length - 1 ? 'border-b border-black/20' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <CryptoLogo ticker={b.ticker} size={32} />
                <div className="min-w-0">
                  <div className="font-syne text-[12px] font-semibold leading-tight">
                    {b.name}
                  </div>
                  <div className="font-mono text-[10px] text-black/50 leading-tight">
                    {b.amount} {b.ticker}
                  </div>
                </div>
              </div>
              <span className="font-mono text-[12px] font-bold shrink-0">
                $
                {b.usd.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
        </div>

        {/* History */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-4 bg-sky" />
          <h2 className="font-syne text-[12px] font-bold uppercase tracking-[0.18em]">
            Transaction History
          </h2>
        </div>
        <div>
          {HISTORY.map((tx, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2.5 border-b border-black/15"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <CryptoLogo ticker={tx.asset} size={28} />
                  <div
                    className="absolute -bottom-1 -right-1 w-4 h-4 border border-black flex items-center justify-center bg-white font-mono text-[10px] leading-none font-bold"
                    style={{ color: tx.type === 'in' ? '#00FF85' : '#FF3D55' }}
                  >
                    {tx.type === 'in' ? '↓' : '↑'}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="font-syne text-[11px] font-semibold uppercase tracking-[0.1em] truncate">
                    {tx.type === 'in' ? 'RECEIVE' : 'SEND'} {tx.asset}
                  </div>
                  <div className="font-mono text-[9px] text-black/50 tracking-wider">
                    {tx.time}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className="font-mono text-[12px] font-bold leading-none"
                  style={{ color: tx.type === 'in' ? '#000000' : '#FF3D55' }}
                >
                  {tx.amount}
                </span>
                <span
                  className="font-mono text-[8px] tracking-[0.15em] px-1.5 py-[2px] leading-none"
                  style={{
                    backgroundColor:
                      tx.status === 'pending' ? '#F5C542' : '#00FF85',
                    color: '#000000',
                  }}
                >
                  {tx.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
