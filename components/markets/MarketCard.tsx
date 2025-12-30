'use client';

import { Market, MarketStatus } from '@/types/markets';
import { useBetSlipStore } from '@/lib/store/bet-slip-store';
import { formatDistanceToNow } from 'date-fns';
import { TrendingUpIcon, ClockIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const addItem = useBetSlipStore((state) => state.addItem);

  const handleOutcomeClick = (outcomeId: string) => {
    addItem(market, outcomeId);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <Link href={`/markets/${market.id}`} className="block hover:bg-gray-50 transition-colors">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                {market.title}
              </h3>
              <p className="text-sm text-gray-600">{market.description}</p>
            </div>
            <StatusBadge status={market.status} />
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3">
            <div className="flex items-center space-x-1">
              <TrendingUpIcon className="w-4 h-4" />
              <span>{(market.totalVolume / 1000).toFixed(1)}K TON</span>
            </div>
            <div className="flex items-center space-x-1">
              <ClockIcon className="w-4 h-4" />
              <span>
                Closes {formatDistanceToNow(market.closingTime, { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Outcomes */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          {market.outcomes.map((outcome) => (
            <button
              key={outcome.id}
              onClick={() => handleOutcomeClick(outcome.id)}
              className="group relative border-2 border-gray-200 rounded-lg p-4 hover:border-ton-blue hover:bg-ton-blue/5 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {outcome.metadata?.flagUrl && (
                    <Image
                      src={outcome.metadata.flagUrl}
                      alt={outcome.name}
                      width={20}
                      height={15}
                      className="rounded-sm"
                    />
                  )}
                  <span className="font-semibold text-gray-900">
                    {outcome.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-ton-blue">
                  {outcome.odds.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {outcome.impliedProbability.toFixed(1)}%
                </div>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                Vol: {(outcome.totalVolume / 1000).toFixed(1)}K
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-ton-blue opacity-0 group-hover:opacity-5 transition-opacity rounded-lg pointer-events-none" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: MarketStatus }) {
  const statusConfig = {
    [MarketStatus.ACTIVE]: {
      label: 'Active',
      className: 'bg-green-100 text-green-800',
    },
    [MarketStatus.PENDING]: {
      label: 'Pending',
      className: 'bg-yellow-100 text-yellow-800',
    },
    [MarketStatus.SUSPENDED]: {
      label: 'Suspended',
      className: 'bg-orange-100 text-orange-800',
    },
    [MarketStatus.SETTLED]: {
      label: 'Settled',
      className: 'bg-gray-100 text-gray-800',
    },
    [MarketStatus.CANCELLED]: {
      label: 'Cancelled',
      className: 'bg-red-100 text-red-800',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
