'use client';

import { useEffect } from 'react';
import { useMarketStore } from '@/lib/store/market-store';
import { MarketList } from '@/components/markets/MarketList';
import { MarketFilters } from '@/components/markets/MarketFilters';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsOverview } from '@/components/home/StatsOverview';
import { TrophyIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

export default function HomePage() {
  const { markets, loading, fetchMarkets } = useMarketStore();

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  // Split markets by category
  const tournamentMarkets = markets.filter(
    (m) => !m.matchId && m.status === 'active'
  );
  const matchMarkets = markets.filter(
    (m) => m.matchId && m.status === 'active'
  );

  return (
    <div className="space-y-8">
      <HeroSection />

      <StatsOverview
        stats={[
          {
            label: 'Active Markets',
            value: markets.length.toString(),
            icon: TrophyIcon,
            change: '+12',
          },
          {
            label: 'Total Volume',
            value: '$' + (markets.reduce((sum, m) => sum + m.totalVolume, 0) / 1000).toFixed(0) + 'K',
            icon: TrendingUpIcon,
            change: '+24%',
          },
          {
            label: 'Active Traders',
            value: '2.4K',
            icon: UsersIcon,
            change: '+156',
          },
        ]}
      />

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Tournament Outrights
            </h2>
            <p className="text-gray-600 mt-1">
              Forecast tournament winners and top performers
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-48 bg-white rounded-lg animate-shimmer"
              />
            ))}
          </div>
        ) : (
          <MarketList markets={tournamentMarkets} />
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Upcoming Matches
            </h2>
            <p className="text-gray-600 mt-1">
              Trade on match outcomes and player performances
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-48 bg-white rounded-lg animate-shimmer"
              />
            ))}
          </div>
        ) : (
          <MarketList markets={matchMarkets} />
        )}
      </section>
    </div>
  );
}
