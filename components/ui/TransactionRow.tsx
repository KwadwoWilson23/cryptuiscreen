'use client';

import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import CryptoLogo from './CryptoLogo';

export type TxStatus = 'completed' | 'pending';

export interface TransactionData {
  type: 'send' | 'receive';
  asset: string;
  amount: string;
  timestamp: string;
  status?: TxStatus;
}

export default function TransactionRow({ tx }: { tx: TransactionData }) {
  const Icon = tx.type === 'send' ? ArrowUpRight : ArrowDownLeft;
  const dirColor = tx.type === 'send' ? '#FF3D55' : '#00FF85';

  return (
    <div className="flex items-center justify-between py-3 border-b border-black/15">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0">
          <CryptoLogo ticker={tx.asset} size={32} />
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 border border-black flex items-center justify-center bg-white"
            style={{ color: dirColor }}
          >
            <Icon size={9} strokeWidth={3} />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-syne text-[12px] font-semibold uppercase tracking-[0.1em] truncate">
            {tx.type === 'send' ? 'SEND' : 'RECEIVE'} {tx.asset}
          </span>
          <span className="font-mono text-[10px] text-black/50 tracking-wider">
            {tx.timestamp}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end shrink-0 gap-0.5">
        <span
          className="font-mono text-[12px] font-bold leading-none"
          style={{ color: tx.type === 'send' ? '#FF3D55' : '#000000' }}
        >
          {tx.amount}
        </span>
        {tx.status && (
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
        )}
      </div>
    </div>
  );
}
