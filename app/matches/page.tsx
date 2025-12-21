'use client';

import { useState, useMemo } from 'react';
import { matches, teams, groups, mockMarkets } from '@/lib/data/mock-data';
import { useBetSlipStore } from '@/lib/store/bet-slip-store';
import { format, differenceInDays } from 'date-fns';
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  TrophyIcon,
  FilterIcon,
  ChevronRightIcon,
  StarIcon,
  FlameIcon,
  GlobeIcon,
} from 'lucide-react';
import Image from 'next/image';

type GroupKey = 'A' | 'B' | 'C' | 'D' | 'all';
type StageFilter = 'all' | 'group' | 'super8' | 'semi' | 'final';
type ViewMode = 'list' | 'calendar';

// Stage configuration
const stageConfig = {
  group: { label: 'Group Stage', color: 'bg-blue-500', dates: 'Feb 7-20' },
  super8: { label: 'Super 8', color: 'bg-purple-500', dates: 'Feb 21 - Mar 1' },
  semi: { label: 'Semi Finals', color: 'bg-orange-500', dates: 'Mar 4-5' },
  final: { label: 'Final', color: 'bg-yellow-500', dates: 'Mar 8' },
};

// Venue country mapping
const venueCountryFlag: Record<string, string> = {
  India: '🇮🇳',
  'Sri Lanka': '🇱🇰',
};

export default function MatchesPage() {
  const [selectedGroup, setSelectedGroup] = useState<GroupKey>('all');
  const [selectedStage, setSelectedStage] = useState<StageFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const addItem = useBetSlipStore((state) => state.addItem);

  // Tournament stats
  const tournamentStats = useMemo(() => {
    const groupMatches = matches.filter((m) => m.matchType === 'group').length;
    const super8Matches = matches.filter((m) => m.matchType === 'super8').length;
    const knockoutMatches = matches.filter((m) => m.matchType === 'semi' || m.matchType === 'final').length;
    return { total: matches.length, groupMatches, super8Matches, knockoutMatches };
  }, []);

  // Featured match (India vs Pakistan)
  const featuredMatch = useMemo(() => {
    return matches.find(
      (m) =>
        (m.team1.code === 'IND' && m.team2.code === 'PAK') ||
        (m.team1.code === 'PAK' && m.team2.code === 'IND')
    );
  }, []);

  // Filter matches
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      if (selectedStage !== 'all' && match.matchType !== selectedStage) {
        return false;
      }
      if (selectedGroup !== 'all' && match.matchType === 'group') {
        const groupTeams = groups[selectedGroup];
        const team1InGroup = groupTeams.includes(match.team1.code);
        const team2InGroup = groupTeams.includes(match.team2.code);
        if (!team1InGroup && !team2InGroup) {
          return false;
        }
      }
      return true;
    });
  }, [selectedGroup, selectedStage]);

  // Sort by date
  const sortedMatches = useMemo(() => {
    return [...filteredMatches].sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }, [filteredMatches]);

  // Group matches by date
  const matchesByDate = useMemo(() => {
    return sortedMatches.reduce((acc, match) => {
      const dateKey = format(new Date(match.startTime), 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(match);
      return acc;
    }, {} as Record<string, typeof matches>);
  }, [sortedMatches]);

  // Find market for a match
  const findMarketForMatch = (matchId: number) => {
    return mockMarkets.find((m) => m.matchId === matchId);
  };

  const handleBetClick = (matchId: number, teamCode: string) => {
    const market = findMarketForMatch(matchId);
    if (market) {
      const outcome = market.outcomes.find((o) => o.metadata?.teamCode === teamCode);
      if (outcome) {
        addItem(market, outcome.id);
      }
    }
  };

  const daysUntilStart = differenceInDays(new Date('2026-02-07'), new Date());

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-ton-blue via-blue-600 to-ton-darkblue rounded-2xl p-8 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">ICC T20 World Cup 2026</h1>
              <p className="text-blue-100 text-lg mb-4">
                India & Sri Lanka • February 7 - March 8, 2026
              </p>

              {/* Tournament Progress */}
              <div className="flex flex-wrap gap-3 mb-6">
                {Object.entries(stageConfig).map(([key, config]) => (
                  <div
                    key={key}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      selectedStage === key
                        ? 'bg-white text-gray-900'
                        : 'bg-white/20 hover:bg-white/30 cursor-pointer'
                    }`}
                    onClick={() => setSelectedStage(key as StageFilter)}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full ${config.color} mr-2`} />
                    {config.label}
                    <span className="text-xs opacity-75 ml-1">({config.dates})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">{tournamentStats.total}</div>
                <div className="text-sm text-blue-100">Total Matches</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">20</div>
                <div className="text-sm text-blue-100">Teams</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm text-blue-100">Venues</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">{daysUntilStart > 0 ? daysUntilStart : 0}</div>
                <div className="text-sm text-blue-100">Days to Go</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Match - India vs Pakistan */}
      {featuredMatch && selectedStage === 'all' && (
        <div className="bg-gradient-to-r from-orange-500 via-white to-green-600 p-1 rounded-2xl">
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FlameIcon className="w-5 h-5 text-orange-500" />
              <span className="text-orange-500 font-bold text-sm uppercase tracking-wide">
                Featured Match
              </span>
              <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            </div>

            <div className="flex items-center justify-between">
              {/* Team 1 */}
              <div className="flex items-center gap-4">
                <Image
                  src={featuredMatch.team1.flagUrl}
                  alt={featuredMatch.team1.name}
                  width={64}
                  height={48}
                  className="rounded-lg shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white">{featuredMatch.team1.name}</h3>
                  <span className="text-gray-400">{featuredMatch.team1.code}</span>
                </div>
              </div>

              {/* Match Info */}
              <div className="text-center px-8">
                <div className="text-4xl font-bold text-white mb-2">VS</div>
                <div className="text-sm text-gray-400">
                  {format(new Date(featuredMatch.startTime), 'MMM d, yyyy')}
                </div>
                <div className="text-sm text-gray-400">
                  {format(new Date(featuredMatch.startTime), 'HH:mm')} UTC
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center justify-center gap-1">
                  <MapPinIcon className="w-3 h-3" />
                  {featuredMatch.venue}
                </div>
              </div>

              {/* Team 2 */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <h3 className="text-2xl font-bold text-white">{featuredMatch.team2.name}</h3>
                  <span className="text-gray-400">{featuredMatch.team2.code}</span>
                </div>
                <Image
                  src={featuredMatch.team2.flagUrl}
                  alt={featuredMatch.team2.name}
                  width={64}
                  height={48}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-center">
              <button className="px-6 py-2 bg-ton-blue hover:bg-blue-600 text-white rounded-lg font-medium transition flex items-center gap-2">
                View Betting Markets
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FilterIcon className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-700">Filter Matches</span>
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredMatches.length} of {matches.length} matches
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          {/* Stage Filter */}
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium">Stage</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStage('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedStage === 'all'
                    ? 'bg-ton-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Stages
              </button>
              {Object.entries(stageConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setSelectedStage(key as StageFilter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                    selectedStage === key
                      ? 'bg-ton-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${config.color}`} />
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          {/* Group Filter - Only show for group stage */}
          {(selectedStage === 'all' || selectedStage === 'group') && (
            <div>
              <label className="block text-sm text-gray-600 mb-2 font-medium">Group</label>
              <div className="flex gap-2">
                {(['all', 'A', 'B', 'C', 'D'] as const).map((group) => (
                  <button
                    key={group}
                    onClick={() => setSelectedGroup(group)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedGroup === group
                        ? 'bg-ton-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {group === 'all' ? 'All Groups' : `Group ${group}`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Groups Overview - Only show when viewing all or group stage */}
      {(selectedStage === 'all' || selectedStage === 'group') && selectedGroup === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.entries(groups) as [string, string[]][]).map(([group, teamCodes]) => (
            <div
              key={group}
              className={`bg-white rounded-xl border-2 p-4 cursor-pointer transition hover:shadow-lg ${
                selectedGroup === group
                  ? 'border-ton-blue shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedGroup(group as GroupKey)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">Group {group}</h3>
                <span className="text-xs text-gray-500">5 Teams</span>
              </div>
              <div className="space-y-2">
                {teamCodes.map((code) => {
                  const team = teams.find((t) => t.code === code);
                  return team ? (
                    <div key={code} className="flex items-center gap-2 text-sm">
                      <Image
                        src={team.flagUrl}
                        alt={team.name}
                        width={24}
                        height={18}
                        className="rounded-sm shadow-sm"
                      />
                      <span className="flex-1">{team.name}</span>
                      <span className="text-xs text-gray-400">#{team.ranking}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Matches List */}
      <div className="space-y-8">
        {Object.entries(matchesByDate).map(([dateKey, dateMatches]) => {
          const matchDate = new Date(dateKey);
          const isWeekend = matchDate.getDay() === 0 || matchDate.getDay() === 6;

          return (
            <div key={dateKey}>
              {/* Date Header */}
              <div className="flex items-center gap-3 mb-4 sticky top-16 bg-gradient-to-r from-slate-50 to-blue-50 py-2 z-10">
                <div className={`p-2 rounded-lg ${isWeekend ? 'bg-ton-blue' : 'bg-gray-200'}`}>
                  <CalendarIcon className={`w-5 h-5 ${isWeekend ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {format(matchDate, 'EEEE, MMMM d, yyyy')}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {dateMatches.length} match{dateMatches.length > 1 ? 'es' : ''}
                  </span>
                </div>
              </div>

              {/* Match Cards */}
              <div className="grid gap-4">
                {dateMatches.map((match) => {
                  const market = findMarketForMatch(match.id);
                  const team1Odds = market?.outcomes.find(
                    (o) => o.metadata?.teamCode === match.team1.code
                  );
                  const team2Odds = market?.outcomes.find(
                    (o) => o.metadata?.teamCode === match.team2.code
                  );
                  const stageInfo = stageConfig[match.matchType as keyof typeof stageConfig];
                  const isHighlight =
                    (match.team1.code === 'IND' && match.team2.code === 'PAK') ||
                    (match.team1.code === 'PAK' && match.team2.code === 'IND') ||
                    match.matchType === 'final';

                  return (
                    <div
                      key={match.id}
                      className={`bg-white rounded-xl border overflow-hidden hover:shadow-lg transition ${
                        isHighlight
                          ? 'border-2 border-yellow-400 shadow-yellow-100'
                          : 'border-gray-200'
                      }`}
                    >
                      {/* Match Header */}
                      <div
                        className={`px-4 py-2.5 flex items-center justify-between border-b ${
                          isHighlight
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                            : 'bg-gray-50 border-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${stageInfo?.color || 'bg-gray-500'}`}
                          >
                            #{match.matchNumber}
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            {stageInfo?.label || match.matchType}
                          </span>
                          {match.matchType === 'final' && (
                            <TrophyIcon className="w-4 h-4 text-yellow-500" />
                          )}
                          {isHighlight && match.matchType !== 'final' && (
                            <FlameIcon className="w-4 h-4 text-orange-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <ClockIcon className="w-4 h-4" />
                            <span className="font-medium">
                              {format(new Date(match.startTime), 'HH:mm')} UTC
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Match Content */}
                      <div className="p-5">
                        <div className="flex items-center justify-between">
                          {/* Team 1 */}
                          <div className="flex-1">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <Image
                                  src={match.team1.flagUrl}
                                  alt={match.team1.name}
                                  width={48}
                                  height={36}
                                  className="rounded-lg shadow"
                                />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">
                                  {match.team1.name}
                                </h3>
                                <span className="text-sm text-gray-500">
                                  Rank #{match.team1.ranking}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Odds */}
                          <div className="flex items-center gap-4 px-6">
                            {team1Odds ? (
                              <button
                                onClick={() => handleBetClick(match.id, match.team1.code)}
                                className="min-w-[90px] py-3 px-4 bg-gradient-to-b from-gray-50 to-gray-100 hover:from-ton-blue hover:to-blue-600 hover:text-white border border-gray-200 hover:border-ton-blue rounded-xl transition text-center group"
                              >
                                <div className="text-2xl font-bold text-gray-900 group-hover:text-white">
                                  {team1Odds.odds.toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-500 group-hover:text-blue-100">
                                  {team1Odds.impliedProbability.toFixed(0)}% chance
                                </div>
                              </button>
                            ) : (
                              <div className="min-w-[90px] py-3 px-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center">
                                <div className="text-lg font-bold text-gray-400">TBD</div>
                                <div className="text-xs text-gray-400">Odds pending</div>
                              </div>
                            )}

                            <div className="text-xl font-bold text-gray-300">VS</div>

                            {team2Odds ? (
                              <button
                                onClick={() => handleBetClick(match.id, match.team2.code)}
                                className="min-w-[90px] py-3 px-4 bg-gradient-to-b from-gray-50 to-gray-100 hover:from-ton-blue hover:to-blue-600 hover:text-white border border-gray-200 hover:border-ton-blue rounded-xl transition text-center group"
                              >
                                <div className="text-2xl font-bold text-gray-900 group-hover:text-white">
                                  {team2Odds.odds.toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-500 group-hover:text-blue-100">
                                  {team2Odds.impliedProbability.toFixed(0)}% chance
                                </div>
                              </button>
                            ) : (
                              <div className="min-w-[90px] py-3 px-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center">
                                <div className="text-lg font-bold text-gray-400">TBD</div>
                                <div className="text-xs text-gray-400">Odds pending</div>
                              </div>
                            )}
                          </div>

                          {/* Team 2 */}
                          <div className="flex-1 text-right">
                            <div className="flex items-center justify-end gap-4">
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">
                                  {match.team2.name}
                                </h3>
                                <span className="text-sm text-gray-500">
                                  Rank #{match.team2.ranking}
                                </span>
                              </div>
                              <div className="relative">
                                <Image
                                  src={match.team2.flagUrl}
                                  alt={match.team2.name}
                                  width={48}
                                  height={36}
                                  className="rounded-lg shadow"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Venue */}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPinIcon className="w-4 h-4 text-gray-400" />
                            <span>{match.venue}</span>
                            <span className="text-gray-300">•</span>
                            <span className="flex items-center gap-1">
                              <span>{venueCountryFlag[match.country]}</span>
                              {match.city}, {match.country}
                            </span>
                          </div>
                          {market && (
                            <button className="text-sm text-ton-blue hover:text-blue-700 font-medium flex items-center gap-1">
                              View all markets
                              <ChevronRightIcon className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredMatches.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <GlobeIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No matches found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more matches</p>
          <button
            onClick={() => {
              setSelectedStage('all');
              setSelectedGroup('all');
            }}
            className="mt-4 px-4 py-2 bg-ton-blue text-white rounded-lg hover:bg-blue-600 transition"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Tournament Summary Footer */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-lg mb-4">Tournament Format</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{tournamentStats.groupMatches}</div>
            <div className="text-sm text-gray-600">Group Stage Matches</div>
            <div className="text-xs text-gray-400 mt-1">Feb 7 - Feb 20</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{tournamentStats.super8Matches}</div>
            <div className="text-sm text-gray-600">Super 8 Matches</div>
            <div className="text-xs text-gray-400 mt-1">Feb 21 - Mar 1</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <div className="text-sm text-gray-600">Semi Finals</div>
            <div className="text-xs text-gray-400 mt-1">Mar 4 - 5</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-gray-600">Grand Final</div>
            <div className="text-xs text-gray-400 mt-1">Mar 8, Ahmedabad</div>
          </div>
        </div>
      </div>
    </div>
  );
}
