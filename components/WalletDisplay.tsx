'use client';

import { useState, useEffect, useRef } from 'react';
import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { WalletIcon, LogOutIcon, ChevronDownIcon, CopyIcon, CheckIcon, ExternalLinkIcon } from 'lucide-react';
import { useWalletStore } from '@/lib/store/wallet-store';

export function WalletDisplay() {
  const address = useTonAddress();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const { setBalance: setGlobalBalance } = useWalletStore();
  const [balance, setBalance] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch balance from TON API
  useEffect(() => {
    async function fetchBalance() {
      if (!address) {
        setBalance(null);
        return;
      }

      try {
        // Use toncenter API to get balance (TESTNET)
        const response = await fetch(
          `https://testnet.toncenter.com/api/v2/getAddressBalance?address=${address}`
        );
        const data = await response.json();

        if (data.ok && data.result) {
          // Convert from nanotons to TON
          const tonBalance = parseInt(data.result) / 1e9;
          setBalance(tonBalance);
          setGlobalBalance(tonBalance);
        }
      } catch (error) {
        console.error('Failed to fetch balance:', error);
        setBalance(null);
      }
    }

    fetchBalance();
    // Refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, [address, setGlobalBalance]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDisconnect = async () => {
    await tonConnectUI.disconnect();
    setGlobalBalance(0);
    setIsOpen(false);
  };

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: number | null) => {
    if (bal === null) return '---';
    if (bal < 0.01) return '< 0.01';
    return bal.toFixed(2);
  };

  // If not connected, show connect button
  if (!address || !wallet) {
    return (
      <button
        onClick={() => tonConnectUI.openModal()}
        id="wallet-connect"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-ton-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
      >
        <WalletIcon className="w-4 h-4" />
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Wallet Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
      >
        {/* Balance */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-ton-blue to-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <span className="font-semibold text-gray-900">
            {formatBalance(balance)} TON
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-300" />

        {/* Address */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">
            {truncateAddress(address)}
          </span>
          <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-ton-blue to-blue-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <WalletIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">{wallet.device.appName || 'Wallet'}</div>
                <div className="text-blue-100 text-sm">Connected</div>
              </div>
            </div>
          </div>

          {/* Balance Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Balance</div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ton-blue to-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">T</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {formatBalance(balance)}
              </span>
              <span className="text-gray-500">TON</span>
            </div>
          </div>

          {/* Address Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="text-sm text-gray-500 mb-2">Wallet Address</div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-gray-100 px-3 py-2 rounded-lg text-gray-700 font-mono truncate">
                {address}
              </code>
              <button
                onClick={handleCopyAddress}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Copy address"
              >
                {copied ? (
                  <CheckIcon className="w-4 h-4 text-green-500" />
                ) : (
                  <CopyIcon className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="p-2">
            <a
              href={`https://tonviewer.com/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-xl transition text-gray-700"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              <span className="text-sm font-medium">View on Explorer</span>
            </a>
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 rounded-xl transition text-red-600"
            >
              <LogOutIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}