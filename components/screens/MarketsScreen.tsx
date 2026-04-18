'use client';

import { useState } from 'react';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import AssetRow, { type AssetData } from '../ui/AssetRow';

const ASSETS: AssetData[] = [
  { ticker: 'BTC', name: 'Bitcoin', price: 67845.23, change: 2.45 },
  { ticker: 'ETH', name: 'Ethereum', price: 3421.78, change: 4.12 },
  { ticker: 'SOL', name: 'Solana', price: 185.34, change: -1.23 },
  { ticker: 'AVAX', name: 'Avalanche', price: 42.18, change: 5.67 },
  { ticker: 'BNB', name: 'BNB', price: 612.45, change: 0.89 },
  { ticker: 'XRP', name: 'XRP', price: 0.5673, change: -2.34 },
  { ticker: 'ADA', name: 'Cardano', price: 0.4523, change: 3.21 },
  { ticker: 'DOT', name: 'Polkadot', price: 7.823, change: -0.45 },
];

const FILTERS = ['ALL', 'CRYPTO', 'GAINERS', 'LOSERS'] as const;
type Filter = (typeof FILTERS)[number];

export default function MarketsScreen() {
  const [filter, setFilter] = useState<Filter>('ALL');
  const [query, setQuery] = useState('');

  const filtered = ASSETS.filter((a) => {
    if (
      query &&
      !a.name.toLowerCase().includes(query.toLowerCase()) &&
      !a.ticker.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }
    if (filter === 'GAINERS') return a.change > 0;
    if (filter === 'LOSERS') return a.change < 0;
    return true;
  });

  const gainers = ASSETS.filter((a) => a.change > 0).length;
  const losers = ASSETS.filter((a) => a.change < 0).length;

  return (
    <div className="pb-8">
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-end justify-between mb-4">
          <h1 className="font-syne text-[26px] font-extrabold uppercase tracking-tight leading-none">
            Markets
          </h1>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 font-mono text-[10px] tracking-wider bg-accent text-black px-2 py-1 leading-none">
              <TrendingUp size={10} strokeWidth={3} />
              {gainers}
            </span>
            <span className="flex items-center gap-1 font-mono text-[10px] tracking-wider bg-danger text-white px-2 py-1 leading-none">
              <TrendingDown size={10} strokeWidth={3} />
              {losers}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50"
            strokeWidth={2}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH ASSETS..."
            className="w-full border border-black px-9 py-2.5 font-mono text-[11px] tracking-[0.15em] bg-white outline-none focus:bg-accent/10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => {
            const isActive = filter === f;
            const activeColor =
              f === 'GAINERS'
                ? 'bg-accent text-black'
                : f === 'LOSERS'
                ? 'bg-danger text-white'
                : 'bg-black text-white';
            return (
              <motion.button
                key={f}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f)}
                className={`shrink-0 px-3.5 py-1.5 border border-black font-mono text-[10px] tracking-[0.15em] ${
                  isActive ? activeColor : 'bg-white text-black'
                }`}
              >
                {f}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="px-5">
        {filtered.length === 0 ? (
          <div className="py-12 text-center font-mono text-[11px] tracking-widest text-black/40">
            NO ASSETS FOUND
          </div>
        ) : (
          filtered.map((asset) => (
            <AssetRow key={asset.ticker} asset={asset} showSparkline />
          ))
        )}
      </div>
    </div>
  );
}
