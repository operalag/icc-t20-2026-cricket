'use client';

import { useTradeSlipStore } from '@/lib/store/trade-slip-store';
import { useWalletStore } from '@/lib/store/wallet-store';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { TradeSlipItem } from './TradeSlipItem';
import { XIcon, WalletIcon, ShoppingBagIcon, ChevronDownIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function TradeSlip() {
  const { items, clearItems, getTotalStake, getPotentialReturn } = useTradeSlipStore();
  const { connected, balance } = useWalletStore();
  const [tonConnectUI] = useTonConnectUI();
  const [placing, setPlacing] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auto-open mobile sheet when first item is added
  useEffect(() => {
    if (items.length > 0 && !isMobileOpen) {
       setIsMobileOpen(true);
    }
  }, [items.length, isMobileOpen]);

  const totalStake = getTotalStake();
  const potentialReturn = getPotentialReturn();

  const handleConfirmTrade = async () => {
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Trade executed successfully!');
      clearItems();
      setIsMobileOpen(false);
    } catch (error) {
      console.error('Failed to execute trade:', error);
      alert('Trade failed');
    } finally {
      setPlacing(false);
    }
  };

  const TradeSlipContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full text-slate-900 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-ton-blue to-ton-darkblue p-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <ShoppingBagIcon className="w-5 h-5" />
            Trade Slip
          </h3>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-white/20 rounded text-sm font-medium text-white">
              {items.length}
            </span>
            {isMobile ? (
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition"
              >
                <ChevronDownIcon className="w-5 h-5 text-white" />
              </button>
            ) : (
              <button
                onClick={clearItems}
                className="p-1 hover:bg-white/20 rounded transition"
                title="Clear all"
              >
                <XIcon className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        </div>
        {connected && (
          <div className="text-sm text-blue-100 font-medium">
            Balance: {balance.toFixed(2)} TON
          </div>
        )}
      </div>

      {/* Items List */}
      <div className={`overflow-y-auto ${isMobile ? 'max-h-[50vh]' : 'max-h-[calc(100vh-20rem)]'}`}>
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-500 flex flex-col items-center bg-white">
             <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
               <ShoppingBagIcon className="w-6 h-6 text-gray-400" />
             </div>
             <p className="font-medium">Your trade slip is empty</p>
             <p className="text-xs mt-1">Select an outcome to start trading</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 bg-white">
            {items.map((item) => (
              <TradeSlipItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Footer Summary */}
      {items.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Total Investment</span>
              <span className="font-bold text-slate-900">
                {totalStake.toFixed(2)} TON
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Est. Return</span>
              <span className="font-bold text-green-600">
                {potentialReturn.toFixed(2)} TON
              </span>
            </div>
          </div>

          <button
            onClick={handleConfirmTrade}
            disabled={placing}
            className="w-full bg-ton-blue hover:bg-ton-darkblue text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 active:scale-95"
          >
            {placing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Executing...</span>
              </>
            ) : connected ? (
              <span>Confirm Trade</span>
            ) : (
              <>
                <WalletIcon className="w-5 h-5" />
                <span>Connect Wallet</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="w-14 h-14 bg-ton-blue rounded-full shadow-xl shadow-blue-500/30 text-white flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90"
        >
          <ShoppingBagIcon className="w-6 h-6" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center border-2 border-white">
              {items.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Drawer/Modal */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[85vh] flex flex-col overflow-hidden">
             <TradeSlipContent isMobile={true} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      {items.length > 0 && (
        <div className="hidden lg:block fixed right-6 top-24 w-80 z-40 animate-slide-in-right">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]">
            <TradeSlipContent />
          </div>
        </div>
      )}
    </>
  );
}