'use client';

import { BetSlipItem as BetSlipItemType } from '@/types/markets';
import { useBetSlipStore } from '@/lib/store/bet-slip-store';
import { XIcon } from 'lucide-react';

interface BetSlipItemProps {
  item: BetSlipItemType;
}

export function BetSlipItem({ item }: BetSlipItemProps) {
  const { removeItem, updateAmount } = useBetSlipStore();

  const handleAmountChange = (value: string) => {
    const amount = parseFloat(value) || 0;
    if (amount >= 0 && amount <= 10000) {
      updateAmount(item.id, amount);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-2">
          <div className="font-medium text-gray-900 text-sm mb-1">
            {item.outcomeName}
          </div>
          <div className="text-xs text-gray-500 line-clamp-1">
            {item.market.title}
          </div>
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
          <label className="block text-xs text-gray-600 mb-1">Stake (TON)</label>
          <input
            type="number"
            min="0"
            max="10000"
            step="1"
            value={item.amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ton-blue"
          />
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-600 mb-1">Odds</div>
          <div className="font-bold text-ton-blue">
            {item.odds.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Potential Return</span>
          <span className="font-semibold text-gray-900">
            {item.potentialReturn.toFixed(2)} TON
          </span>
        </div>
      </div>
    </div>
  );
}
