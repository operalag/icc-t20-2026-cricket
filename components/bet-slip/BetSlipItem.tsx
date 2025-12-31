'use client';

import { BetSlipItem as BetSlipItemType } from '@/types/markets';
import { useBetSlipStore } from '@/lib/store/bet-slip-store';
import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface BetSlipItemProps {
  item: BetSlipItemType;
}

export function BetSlipItem({ item }: BetSlipItemProps) {
  const { removeItem, updateAmount } = useBetSlipStore();
  const [amountStr, setAmountStr] = useState(item.amount.toString());

  // Sync with store if changed externally (but handled carefully to avoid cursor jumps, 
  // mostly for initial load or external updates)
  useEffect(() => {
    // Only update if the numeric value matches but string representation is significantly different
    // or if we want to force sync. For simplicity, we sync if the parsed value is different.
    if (parseFloat(amountStr) !== item.amount) {
        setAmountStr(item.amount.toString());
    }
  }, [item.amount]);

  const handleAmountChange = (value: string) => {
    setAmountStr(value);
    const amount = parseFloat(value);
    if (!isNaN(amount) && amount >= 0 && amount <= 10000) {
      updateAmount(item.id, amount);
    }
  };

  const price = 1 / item.odds;

  return (
    <div className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-2">
          <div className="font-medium text-gray-900 text-sm mb-1">
            {item.outcomeName}
          </div>
          <Link href={`/markets/${item.market.id}`} className="text-xs text-ton-blue hover:underline line-clamp-1 block">
            {item.market.title}
          </Link>
        </div>
        <button
          onClick={() => removeItem(item.id)}
          className="p-1 hover:bg-gray-100 rounded transition"
        >
          <XIcon className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-600 mb-1">Amount (TON)</label>
          <input
            type="number"
            min="0"
            max="10000"
            step="any"
            value={amountStr}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ton-blue"
          />
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-600 mb-1">Price</div>
          <div className="font-bold text-ton-blue">
            {price.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Est. Shares</span>
          <span className="font-semibold text-gray-900">
            {item.potentialReturn.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
