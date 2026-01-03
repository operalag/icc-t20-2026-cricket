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
    TrophyIcon,
    TrendingUpIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTradeSlipStore } from '@/lib/store/trade-slip-store';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Mock history data generator
const generateHistoryData = (outcomes: any[]) => {
    const data = [];
    const points = 20;
    for (let i = 0; i < points; i++) {
        const point: any = { time: i };
        outcomes.forEach(outcome => {
            const variation = (Math.random() - 0.5) * 10;
            point[outcome.name] = Math.max(0, Math.min(100, outcome.impliedProbability + variation));
        });
        data.push(point);
    }
    return data;
};

export default function MarketClient() {
    const params = useParams();
    const id = params.id as string;
    const market = mockMarkets.find(m => m.id === id);
    const { addItem, items } = useTradeSlipStore();

    if (!market) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Market not found</h2>
                <Link href="/" className="text-ton-blue hover:underline font-medium">
                    Return to Markets
                </Link>
            </div>
        );
    }

    const chartData = generateHistoryData(market.outcomes);
    const colors = ['#0088CC', '#22C55E', '#EAB308', '#EF4444', '#8B5CF6', '#F97316', '#EC4899', '#6366F1'];

    // Check if user has a simulated position in this market
    const currentPositions = items.filter(item => item.market.id === market.id);

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
                                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl flex-shrink-0">
                                    {market.metadata?.iconUrl ? (
                                        <ActivityIcon className="w-8 h-8 text-ton-blue" />
                                    ) : (
                                        <TrophyIcon className="w-8 h-8 text-yellow-400" />
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight">
                                        {market.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                                        <span className="flex items-center gap-1.5 text-gray-500">
                                            <ClockIcon className="w-4 h-4" />
                                            Resolves {format(new Date(market.closingTime), 'MMM d, yyyy')}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-ton-blue">
                                            <TrendingUpIcon className="w-4 h-4" />
                                            {(market.totalVolume / 1000).toFixed(1)}k TON Volume
                                        </span>
                                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs uppercase tracking-wider font-bold">
                                            {market.marketType.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600 border border-gray-100">
                                    <ShareIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="h-[350px] w-full mt-8 bg-slate-50/50 rounded-xl p-4 border border-slate-50">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Probability History</h4>
                                <div className="flex gap-2">
                                    <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-500">1H</span>
                                    <span className="text-xs bg-ton-blue text-white px-2 py-1 rounded border border-ton-blue">1D</span>
                                    <span className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-500">1W</span>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="time" hide />
                                    <YAxis
                                        orientation="right"
                                        tickFormatter={(val) => `${val.toFixed(0)}%`}
                                        stroke="#94a3b8"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                                    />
                                    {market.outcomes.map((outcome, idx) => (
                                        <Line
                                            key={outcome.id}
                                            type="monotone"
                                            dataKey={outcome.name}
                                            stroke={colors[idx % colors.length]}
                                            strokeWidth={4}
                                            dot={false}
                                            activeDot={{ r: 6, strokeWidth: 0 }}
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Details & Portfolio */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900">
                                <InfoIcon className="w-5 h-5 text-ton-blue" />
                                Market Rules
                            </h3>
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {market.description}
                                </p>
                                <ul className="text-xs text-gray-500 space-y-2 list-none">
                                    <li className="flex gap-2">
                                        <span className="text-ton-blue font-bold">•</span>
                                        Resolves based on official ICC match results.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-ton-blue font-bold">•</span>
                                        Trades close at match start time.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-ton-blue font-bold">•</span>
                                        Shares redeemable for 1 TON if outcome is correct.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl text-white">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <ActivityIcon className="w-5 h-5 text-green-400" />
                                Your Positions
                            </h3>
                            {currentPositions.length > 0 ? (
                                <div className="space-y-4">
                                    {currentPositions.map(pos => (
                                        <div key={pos.id} className="bg-white/5 rounded-xl p-3 border border-white/10">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-sm">{pos.outcomeName}</span>
                                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Active</span>
                                            </div>
                                            <div className="flex justify-between text-xs text-white/60">
                                                <span>{pos.potentialReturn.toFixed(1)} Shares</span>
                                                <span>Avg. Price: {(1 / pos.odds).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <p className="text-sm text-white/40">No active positions in this market.</p>
                                    <p className="text-xs text-white/20 mt-1">Acquire shares to see them here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Panel */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden sticky top-24">
                        <div className="p-5 border-b border-gray-100 bg-slate-50 flex items-center justify-center">
                            <div>
                                <h3 className="font-bold text-gray-900">Acquire Shares</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Automated Market Maker v2</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200">
                                <DollarSignIcon className="w-4 h-4 text-ton-blue" />
                            </div>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {market.outcomes.map((outcome, idx) => {
                                const price = 1 / outcome.odds;
                                return (
                                    <div key={outcome.id} className="p-5 hover:bg-slate-50/50 transition-colors group">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                {outcome.metadata?.flagUrl && (
                                                    <div className="w-10 h-7 rounded-lg overflow-hidden shadow-md relative border border-gray-100 flex-shrink-0">
                                                        <Image src={outcome.metadata.flagUrl} alt={outcome.name} fill className="object-cover" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-black text-gray-900 text-lg">{outcome.name}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }}></span>
                                                        {outcome.impliedProbability.toFixed(1)}% Chance
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-slate-900 leading-none">
                                                    {price.toFixed(2)}
                                                </div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">Price / Share</div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => addItem(market, outcome.id)}
                                                className="flex-1 py-3.5 bg-ton-blue hover:bg-ton-darkblue text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
                                            >
                                                Buy
                                            </button>
                                            <button
                                                className="px-4 bg-slate-100 text-slate-400 rounded-2xl font-bold text-sm transition-colors cursor-not-allowed border border-slate-200"
                                                title="Sell positions in Portfolio"
                                                disabled
                                            >
                                                Sell
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="p-5 bg-slate-900 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-slate-400">Trading Pair</span>
                                <span className="text-sm font-bold">OUTCOME / TON</span>
                            </div>
                            <button
                                onClick={() => document.getElementById('wallet-connect')?.click()}
                                className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors border border-white/10"
                            >
                                Connect Wallet to Trade
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
