'use client';

import { MarketStatus, MarketType } from '@/types/markets';
import { useMarketStore } from '@/lib/store/market-store';

export function MarketFilters() {
  const { filters, setFilters } = useMarketStore();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status[0] || ''}
            onChange={(e) =>
              setFilters({ status: [e.target.value as MarketStatus] })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ton-blue"
          >
            <option value={MarketStatus.ACTIVE}>Active</option>
            <option value={MarketStatus.PENDING}>Pending</option>
            <option value={MarketStatus.SETTLED}>Settled</option>
          </select>
        </div>

        {/* Market Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Market Type
          </label>
          <select
            value={filters.marketType || ''}
            onChange={(e) =>
              setFilters({
                marketType: e.target.value ? (e.target.value as MarketType) : null,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ton-blue"
          >
            <option value="">All Types</option>
            <option value={MarketType.TOURNAMENT_WINNER}>Tournament Winner</option>
            <option value={MarketType.MATCH_WINNER}>Match Winner</option>
            <option value={MarketType.TOP_BATSMAN}>Top Batsman</option>
            <option value={MarketType.TOP_BOWLER}>Top Bowler</option>
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search markets..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ton-blue"
          />
        </div>
      </div>
    </div>
  );
}
