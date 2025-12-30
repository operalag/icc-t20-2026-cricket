'use client';

import { useParams } from 'next/navigation';
import { mockMarkets } from '@/lib/data/mock-data';
import { format } from 'date-fns';
import {
  ClockIcon,
  DollarSignIcon,
  BarChart2Icon,
  InfoIcon,
  ChevronLeftIcon,
  ShareIcon,
  ActivityIcon,
  TrophyIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useBetSlipStore } from '@/lib/store/bet-slip-store';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Mock history data generator
const generateHistoryData = (outcomes: any[]) => {
  const data = [];
  const points = 20;
  for (let i = 0; i < points; i++) {
    const point: any = { time: i };
    outcomes.forEach(outcome => {
      // Random walk around the current probability
      const variation = (Math.random() - 0.5) * 10;
      point[outcome.name] = Math.max(0, Math.min(100, outcome.impliedProbability + variation));
    });
    data.push(point);
  }
  return data;
};

export default function MarketPage() {
  const params = useParams();
  const id = params.id as string;
  const market = mockMarkets.find(m => m.id === id);
  const addItem = useBetSlipStore(state => state.addItem);

  if (!market) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Market not found</h2>
        <Link href="/" className="text-ton-blue hover:underline">
          Return to Markets
        </Link>
      </div>
    );
  }

  const chartData = generateHistoryData(market.outcomes);
  const colors = ['#0088CC', '#22C55E', '#EAB308', '#EF4444', '#8B5CF6', '#F97316', '#EC4899', '#6366F1'];

  return (
    <div className="min-h-screen pb-20">
      {/* Breadcrumb / Nav */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-ton-blue flex items-center gap-1 transition-colors">
          <ChevronLeftIcon className="w-4 h-4" />
          Markets
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{market.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Chart & Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-ton-blue to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 flex-shrink-0">
                  {market.metadata?.iconUrl ? (
                     // Placeholder if no icon
                     <ActivityIcon className="w-8 h-8" />
                  ) : (
                    <TrophyIcon className="w-8 h-8" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{market.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      Ends {format(new Date(market.closingTime), 'MMM d, yyyy')}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSignIcon className="w-4 h-4" />
                      ${(market.totalVolume / 1000).toFixed(1)}k Vol
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium text-xs border border-blue-100 uppercase tracking-wide">
                      {market.marketType}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Chart Area */}
            <div className="h-[350px] w-full mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="time" hide />
                  <YAxis 
                    orientation="right" 
                    tickFormatter={(val) => `${val.toFixed(0)}%`} 
                    stroke="#9ca3af" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                  />
                  {market.outcomes.map((outcome, idx) => (
                    <Line
                      key={outcome.id}
                      type="monotone"
                      dataKey={outcome.name}
                      stroke={colors[idx % colors.length]}
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Description & Rules */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <InfoIcon className="w-5 h-5 text-gray-400" />
              About this Market
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {market.description}
            </p>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="font-medium text-sm text-gray-900 mb-2">Market Rules</h4>
              <ul className="text-sm text-gray-500 space-y-2 list-disc pl-5">
                <li>Market resolves based on official ICC match results.</li>
                <li>Trading closes at match start time.</li>
                <li>Settlement occurs within 24 hours of match completion.</li>
                <li>Platform fees are 1% on winning positions only.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Trading Interface */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Outcomes</h3>
              <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                AMM v2
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {market.outcomes.map((outcome, idx) => (
                <div key={outcome.id} className="p-4 hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {outcome.metadata?.flagUrl && (
                        <div className="w-8 h-6 rounded overflow-hidden shadow-sm relative border border-gray-100">
                           <Image src={outcome.metadata.flagUrl} alt={outcome.name} fill className="object-cover" />
                        </div>
                      )}
                      <div>
                         <div className="font-bold text-gray-900">{outcome.name}</div>
                         <div className="text-xs text-gray-400 flex items-center gap-1">
                           <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }}></span>
                           {outcome.shares.toLocaleString()} shares
                         </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">{outcome.impliedProbability.toFixed(1)}%</div>
                      <div className="text-xs text-green-600 font-medium">
                        {outcome.odds.toFixed(2)}x
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 opacity-100 sm:opacity-50 sm:group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => addItem(market, outcome.id)}
                      className="py-2.5 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-sm transition-all shadow-lg shadow-green-500/20 active:scale-95 flex items-center justify-center gap-1"
                    >
                      Buy Yes
                    </button>
                    <button
                      className="py-2.5 px-3 bg-red-100 text-red-400 rounded-lg font-bold text-sm transition-colors cursor-not-allowed flex items-center justify-center gap-1"
                      title="Selling not available in demo"
                      disabled
                    >
                      Sell Yes
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-400">
               Connect wallet to trade instantly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
