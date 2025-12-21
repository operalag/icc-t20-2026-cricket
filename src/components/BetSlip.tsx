import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

interface Bet {
  id: string;
  market: string;
  selection: string;
  odds: number;
  oddsFormat: 'decimal' | 'american' | 'fractional';
  stake?: number;
  matchInfo?: string;
}

interface BetSlipProps {
  bets: Bet[];
  onRemoveBet: (betId: string) => void;
  onClearAll: () => void;
  onPlaceBet: (bets: Bet[]) => Promise<void>;
  balance: number;
  gasEstimate: number;
}

export const BetSlip: React.FC<BetSlipProps> = ({
  bets,
  onRemoveBet,
  onClearAll,
  onPlaceBet,
  balance,
  gasEstimate
}) => {
  const [stakes, setStakes] = useState<Record<string, number>>({});
  const [betType, setBetType] = useState<'single' | 'parlay'>('single');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Quick stake amounts
  const quickStakes = [10, 25, 50, 100];

  const handleStakeChange = (betId: string, amount: number) => {
    setStakes(prev => ({ ...prev, [betId]: amount }));
  };

  const handleQuickStake = (betId: string, amount: number) => {
    setStakes(prev => ({ ...prev, [betId]: amount }));
  };

  const calculateReturns = (bet: Bet) => {
    const stake = stakes[bet.id] || 0;
    const totalReturn = stake * bet.odds;
    const profit = totalReturn - stake;
    return { totalReturn, profit };
  };

  const calculateParlayReturns = () => {
    if (bets.length < 2) return { totalReturn: 0, profit: 0, combinedOdds: 0 };

    const parlayStake = stakes['parlay'] || 0;
    const combinedOdds = bets.reduce((acc, bet) => acc * bet.odds, 1);
    const totalReturn = parlayStake * combinedOdds;
    const profit = totalReturn - parlayStake;

    return { totalReturn, profit, combinedOdds };
  };

  const getTotalStake = () => {
    if (betType === 'parlay') {
      return stakes['parlay'] || 0;
    }
    return Object.values(stakes).reduce((sum, stake) => sum + stake, 0);
  };

  const canPlaceBet = () => {
    const totalStake = getTotalStake();
    return totalStake > 0 && totalStake + gasEstimate <= balance;
  };

  const handleSubmit = async () => {
    if (!canPlaceBet()) return;

    setIsSubmitting(true);
    try {
      const betsWithStakes = bets.map(bet => ({
        ...bet,
        stake: betType === 'parlay' ? stakes['parlay'] : stakes[bet.id]
      }));

      await onPlaceBet(betsWithStakes);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setStakes({});
      }, 3000);
    } catch (error) {
      console.error('Bet placement failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatOdds = (odds: number, format: 'decimal' | 'american' | 'fractional') => {
    switch (format) {
      case 'american':
        return odds >= 2.0 ? `+${Math.round((odds - 1) * 100)}` : `-${Math.round(100 / (odds - 1))}`;
      case 'fractional':
        const numerator = Math.round((odds - 1) * 100);
        return `${numerator}/100`;
      default:
        return odds.toFixed(2);
    }
  };

  const getImpliedProbability = (odds: number) => {
    return ((1 / odds) * 100).toFixed(1);
  };

  if (bets.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <div className="text-center py-8">
          <div className="text-gray-400 dark:text-gray-600 mb-2">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Your bet slip is empty</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Tap on odds to build your bet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Bet Slip ({bets.length})
          </h3>
          {bets.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Bet Type Toggle (shows if 2+ selections) */}
        {bets.length >= 2 && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setBetType('single')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                betType === 'single'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Single Bets
            </button>
            <button
              onClick={() => setBetType('parlay')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                betType === 'parlay'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Parlay
            </button>
          </div>
        )}
      </div>

      {/* Bet List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800 max-h-96 overflow-y-auto">
        {betType === 'single' ? (
          bets.map(bet => {
            const { totalReturn, profit } = calculateReturns(bet);
            return (
              <div key={bet.id} className="p-4">
                {/* Bet Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{bet.matchInfo || bet.market}</p>
                    <p className="font-semibold text-gray-900 dark:text-white mt-1">{bet.selection}</p>
                  </div>
                  <button
                    onClick={() => onRemoveBet(bet.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Odds Display */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatOdds(bet.odds, bet.oddsFormat)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {getImpliedProbability(bet.odds)}% probability
                  </span>
                </div>

                {/* Quick Stakes */}
                <div className="flex gap-2 mb-3">
                  {quickStakes.map(amount => (
                    <button
                      key={amount}
                      onClick={() => handleQuickStake(bet.id, amount)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        stakes[bet.id] === amount
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                {/* Custom Stake Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stake
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={stakes[bet.id] || ''}
                      onChange={(e) => handleStakeChange(bet.id, parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Returns Display */}
                {stakes[bet.id] > 0 && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Potential Return:</span>
                      <span className="font-bold text-green-700 dark:text-green-400">
                        ${totalReturn.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Potential Profit:</span>
                      <span className="font-semibold text-green-600 dark:text-green-500">
                        ${profit.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          /* Parlay View */
          <div className="p-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  PARLAY ({bets.length} legs)
                </span>
              </div>

              {/* Parlay Legs */}
              <div className="space-y-2 mb-4">
                {bets.map(bet => (
                  <div key={bet.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{bet.selection}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{bet.matchInfo}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {formatOdds(bet.odds, bet.oddsFormat)}
                      </span>
                      <button
                        onClick={() => onRemoveBet(bet.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Combined Odds */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Combined Odds:</span>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {calculateParlayReturns().combinedOdds.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Parlay Stake Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Parlay Stake
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={stakes['parlay'] || ''}
                    onChange={(e) => handleStakeChange('parlay', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Parlay Returns */}
              {stakes['parlay'] > 0 && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Potential Return:</span>
                    <span className="font-bold text-green-700 dark:text-green-400">
                      ${calculateParlayReturns().totalReturn.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Potential Profit:</span>
                    <span className="font-semibold text-green-600 dark:text-green-500">
                      ${calculateParlayReturns().profit.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer - Summary & Submit */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-3">
        {/* Balance & Gas */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Your Balance:</span>
            <span className="font-medium">${balance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Total Stake:</span>
            <span className="font-medium">${getTotalStake().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500 dark:text-gray-500 text-xs">
            <span>Estimated Gas Fee:</span>
            <span>~${gasEstimate.toFixed(2)}</span>
          </div>
        </div>

        {/* Insufficient Balance Warning */}
        {getTotalStake() + gasEstimate > balance && getTotalStake() > 0 && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-900 dark:text-amber-200">Insufficient Balance</p>
              <p className="text-amber-700 dark:text-amber-300 mt-1">
                You need ${(getTotalStake() + gasEstimate - balance).toFixed(2)} more to place this bet
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!canPlaceBet() || isSubmitting}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
            canPlaceBet() && !isSubmitting
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Placing Bet...
            </div>
          ) : showSuccess ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Bet Placed!
            </div>
          ) : (
            `Place Bet${bets.length > 1 && betType === 'single' ? 's' : ''}`
          )}
        </button>

        {/* Risk Warning */}
        {getTotalStake() > 0 && (
          <p className="text-xs text-center text-gray-500 dark:text-gray-500">
            You are risking ${getTotalStake().toFixed(2)} on this bet
          </p>
        )}
      </div>
    </div>
  );
};
