'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

export default function QuickAction({
  Icon,
  label,
  onClick,
}: {
  Icon: LucideIcon;
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1.5 h-[68px] border border-black bg-white active:bg-black active:text-white transition-colors"
    >
      <Icon size={20} strokeWidth={1.6} />
      <span className="font-mono text-[10px] tracking-[0.15em]">{label}</span>
    </motion.button>
  );
}
