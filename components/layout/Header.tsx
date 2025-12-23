'use client';

import Link from 'next/link';
import { useTonAddress } from '@tonconnect/ui-react';
import { useWalletStore } from '@/lib/store/wallet-store';
import { useEffect } from 'react';
import { TrophyIcon } from 'lucide-react';
import { WalletDisplay } from '../WalletDisplay';

export function Header() {
  const address = useTonAddress();
  const { setAddress, setConnected } = useWalletStore();

  useEffect(() => {
    if (address) {
      setAddress(address);
      setConnected(true);
    } else {
      setAddress(null);
      setConnected(false);
    }
  }, [address, setAddress, setConnected]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-ton-blue to-ton-darkblue rounded-lg flex items-center justify-center">
              <TrophyIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg text-gray-900">
                Cricket Markets
              </div>
              <div className="text-xs text-gray-500">
                ICC T20 World Cup 2026
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-ton-blue font-medium transition"
            >
              Markets
            </Link>
            <Link
              href="/matches"
              className="text-gray-700 hover:text-ton-blue font-medium transition"
            >
              Matches
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-700 hover:text-ton-blue font-medium transition"
            >
              My Bets
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <WalletDisplay />
          </div>
        </div>
      </div>
    </header>
  );
}
