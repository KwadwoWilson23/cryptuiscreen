'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import CryptoLogo from '../ui/CryptoLogo';

const PRESETS = [50, 100, 500, 1000];

export default function TradeScreen() {
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [amount, setAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const numAmount = parseFloat(amount) || 0;
  const networkFee = 2.4;
  const platformFee = numAmount * 0.001;
  const total = numAmount + networkFee + platformFee;

  const isBuy = side === 'BUY';
  const sideColor = isBuy ? '#00FF85' : '#FF3D55';
  const sideTextColor = isBuy ? '#000000' : '#FFFFFF';
  const checkColor = isBuy ? '#00FF85' : '#FF3D55';

  const confirm = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2400);
  };

  return (
    <div className="pb-8 relative h-full">
      <div className="px-5 pt-4">
        <h1 className="font-syne text-[26px] font-extrabold uppercase tracking-tight mb-4 leading-none">
          Trade
        </h1>

        {/* BUY / SELL toggle */}
        <div className="grid grid-cols-2 border border-black mb-5">
          <button
            type="button"
            onClick={() => setSide('BUY')}
            className="py-3 font-syne text-[13px] font-bold tracking-[0.2em] transition-colors"
            style={{
              backgroundColor: isBuy ? '#00FF85' : '#FFFFFF',
              color: '#000000',
            }}
          >
            BUY
          </button>
          <button
            type="button"
            onClick={() => setSide('SELL')}
            className="py-3 font-syne text-[13px] font-bold tracking-[0.2em] transition-colors"
            style={{
              backgroundColor: !isBuy ? '#FF3D55' : '#FFFFFF',
              color: !isBuy ? '#FFFFFF' : '#000000',
            }}
          >
            SELL
          </button>
        </div>

        {/* Asset selector */}
        <motion.div
          whileTap={{ scale: 0.99 }}
          className="border border-black p-4 mb-4 flex items-center justify-between cursor-pointer active:bg-black/5 bg-bone"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center -space-x-2">
              <CryptoLogo ticker="BTC" size={32} />
              <CryptoLogo ticker="USDT" size={32} />
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-black/50 mb-0.5">
                PAIR
              </div>
              <div className="font-mono text-[15px] font-bold tracking-wider">
                BTC / USDT
              </div>
            </div>
          </div>
          <ArrowLeftRight size={18} strokeWidth={1.8} />
        </motion.div>

        {/* Amount input */}
        <div
          className="border border-black p-4 mb-3"
          style={{ backgroundColor: isBuy ? '#F0FFF8' : '#FFF1F3' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-[10px] tracking-[0.18em] text-black/50">
              AMOUNT (USDT)
            </div>
            <div
              className="font-mono text-[9px] tracking-[0.15em] px-1.5 py-[2px] leading-none"
              style={{ backgroundColor: sideColor, color: sideTextColor }}
            >
              {side}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value.replace(/[^\d.]/g, '').slice(0, 12))
              }
              placeholder="0.00"
              className="font-mono text-[34px] font-bold outline-none w-full bg-transparent placeholder:text-black/25 leading-none"
            />
            <span className="font-mono text-[12px] text-black/50 tracking-widest">
              USDT
            </span>
          </div>
        </div>

        {/* Preset chips */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {PRESETS.map((p) => {
            const active = String(p) === amount;
            return (
              <motion.button
                key={p}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => setAmount(String(p))}
                className="border border-black py-2 font-mono text-[11px] tracking-wider transition-colors"
                style={{
                  backgroundColor: active ? sideColor : '#FFFFFF',
                  color: active ? sideTextColor : '#000000',
                }}
              >
                ${p}
              </motion.button>
            );
          })}
        </div>

        {/* Order type */}
        <div className="grid grid-cols-2 border border-black mb-5">
          {(['MARKET', 'LIMIT'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setOrderType(t)}
              className={`py-2.5 font-mono text-[10px] tracking-[0.2em] transition-colors ${
                orderType === t ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {t} ORDER
            </button>
          ))}
        </div>

        {/* Fees */}
        <div className="border border-black p-4 mb-5 bg-bone">
          <div className="flex justify-between mb-2">
            <span className="font-mono text-[10px] tracking-[0.15em] text-black/60">
              NETWORK FEE
            </span>
            <span className="font-mono text-[10px]">$2.40</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-mono text-[10px] tracking-[0.15em] text-black/60">
              PLATFORM FEE (0.1%)
            </span>
            <span className="font-mono text-[10px]">
              ${platformFee.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-black pt-2 mt-2 flex justify-between items-baseline">
            <span className="font-mono text-[11px] tracking-[0.15em] font-bold">
              TOTAL
            </span>
            <span className="font-mono text-[14px] font-bold">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={confirm}
          className="w-full py-4 font-syne text-[14px] font-bold tracking-[0.25em] border border-black"
          style={{ backgroundColor: sideColor, color: sideTextColor }}
        >
          CONFIRM {side}
        </motion.button>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white flex flex-col items-center justify-center z-50"
          >
            <motion.svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <motion.circle
                cx="70"
                cy="70"
                r="62"
                fill="none"
                stroke={checkColor}
                strokeWidth="3"
                pathLength={1}
                initial={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
              <motion.path
                d="M 42 72 L 62 92 L 100 50"
                fill="none"
                stroke={checkColor}
                strokeWidth="6"
                strokeLinecap="square"
                strokeLinejoin="miter"
                pathLength={1}
                initial={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
              />
            </motion.svg>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="mt-5 text-center"
            >
              <div className="font-syne text-[20px] font-extrabold uppercase tracking-[0.2em]">
                Confirmed
              </div>
              <div className="font-mono text-[11px] tracking-[0.15em] mt-1 text-black/60">
                {side} ORDER PLACED
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
