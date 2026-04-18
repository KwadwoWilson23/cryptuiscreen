'use client';

import { motion } from 'framer-motion';
import {
  Home,
  BarChart3,
  ArrowLeftRight,
  Gift,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

export type TabId = 'home' | 'markets' | 'trade' | 'cards' | 'wallet';

export const TAB_ORDER: TabId[] = ['home', 'markets', 'trade', 'cards', 'wallet'];

const TABS: { id: TabId; label: string; Icon: LucideIcon }[] = [
  { id: 'home', label: 'HOME', Icon: Home },
  { id: 'markets', label: 'MARKETS', Icon: BarChart3 },
  { id: 'trade', label: 'TRADE', Icon: ArrowLeftRight },
  { id: 'cards', label: 'CARDS', Icon: Gift },
  { id: 'wallet', label: 'WALLET', Icon: Wallet },
];

export default function BottomNav({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (t: TabId) => void;
}) {
  const activeIdx = TAB_ORDER.indexOf(active);

  return (
    <nav className="shrink-0 border-t border-black bg-white relative">
      {/* Sliding active indicator */}
      <motion.div
        className="absolute top-0 pointer-events-none"
        style={{ width: '20%', height: '2px' }}
        animate={{ left: `${activeIdx * 20}%` }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      >
        <div className="mx-auto w-9 h-[2px] bg-accent" />
      </motion.div>

      <div className="grid grid-cols-5 h-[64px]">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className="flex flex-col items-center justify-center gap-1 active:bg-black/5"
              aria-label={label}
            >
              <motion.div
                animate={{ scale: isActive ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2 : 1.5}
                  color={isActive ? '#00FF85' : '#000000'}
                />
              </motion.div>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="font-mono text-[9px] tracking-[0.15em] text-black leading-none"
                >
                  {label}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
