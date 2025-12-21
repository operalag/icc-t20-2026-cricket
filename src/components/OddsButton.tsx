import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Lock } from 'lucide-react';

export type OddsFormat = 'decimal' | 'american' | 'fractional';

interface OddsButtonProps {
  odds: number;
  format?: OddsFormat;
  label: string;
  isSelected?: boolean;
  isSuspended?: boolean;
  previousOdds?: number;
  onClick?: () => void;
  showProbability?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const OddsButton: React.FC<OddsButtonProps> = ({
  odds,
  format = 'decimal',
  label,
  isSelected = false,
  isSuspended = false,
  previousOdds,
  onClick,
  showProbability = true,
  size = 'md'
}) => {
  const [showMovement, setShowMovement] = useState(false);
  const [movement, setMovement] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (previousOdds && previousOdds !== odds) {
      setMovement(odds > previousOdds ? 'up' : 'down');
      setShowMovement(true);

      const timer = setTimeout(() => {
        setShowMovement(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [odds, previousOdds]);

  const formatOdds = (odds: number, format: OddsFormat): string => {
    switch (format) {
      case 'american':
        if (odds >= 2.0) {
          return `+${Math.round((odds - 1) * 100)}`;
        } else {
          return `-${Math.round(100 / (odds - 1))}`;
        }
      case 'fractional':
        const decimalPart = odds - 1;
        const denominator = 100;
        const numerator = Math.round(decimalPart * denominator);

        // Simplify fraction
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(numerator, denominator);

        return `${numerator / divisor}/${denominator / divisor}`;
      case 'decimal':
      default:
        return odds.toFixed(2);
    }
  };

  const getImpliedProbability = (odds: number): string => {
    return ((1 / odds) * 100).toFixed(0);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          button: 'py-2 px-3 min-w-[80px]',
          odds: 'text-base',
          label: 'text-xs',
          probability: 'text-xs'
        };
      case 'lg':
        return {
          button: 'py-4 px-6 min-w-[140px]',
          odds: 'text-3xl',
          label: 'text-base',
          probability: 'text-sm'
        };
      case 'md':
      default:
        return {
          button: 'py-3 px-4 min-w-[100px]',
          odds: 'text-xl',
          label: 'text-sm',
          probability: 'text-xs'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  if (isSuspended) {
    return (
      <button
        disabled
        className={`${sizeClasses.button} rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 cursor-not-allowed flex flex-col items-center justify-center opacity-60 transition-all`}
      >
        <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400 mb-1" />
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Suspended</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses.button} rounded-lg border-2 transition-all transform active:scale-95 flex flex-col items-center justify-center relative overflow-hidden ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-400 hover:shadow-md'
      }`}
    >
      {/* Movement Indicator Flash */}
      {showMovement && (
        <div
          className={`absolute inset-0 animate-pulse ${
            movement === 'up'
              ? 'bg-green-100 dark:bg-green-900/30'
              : 'bg-red-100 dark:bg-red-900/30'
          }`}
        />
      )}

      {/* Label */}
      <span className={`${sizeClasses.label} text-gray-600 dark:text-gray-400 font-medium mb-1 relative z-10`}>
        {label}
      </span>

      {/* Odds Display */}
      <div className="flex items-center gap-1.5 relative z-10">
        <span className={`${sizeClasses.odds} font-bold text-gray-900 dark:text-white tabular-nums`}>
          {formatOdds(odds, format)}
        </span>

        {/* Movement Arrow */}
        {showMovement && movement && (
          <div className="animate-bounce">
            {movement === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-500" />
            )}
          </div>
        )}
      </div>

      {/* Implied Probability */}
      {showProbability && (
        <span className={`${sizeClasses.probability} text-gray-500 dark:text-gray-500 mt-1 relative z-10`}>
          {getImpliedProbability(odds)}% probability
        </span>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full z-20" />
      )}
    </button>
  );
};

// Multi-odds display for match winner markets
interface OddsGroupProps {
  options: Array<{
    label: string;
    odds: number;
    previousOdds?: number;
    id: string;
  }>;
  format?: OddsFormat;
  selectedId?: string;
  onSelect?: (id: string) => void;
  isSuspended?: boolean;
}

export const OddsGroup: React.FC<OddsGroupProps> = ({
  options,
  format = 'decimal',
  selectedId,
  onSelect,
  isSuspended = false
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map(option => (
        <OddsButton
          key={option.id}
          odds={option.odds}
          format={format}
          label={option.label}
          previousOdds={option.previousOdds}
          isSelected={selectedId === option.id}
          isSuspended={isSuspended}
          onClick={() => onSelect?.(option.id)}
          showProbability={true}
          size="md"
        />
      ))}
    </div>
  );
};

// Compact odds display for lists
interface CompactOddsProps {
  odds: number;
  format?: OddsFormat;
  previousOdds?: number;
  onClick?: () => void;
}

export const CompactOdds: React.FC<CompactOddsProps> = ({
  odds,
  format = 'decimal',
  previousOdds,
  onClick
}) => {
  const [movement, setMovement] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (previousOdds && previousOdds !== odds) {
      setMovement(odds > previousOdds ? 'up' : 'down');
      const timer = setTimeout(() => setMovement(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [odds, previousOdds]);

  const formatOdds = (odds: number, format: OddsFormat): string => {
    switch (format) {
      case 'american':
        return odds >= 2.0 ? `+${Math.round((odds - 1) * 100)}` : `-${Math.round(100 / (odds - 1))}`;
      case 'fractional':
        const decimalPart = odds - 1;
        return `${Math.round(decimalPart * 100)}/100`;
      default:
        return odds.toFixed(2);
    }
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold text-sm transition-all ${
        movement === 'up'
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
          : movement === 'down'
          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <span className="tabular-nums">{formatOdds(odds, format)}</span>
      {movement && (
        movement === 'up' ? (
          <TrendingUp className="w-3.5 h-3.5" />
        ) : (
          <TrendingDown className="w-3.5 h-3.5" />
        )
      )}
    </button>
  );
};
