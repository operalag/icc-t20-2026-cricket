'use client';

import { useBetSlipStore } from '@/lib/store/bet-slip-store';
import { useWalletStore } from '@/lib/store/wallet-store';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { BetSlipItem } from './BetSlipItem';
import { XIcon, WalletIcon } from 'lucide-react';
import { useState } from 'react';

export function BetSlip() {
  const { items, clearItems, getTotalStake, getPotentialReturn } = useBetSlipStore();
  const { connected, address, balance } = useWalletStore();
  const [tonConnectUI] = useTonConnectUI();
  const [placing, setPlacing] = useState(false);

  const totalStake = getTotalStake();
  const potentialReturn = getPotentialReturn();

  const handlePlaceBets = async () => {
    if (!connected) {
      await tonConnectUI.connectWallet();
      return;
    }

    if (totalStake > balance) {
      alert('Insufficient balance');
      return;
    }

    setPlacing(true);

    try {
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In production, this would:
      // 1. Construct transaction payload
      // 2. Send to TON blockchain
      // 3. Wait for confirmation
      // 4. Update backend with bet details

      alert('Bets placed successfully!');
      clearItems();
    } catch (error) {
      console.error('Failed to place bets:', error);
      alert('Failed to place bets');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bet-slip-container">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-900">Bet Slip</h3>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm font-medium text-gray-600">
              0
            </span>
          </div>
          <div className="text-center py-8 text-gray-500 text-sm">
            Select outcomes to add to your bet slip
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bet-slip-container">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-ton-blue to-ton-darkblue p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg text-white">Bet Slip</h3>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-white/20 rounded text-sm font-medium text-white">
                {items.length}
              </span>
              <button
                onClick={clearItems}
                className="p-1 hover:bg-white/20 rounded transition"
              >
                <XIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          {connected && (
            <div className="text-sm text-blue-100">
              Balance: {balance.toFixed(2)} TON
            </div>
          )}
        </div>

        {/* Items */}
        <div className="max-h-96 overflow-y-auto">
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <BetSlipItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Stake</span>
              <span className="font-semibold text-gray-900">
                {totalStake.toFixed(2)} TON
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Potential Return</span>
              <span className="font-semibold text-green-600">
                {potentialReturn.toFixed(2)} TON
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Potential Profit</span>
              <span className="font-semibold text-green-600">
                +{(potentialReturn - totalStake).toFixed(2)} TON
              </span>
            </div>
          </div>

          <button
            onClick={handlePlaceBets}
            disabled={placing || (!connected && items.length === 0)}
            className="w-full bg-ton-blue hover:bg-ton-darkblue text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {placing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Placing Bets...</span>
              </>
            ) : connected ? (
              <span>Place Bets</span>
            ) : (
              <>
                <WalletIcon className="w-5 h-5" />
                <span>Connect Wallet</span>
              </>
            )}
          </button>

          {!connected && (
            <p className="text-xs text-gray-500 text-center mt-2">
              Connect your TON wallet to place bets
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
