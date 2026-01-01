'use client';

import { TradeSlipItem as TradeSlipItemType } from '@/types/markets';
import { useTradeSlipStore } from '@/lib/store/trade-slip-store';
import { XIcon, LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface TradeSlipItemProps {
  item: TradeSlipItemType;
}

export function TradeSlipItem({ item }: TradeSlipItemProps) {
  const { removeItem, updateAmount } = useTradeSlipStore();
  const [inputValue, setInputValue] = useState(item.amount.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Sync from store only if the input is not focused
    if (document.activeElement !== inputRef.current) {
      setInputValue(item.amount.toString());
    }
  }, [item.amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string and numbers with decimals for a smooth typing experience
    if (value === '' || /^[0-9]\d*\.?\d*$/.test(value)) {
      setInputValue(value);
      const amount = parseFloat(value);
      if (!isNaN(amount) && amount >= 0) {
        updateAmount(item.id, amount);
      }
    }
  };

  const handleBlur = () => {
    // On blur, if the input is empty or invalid, snap it back to the store's value
    if (inputValue === '' || isNaN(parseFloat(inputValue))) {
      setInputValue(item.amount.toString());
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
          <Link href={`/markets/${item.market.id}`} className="text-xs text-ton-blue hover:underline line-clamp-1 block flex items-center gap-1">
             <LinkIcon className="w-3 h-3" />
            {item.market.title}
          </Link>
        </div>
        <button
          onClick={() => removeItem(item.id)}
          className="p-1 hover:bg-gray-100 rounded-full transition"
        >
          <XIcon className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-600 mb-1">Amount (TON)</label>
          <input
            ref={inputRef}
            type="text" // Use text to allow for intermediate states like "1."
            inputMode="decimal"
            min="0"
            max="10000"
            step="any"
            value={inputValue}
            onChange={handleAmountChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ton-blue text-gray-900 bg-white"
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
