import React, { useState } from 'react';
import { Wallet, LogOut, Copy, ExternalLink, ChevronDown, Check, TrendingUp, TrendingDown } from 'lucide-react';

interface WalletConnectProps {
  onConnect: () => Promise<void>;
  onDisconnect: () => void;
  isConnected: boolean;
  address?: string;
  balance?: {
    ton: number;
    usd: number;
  };
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  onConnect,
  onDisconnect,
  isConnected,
  address,
  balance
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await onConnect();
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-lg hover:shadow-xl"
      >
        {isConnecting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </>
        )}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg transition-all shadow-md"
      >
        <Wallet className="w-5 h-5 text-blue-600" />
        <div className="text-left">
          <p className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">
            {balance?.ton.toFixed(2)} TON
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
            ≈ ${balance?.usd.toFixed(2)}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 z-50 overflow-hidden">
            {/* Balance Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
                {balance?.ton.toFixed(4)} TON
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 tabular-nums">
                ≈ ${balance?.usd.toFixed(2)} USD
              </p>
            </div>

            {/* Account Info */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Wallet Address</p>
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <span className="font-mono text-sm text-gray-900 dark:text-white">
                  {address && formatAddress(address)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyAddress}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    title="Copy address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`https://tonscan.org/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    title="View on TONScan"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Menu Actions */}
            <div className="p-2">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  onDisconnect();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-red-600 dark:text-red-500"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Disconnect Wallet</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Balance Display Component (for header)
interface BalanceDisplayProps {
  balance: {
    ton: number;
    usd: number;
    inOpenBets: number;
  };
  onDeposit: () => void;
  onWithdraw: () => void;
  onViewHistory: () => void;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  balance,
  onDeposit,
  onWithdraw,
  onViewHistory
}) => {
  const [showExpanded, setShowExpanded] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowExpanded(!showExpanded)}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-700 dark:hover:to-gray-700 px-4 py-2 rounded-lg transition-all border border-gray-200 dark:border-gray-700"
      >
        <Wallet className="w-5 h-5 text-blue-600" />
        <div className="text-left">
          <p className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">
            {balance.ton.toFixed(2)} TON
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
            ${balance.usd.toFixed(2)}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showExpanded ? 'rotate-180' : ''}`} />
      </button>

      {showExpanded && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowExpanded(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 z-50">
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Wallet Balance</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Balance</span>
                  <span className="font-bold text-gray-900 dark:text-white tabular-nums">
                    {balance.ton.toFixed(4)} TON
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Available to Bet</span>
                  <span className="font-semibold text-green-600 dark:text-green-500 tabular-nums">
                    {(balance.ton - balance.inOpenBets).toFixed(4)} TON
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">In Open Bets</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-500 tabular-nums">
                    {balance.inOpenBets.toFixed(4)} TON
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">USD Value</span>
                    <span className="font-bold text-gray-900 dark:text-white tabular-nums">
                      ${balance.usd.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  onClick={onDeposit}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  Deposit
                </button>
                <button
                  onClick={onWithdraw}
                  className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  <TrendingDown className="w-4 h-4" />
                  Withdraw
                </button>
              </div>

              <button
                onClick={onViewHistory}
                className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                View Transaction History
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Deposit Modal
interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number) => Promise<void>;
  minDeposit: number;
  maxDeposit: number;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  onDeposit,
  minDeposit,
  maxDeposit
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const quickAmounts = [10, 25, 50, 100];

  const handleDeposit = async () => {
    if (amount < minDeposit || amount > maxDeposit) return;

    setIsProcessing(true);
    try {
      await onDeposit(amount);
      onClose();
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Deposit TON</h2>

          {/* Quick Amounts */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick amounts
            </label>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map(quickAmount => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                    amount === quickAmount
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {quickAmount} TON
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Or enter custom amount
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-lg font-semibold"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                TON
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Min: {minDeposit} TON • Max: {maxDeposit} TON
            </p>
          </div>

          {/* Info */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Your wallet will open to confirm the transaction. Deposits usually take 5-10 seconds to confirm.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeposit}
              disabled={amount < minDeposit || amount > maxDeposit || isProcessing}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                `Deposit ${amount} TON`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
