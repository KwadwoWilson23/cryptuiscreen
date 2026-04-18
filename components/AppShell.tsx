'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Signal, Wifi, BatteryFull } from 'lucide-react';
import HomeScreen from './screens/HomeScreen';
import MarketsScreen from './screens/MarketsScreen';
import TradeScreen from './screens/TradeScreen';
import CardsScreen from './screens/CardsScreen';
import WalletScreen from './screens/WalletScreen';
import BottomNav, { TabId, TAB_ORDER } from './ui/BottomNav';

const screens: Record<TabId, React.ComponentType> = {
  home: HomeScreen,
  markets: MarketsScreen,
  trade: TradeScreen,
  cards: CardsScreen,
  wallet: WalletScreen,
};

export default function AppShell() {
  const [active, setActive] = useState<TabId>('home');
  const [direction, setDirection] = useState<1 | -1>(1);

  const handleChange = (next: TabId) => {
    if (next === active) return;
    const currentIdx = TAB_ORDER.indexOf(active);
    const nextIdx = TAB_ORDER.indexOf(next);
    setDirection(nextIdx > currentIdx ? 1 : -1);
    setActive(next);
  };

  const Screen = screens[active];

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      {/* Top safe area + fake status bar (status bar visible on desktop only) */}
      <div
        className="shrink-0 bg-white relative z-30"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="hidden desktop:flex h-[54px] items-end justify-between px-7 pb-1.5">
          <span className="font-mono text-[14px] font-bold leading-none">9:41</span>
          <div className="w-[124px]" aria-hidden />
          <div className="flex items-center gap-1.5 leading-none">
            <Signal size={14} strokeWidth={2.5} />
            <Wifi size={14} strokeWidth={2.5} />
            <BatteryFull size={20} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Animated screen content */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            initial={{ x: direction > 0 ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: direction > 0 ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 overflow-y-auto no-scrollbar bg-white"
          >
            <Screen />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <BottomNav active={active} onChange={handleChange} />

      {/* Bottom safe area + home indicator */}
      <div
        className="shrink-0 bg-white"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="hidden desktop:flex h-[24px] items-center justify-center">
          <div className="w-[140px] h-[5px] bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
}
