import React from 'react';
import { ChevronRight, Star, Clock, MapPin } from 'lucide-react';
import { CompactOdds } from './OddsButton';

interface Team {
  name: string;
  code: string;
  flag: string;
}

interface MatchOdds {
  team1: number;
  team2: number;
  previousTeam1?: number;
  previousTeam2?: number;
}

interface MatchCardProps {
  team1: Team;
  team2: Team;
  venue: string;
  date: string;
  time: string;
  tournamentStage: string;
  odds: MatchOdds;
  totalMarkets: number;
  onSelectOdds?: (team: 'team1' | 'team2') => void;
  onViewMarkets?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  isLive?: boolean;
  liveScore?: {
    team1Score: string;
    team2Score: string;
    status: string;
  };
}

export const MatchCard: React.FC<MatchCardProps> = ({
  team1,
  team2,
  venue,
  date,
  time,
  tournamentStage,
  odds,
  totalMarkets,
  onSelectOdds,
  onViewMarkets,
  isFavorite = false,
  onToggleFavorite,
  isLive = false,
  liveScore
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {isLive && (
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold text-red-600 dark:text-red-500 uppercase">Live</span>
            </div>
          )}
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {tournamentStage}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
          className="text-gray-400 hover:text-yellow-500 transition-colors"
        >
          <Star
            className={`w-4 h-4 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`}
          />
        </button>
      </div>

      {/* Match Info */}
      <div className="p-4">
        {/* Teams */}
        <div className="space-y-3 mb-4">
          {/* Team 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-3xl">{team1.flag}</span>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {team1.name}
                </h3>
                {isLive && liveScore && (
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {liveScore.team1Score}
                  </p>
                )}
              </div>
            </div>

            <CompactOdds
              odds={odds.team1}
              previousOdds={odds.previousTeam1}
              onClick={() => onSelectOdds?.('team1')}
            />
          </div>

          {/* VS Divider */}
          <div className="flex items-center justify-center">
            <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
            <span className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400">vs</span>
            <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-3xl">{team2.flag}</span>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {team2.name}
                </h3>
                {isLive && liveScore && (
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {liveScore.team2Score}
                  </p>
                )}
              </div>
            </div>

            <CompactOdds
              odds={odds.team2}
              previousOdds={odds.previousTeam2}
              onClick={() => onSelectOdds?.('team2')}
            />
          </div>
        </div>

        {/* Live Status */}
        {isLive && liveScore && (
          <div className="mb-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-center font-medium text-blue-900 dark:text-blue-200">
              {liveScore.status}
            </p>
          </div>
        )}

        {/* Match Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{date} • {time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{venue}</span>
          </div>
        </div>

        {/* View More Markets */}
        <button
          onClick={onViewMarkets}
          className="w-full py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
        >
          <span>+{totalMarkets} More Markets</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Compact version for lists
export const CompactMatchCard: React.FC<MatchCardProps> = ({
  team1,
  team2,
  date,
  time,
  odds,
  onSelectOdds,
  onViewMarkets,
  isLive = false
}) => {
  return (
    <button
      onClick={onViewMarkets}
      className="w-full bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-3 transition-all"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Teams */}
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            {isLive && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {team1.flag} {team1.code} vs {team2.flag} {team2.code}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {date} • {time}
          </p>
        </div>

        {/* Odds */}
        <div className="flex items-center gap-2">
          <CompactOdds
            odds={odds.team1}
            onClick={() => onSelectOdds?.('team1')}
          />
          <CompactOdds
            odds={odds.team2}
            onClick={() => onSelectOdds?.('team2')}
          />
        </div>
      </div>
    </button>
  );
};

// Featured Match - Hero style
export const FeaturedMatchCard: React.FC<MatchCardProps> = ({
  team1,
  team2,
  venue,
  date,
  time,
  tournamentStage,
  odds,
  totalMarkets,
  onSelectOdds,
  onViewMarkets,
  isLive = false
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAyMGMtNC40MTggMC04LTMuNTgyLTgtOHMzLjU4Mi04IDgtOCA4IDMuNTgyIDggOC0zLjU4MiA4LTggOHoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+')]"></div>
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {isLive && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
                <span className="text-xs font-bold text-white uppercase">Live Now</span>
              </div>
            )}
          </div>
          <span className="text-sm font-medium text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            {tournamentStage}
          </span>
        </div>

        {/* Teams */}
        <div className="space-y-4 mb-6">
          {/* Team 1 */}
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{team1.flag}</span>
              <h3 className="font-bold text-2xl text-white">{team1.name}</h3>
            </div>
            <button
              onClick={() => onSelectOdds?.('team1')}
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-xl px-6 py-3 rounded-lg transition-colors min-w-[100px] text-center"
            >
              {odds.team1.toFixed(2)}
            </button>
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{team2.flag}</span>
              <h3 className="font-bold text-2xl text-white">{team2.name}</h3>
            </div>
            <button
              onClick={() => onSelectOdds?.('team2')}
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-xl px-6 py-3 rounded-lg transition-colors min-w-[100px] text-center"
            >
              {odds.team2.toFixed(2)}
            </button>
          </div>
        </div>

        {/* Match Details */}
        <div className="space-y-2 mb-6 text-white/90">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{date} • {time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{venue}</span>
          </div>
        </div>

        {/* View Markets Button */}
        <button
          onClick={onViewMarkets}
          className="w-full py-4 bg-white hover:bg-gray-100 rounded-xl flex items-center justify-center gap-2 font-bold text-gray-900 transition-colors"
        >
          <span>View All {totalMarkets} Markets</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
