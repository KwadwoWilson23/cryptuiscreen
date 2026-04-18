'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import CardLogo, { CARD_BRANDS } from '../ui/CardLogo';

interface Brand {
  name: string;
  short: string;
  denoms: number[];
}

const BRANDS: Brand[] = [
  { name: 'AMAZON', short: 'AMZ', denoms: [10, 25, 50, 100] },
  { name: 'ITUNES', short: 'ITU', denoms: [10, 25, 50, 100] },
  { name: 'GOOGLE PLAY', short: 'GPL', denoms: [10, 25, 50, 100] },
  { name: 'STEAM', short: 'STM', denoms: [10, 25, 50, 100] },
  { name: 'NETFLIX', short: 'NFX', denoms: [10, 25, 50, 100] },
  { name: 'VISA', short: 'VSA', denoms: [10, 25, 50, 100] },
];

export default function CardsScreen() {
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [quote, setQuote] = useState<number | null>(null);

  const getQuote = () => {
    const v = parseFloat(value) || 0;
    if (v > 0) setQuote(v * 0.95);
    else setQuote(null);
  };

  return (
    <div className="pb-8">
      <div className="px-5 pt-4">
        <div className="flex items-end justify-between mb-4">
          <h1 className="font-syne text-[26px] font-extrabold uppercase tracking-tight leading-none">
            Gift Cards
          </h1>
          <span className="flex items-center gap-1 font-mono text-[10px] tracking-wider bg-accent text-black px-2 py-1 leading-none">
            <Sparkles size={10} strokeWidth={2.5} />
            INSTANT
          </span>
        </div>

        {/* BUY section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-sky" />
            <h2 className="font-syne text-[12px] font-bold uppercase tracking-[0.18em]">
              Buy Gift Cards
            </h2>
          </div>
          <span className="font-mono text-[9px] text-black/50 tracking-widest">
            6 BRANDS
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-7">
          {BRANDS.map((brand) => {
            const config = CARD_BRANDS[brand.name];
            return (
              <motion.div
                key={brand.name}
                whileTap={{ scale: 0.98 }}
                className="border border-black bg-white flex flex-col"
              >
                <div className="relative aspect-[1.62/1] border-b border-black overflow-hidden">
                  <CardLogo brand={brand.name} />
                </div>
                <div className="p-2 flex flex-col gap-2 bg-white">
                  <div className="flex flex-wrap gap-1">
                    {brand.denoms.map((d) => (
                      <span
                        key={d}
                        className="font-mono text-[8px] tracking-[0.1em] border border-black/40 px-1 py-[2px] leading-none"
                      >
                        ${d}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="py-1.5 font-syne text-[10px] font-bold tracking-[0.2em] border border-black active:opacity-90"
                    style={{
                      backgroundColor: config?.bg || '#000000',
                      color: config?.fg || '#FFFFFF',
                    }}
                  >
                    BUY
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SELL section */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-danger" />
          <h2 className="font-syne text-[12px] font-bold uppercase tracking-[0.18em]">
            Sell Gift Cards
          </h2>
        </div>
        <div className="border border-black p-4 bg-cream">
          <label className="block mb-3">
            <span className="font-mono text-[10px] tracking-[0.18em] text-black/60 block mb-1.5">
              ENTER CARD CODE
            </span>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 24))}
              placeholder="XXXX-XXXX-XXXX"
              className="w-full border border-black px-3 py-2 font-mono text-[12px] tracking-[0.15em] bg-white outline-none focus:bg-accent/10"
            />
          </label>
          <label className="block mb-4">
            <span className="font-mono text-[10px] tracking-[0.18em] text-black/60 block mb-1.5">
              CARD VALUE $
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(e) =>
                setValue(e.target.value.replace(/[^\d.]/g, '').slice(0, 10))
              }
              placeholder="0.00"
              className="w-full border border-black px-3 py-2 font-mono text-[12px] tracking-[0.15em] bg-white outline-none focus:bg-accent/10"
            />
          </label>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={getQuote}
            className="w-full bg-black text-white py-3 font-syne text-[12px] font-bold tracking-[0.2em] active:bg-accent active:text-black"
          >
            GET QUOTE
          </motion.button>

          <AnimatePresence>
            {quote !== null && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="mt-3 border border-black p-3 bg-accent flex items-center justify-between"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] font-bold">
                  WE OFFER
                </span>
                <span className="font-mono text-[20px] font-bold leading-none">
                  ${quote.toFixed(2)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
