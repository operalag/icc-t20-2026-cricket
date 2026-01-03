'use client';

import Link from 'next/link';
import { useTonAddress } from '@tonconnect/ui-react';
import { useWalletStore } from '@/lib/store/wallet-store';
import { useEffect, useState } from 'react';
import { TrophyIcon, Menu, X } from 'lucide-react';
import { WalletDisplay } from '../WalletDisplay';

export function Header() {
  const address = useTonAddress();
  const { setAddress, setConnected } = useWalletStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (address) {
      setAddress(address);
      setConnected(true);
    } else {
      setAddress(null);
      setConnected(false);
    }
  }, [address, setAddress, setConnected]);

  const navLinks = [
    { href: '/', label: 'Markets' },
    { href: '/matches', label: 'Matches' },
    { href: '/portfolio', label: 'My Markets' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 mr-8">
              <div className="w-10 h-10 bg-gradient-to-br from-ton-blue to-ton-darkblue rounded-lg flex items-center justify-center">
                <TrophyIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-gray-900 leading-tight">
                  Cricket Markets
                </div>
                <div className="text-xs text-gray-500">
                  ICC T20 World Cup 2026
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-ton-blue font-medium transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <WalletDisplay />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white absolute w-full left-0 shadow-lg animate-slide-down">
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-ton-blue font-medium text-lg py-2 px-2 hover:bg-gray-50 rounded-lg transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
