'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Tag, Send, ArrowDownLeft, Bell } from 'lucide-react';
import QuickAction from '../ui/QuickAction';
import AssetRow, { type AssetData } from '../ui/AssetRow';
import TransactionRow, { type TransactionData } from '../ui/TransactionRow';

const TRENDING: AssetData[] = [
  { ticker: 'BTC', name: 'Bitcoin', price: 67845.23, change: 2.45 },
  { ticker: 'ETH', name: 'Ethereum', price: 3421.78, change: 4.12 },
  { ticker: 'SOL', name: 'Solana', price: 185.34, change: -1.23 },
];

const RECENT: TransactionData[] = [
  { type: 'receive', asset: 'BTC', amount: '+0.0234', timestamp: '2H AGO' },
  { type: 'send', asset: 'ETH', amount: '-1.5000', timestamp: '5H AGO' },
  { type: 'receive', asset: 'USDT', amount: '+250.00', timestamp: '1D AGO' },
];

function useCountUp(end: number, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(end * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return val;
}

export default function HomeScreen() {
  const portfolio = useCountUp(24831.5);

  return (
    <div className="pb-8">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 pt-4 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-accent border border-black flex items-center justify-center">
            <span className="font-syne text-[14px] font-black leading-none">
              C
            </span>
          </div>
          <h1 className="font-mono text-[13px] font-bold tracking-[0.18em]">
            CRYPTOVAULT
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-9 h-9 border border-black flex items-center justify-center bg-white active:bg-accent"
            aria-label="Notifications"
          >
            <Bell size={15} strokeWidth={1.8} />
          </button>
          <div className="w-9 h-9 border border-black bg-black flex items-center justify-center">
            <span className="font-syne text-white text-[14px] font-bold leading-none">
              A
            </span>
          </div>
        </div>
      </header>

      {/* Portfolio card */}
      <section className="mx-5 border border-black relative bg-black text-white overflow-hidden">
        {/* color accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-btc" />
          <div className="flex-1 bg-eth" />
          <div className="flex-1 bg-sol" />
          <div className="flex-1 bg-accent" />
        </div>

        <div className="p-5 pt-6">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] tracking-[0.18em] text-white/60">
              TOTAL PORTFOLIO VALUE
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] bg-accent text-black px-1.5 py-[3px] leading-none">
              +3.42% ↑
            </span>
          </div>
          <div className="font-mono text-[34px] font-bold leading-none">
            $
            {portfolio.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="mt-2 font-mono text-[10px] tracking-widest text-accent">
            +$821.42 TODAY
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1">
            <div className="h-1 bg-accent" />
            <div className="h-1 bg-white/25" />
            <div className="h-1 bg-white/25" />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9px] tracking-widest text-white/50">
            <span>1D</span>
            <span>1W</span>
            <span>1M</span>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-4 gap-2 px-5 mt-5">
        <QuickAction Icon={ShoppingCart} label="BUY" />
        <QuickAction Icon={Tag} label="SELL" />
        <QuickAction Icon={Send} label="SEND" />
        <QuickAction Icon={ArrowDownLeft} label="RECEIVE" />
      </section>

      {/* Trending */}
      <section className="px-5 mt-7">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-accent" />
            <h2 className="font-syne text-[13px] font-bold uppercase tracking-[0.18em]">
              Trending Assets
            </h2>
          </div>
          <span className="font-mono text-[9px] text-black/50 tracking-widest">
            SEE ALL →
          </span>
        </div>
        <div>
          {TRENDING.map((asset) => (
            <AssetRow key={asset.ticker} asset={asset} />
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section className="px-5 mt-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-sky" />
            <h2 className="font-syne text-[13px] font-bold uppercase tracking-[0.18em]">
              Recent Activity
            </h2>
          </div>
        </div>
        <div>
          {RECENT.map((tx, i) => (
            <TransactionRow key={i} tx={tx} />
          ))}
        </div>
      </section>
    </div>
  );
}
