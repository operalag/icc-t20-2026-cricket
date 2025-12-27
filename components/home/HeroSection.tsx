'use client';

import { TrendingUpIcon, ShieldCheckIcon, ZapIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl min-h-[500px] flex flex-col justify-center bg-gray-900">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 scale-110"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <Image
          src="/images/cricket4.jpg"
          alt="Cricket Stadium"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-ton-blue/30 to-transparent" />
      </div>

      <div className="relative z-10 p-8 md:p-12">
        <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-4 text-white border border-white/20">
          Powered by TON Blockchain
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          2026 ICC T20 World Cup
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
            Prediction Markets
          </span>
        </h1>

        <p className="text-lg text-white/80 mb-8 max-w-2xl">
          Trade on cricket outcomes with transparent, blockchain-based markets.
          Fast settlements, low fees, and provably fair odds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <ZapIcon className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="font-semibold mb-1 text-white">Instant Settlement</div>
              <div className="text-sm text-white/70">
                5-second finality on TON blockchain
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <ShieldCheckIcon className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="font-semibold mb-1 text-white">Transparent & Fair</div>
              <div className="text-sm text-white/70">
                AMM-based odds, no house edge
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUpIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="font-semibold mb-1 text-white">Real-Time Markets</div>
              <div className="text-sm text-white/70">
                In-play betting with live odds updates
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
