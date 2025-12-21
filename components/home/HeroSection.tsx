'use client';

import { TrendingUpIcon, ShieldCheckIcon, ZapIcon } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-ton-blue to-ton-darkblue rounded-2xl p-8 md:p-12 text-white">
      <div className="relative z-10">
        <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          Powered by TON Blockchain
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          2026 ICC T20 World Cup
          <br />
          <span className="text-blue-200">Prediction Markets</span>
        </h1>

        <p className="text-lg text-blue-100 mb-8 max-w-2xl">
          Trade on cricket outcomes with transparent, blockchain-based markets.
          Fast settlements, low fees, and provably fair odds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <ZapIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold mb-1">Instant Settlement</div>
              <div className="text-sm text-blue-100">
                5-second finality on TON blockchain
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold mb-1">Transparent & Fair</div>
              <div className="text-sm text-blue-100">
                AMM-based odds, no house edge
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUpIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold mb-1">Real-Time Markets</div>
              <div className="text-sm text-blue-100">
                In-play betting with live odds updates
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
    </div>
  );
}
