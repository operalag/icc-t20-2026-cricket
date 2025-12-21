'use client';

import { Market } from '@/types/markets';
import { MarketCard } from './MarketCard';

interface MarketListProps {
  markets: Market[];
}

export function MarketList({ markets }: MarketListProps) {
  if (markets.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No markets available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {markets.map((market) => (
        <MarketCard key={market.id} market={market} />
      ))}
    </div>
  );
}
