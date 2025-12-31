'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { matches, teams, groups, mockMarkets } from '@/lib/data/mock-data';
import { useTradeSlipStore } from '@/lib/store/trade-slip-store';
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
  PlayIcon,
  UsersIcon,
  MapIcon,
} from 'lucide-react';
import Image from 'next/image';

type GroupKey = 'A' | 'B' | 'C' | 'D' | 'all';
type StageFilter = 'all' | 'group' | 'super8' | 'semi' | 'final';

// Stage configuration
const stageConfig = {
  group: { label: 'Group Stage', color: 'bg-blue-500', textColor: 'text-blue-500', dates: 'Feb 7-20', gradient: 'from-blue-500 to-blue-600' },
  super8: { label: 'Super 8', color: 'bg-purple-500', textColor: 'text-purple-500', dates: 'Feb 21 - Mar 1', gradient: 'from-purple-500 to-purple-600' },
  semi: { label: 'Semi Finals', color: 'bg-orange-500', textColor: 'text-orange-500', dates: 'Mar 4-5', gradient: 'from-orange-500 to-orange-600' },
  final: { label: 'Final', color: 'bg-yellow-500', textColor: 'text-yellow-500', dates: 'Mar 8', gradient: 'from-yellow-500 to-yellow-600' },
};

// Venue country mapping
const venueCountryFlag: Record<string, string> = {
  India: '🇮🇳',
  'Sri Lanka': '🇱🇰',
};

export default function MatchesPage() {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = useState<GroupKey>('all');
  const [selectedStage, setSelectedStage] = useState<StageFilter>('all');
  const [scrollY, setScrollY] = useState(0);
  const addItem = useTradeSlipStore((state) => state.addItem);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleOutcomeClick = (matchId: number, teamCode?: string) => {
    const market = findMarketForMatch(matchId);
    if (market) {
      if (teamCode) {
        const outcome = market.outcomes.find((o) => o.metadata?.teamCode === teamCode);
        if (outcome) {
          addItem(market, outcome.id);
        }
      }
      router.push(`/markets/${market.id}`);
    }
  };

  const daysUntilStart = differenceInDays(new Date('2026-02-07'), new Date());

  return (
    <div className="min-h-screen -mt-6 -mx-4 md:-mx-0">
      {/* ===== HERO SECTION WITH STADIUM IMAGE ===== */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 scale-110"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image
            src="/images/cricket4.jpg"
            alt="Cricket Stadium"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-ton-blue/30 to-transparent" />
        </div>

        {/* Floating Cricket Ball Decoration */}
        <div className="absolute top-20 right-10 w-24 h-24 opacity-20 animate-pulse hidden lg:block">
          <Image
            src="/images/cricket1.jpg"
            alt="Cricket Ball"
            fill
            className="object-cover rounded-full"
          />
        </div>

        {/* Hero Content */}
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <TrophyIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">ICC Official Tournament</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
              T20 World Cup
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
                2026
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl">
              India & Sri Lanka host the biggest cricket spectacle.
              <span className="text-yellow-400 font-semibold"> 20 nations. 55 matches. One champion.</span>
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <PlayIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{tournamentStats.total}</div>
                  <div className="text-sm text-white/60">Matches</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <UsersIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">20</div>
                  <div className="text-sm text-white/60">Teams</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <MapIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-sm text-white/60">Venues</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{daysUntilStart > 0 ? daysUntilStart : 0}</div>
                  <div className="text-sm text-white/60">Days to Go</div>
                </div>
              </div>
            </div>

            {/* Date Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <CalendarIcon className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">February 7 - March 8, 2026</span>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container mx-auto px-4 max-w-7xl -mt-16 relative z-10">

        {/* ===== STAGE NAVIGATION PILLS ===== */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setSelectedStage('all')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                selectedStage === 'all'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Matches
            </button>
            {Object.entries(stageConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedStage(key as StageFilter)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  selectedStage === key
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${selectedStage === key ? 'bg-white' : config.color}`} />
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== FEATURED MATCH - INDIA VS PAKISTAN ===== */}
        {featuredMatch && selectedStage === 'all' && (
          <div className="relative mb-12 group">
            {/* Background Image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <Image
                src="/images/cricket3.jpg"
                alt="Stadium Sunset"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60" />
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-12">
              {/* Badge */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                  <FlameIcon className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-bold uppercase tracking-wide">Featured Match</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Match Display */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Team 1 - India */}
                <div className="flex items-center gap-6 flex-1">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-orange-400 shadow-2xl shadow-orange-500/30">
                      <Image
                        src={featuredMatch.team1.flagUrl}
                        alt={featuredMatch.team1.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      #{featuredMatch.team1.ranking}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-white">{featuredMatch.team1.name}</h3>
                    <span className="text-orange-400 font-semibold">{featuredMatch.team1.code}</span>
                  </div>
                </div>

                {/* VS Badge */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-orange-500/50">
                    <span className="text-2xl font-black text-white">VS</span>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-white font-bold text-lg">
                      {format(new Date(featuredMatch.startTime), 'MMM d, yyyy')}
                    </div>
                    <div className="text-white/60 text-sm">
                      {format(new Date(featuredMatch.startTime), 'HH:mm')} UTC
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-2 text-white/50 text-xs">
                      <MapPinIcon className="w-3 h-3" />
                      {featuredMatch.venue}
                    </div>
                  </div>
                </div>

                {/* Team 2 - Pakistan */}
                <div className="flex items-center gap-6 flex-1 justify-end">
                  <div className="text-right">
                    <h3 className="text-3xl md:text-4xl font-black text-white">{featuredMatch.team2.name}</h3>
                    <span className="text-green-400 font-semibold">{featuredMatch.team2.code}</span>
                  </div>
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-green-400 shadow-2xl shadow-green-500/30">
                      <Image
                        src={featuredMatch.team2.flagUrl}
                        alt={featuredMatch.team2.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      #{featuredMatch.team2.ranking}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => handleOutcomeClick(featuredMatch.id)}
                  className="px-8 py-4 bg-gradient-to-r from-ton-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center gap-3"
                >
                  <TrophyIcon className="w-5 h-5" />
                  Place Your Prediction
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== ACTION SHOT DIVIDER ===== */}
        <div className="relative h-48 rounded-2xl overflow-hidden mb-12 group">
          <Image
            src="/images/cricket6.jpg"
            alt="Cricket Action"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ton-blue/90 via-ton-blue/70 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 md:px-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                {filteredMatches.length} Matches
              </h2>
              <p className="text-white/80 text-lg">
                {selectedStage === 'all' ? 'Across all tournament stages' : stageConfig[selectedStage]?.label}
              </p>
            </div>
          </div>
        </div>

        {/* ===== GROUPS OVERVIEW ===== */}
        {(selectedStage === 'all' || selectedStage === 'group') && selectedGroup === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-white" />
              </div>
              Group Stage Teams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(Object.entries(groups) as [string, string[]][]).map(([group, teamCodes]) => (
                <div
                  key={group}
                  onClick={() => setSelectedGroup(group as GroupKey)}
                  className={`relative bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${
                    selectedGroup === group
                      ? 'border-ton-blue shadow-xl shadow-blue-500/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Group Badge */}
                  <div className="absolute -top-3 left-6">
                    <div className="px-4 py-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full">
                      <span className="text-white font-bold text-sm">GROUP {group}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {teamCodes.map((code, idx) => {
                      const team = teams.find((t) => t.code === code);
                      return team ? (
                        <div key={code} className="flex items-center gap-3 group/team">
                          <span className="text-xs text-gray-400 w-4">{idx + 1}</span>
                          <div className="w-8 h-6 rounded overflow-hidden shadow-sm">
                            <Image
                              src={team.flagUrl}
                              alt={team.name}
                              width={32}
                              height={24}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <span className="flex-1 font-medium text-gray-800 group-hover/team:text-ton-blue transition">
                            {team.name}
                          </span>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                            #{team.ranking}
                          </span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== GROUP FILTER (when viewing group stage) ===== */}
        {(selectedStage === 'all' || selectedStage === 'group') && (
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Filter by group:</span>
            {(['all', 'A', 'B', 'C', 'D'] as const).map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
                  selectedGroup === group
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {group === 'all' ? 'All Groups' : `Group ${group}`}
              </button>
            ))}
          </div>
        )}

        {/* ===== MATCHES LIST ===== */}
        <div className="space-y-10">
          {Object.entries(matchesByDate).map(([dateKey, dateMatches]) => {
            const matchDate = new Date(dateKey);
            const isWeekend = matchDate.getDay() === 0 || matchDate.getDay() === 6;

            return (
              <div key={dateKey}>
                {/* Date Header */}
                <div className="flex items-center gap-4 mb-6 sticky top-16 bg-gray-50/95 backdrop-blur-sm py-3 z-10 -mx-4 px-4">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center ${
                    isWeekend ? 'bg-gradient-to-br from-ton-blue to-blue-600' : 'bg-gray-200'
                  }`}>
                    <span className={`text-lg font-bold ${isWeekend ? 'text-white' : 'text-gray-700'}`}>
                      {format(matchDate, 'd')}
                    </span>
                    <span className={`text-xs uppercase ${isWeekend ? 'text-white/80' : 'text-gray-500'}`}>
                      {format(matchDate, 'MMM')}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {format(matchDate, 'EEEE')}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {dateMatches.length} match{dateMatches.length > 1 ? 'es' : ''} scheduled
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
                        className={`bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 ${
                          isHighlight
                            ? 'border-2 border-yellow-400 shadow-lg shadow-yellow-500/10'
                            : 'border-gray-200'
                        }`}
                      >
                        {/* Match Header */}
                        <div
                          className={`px-5 py-3 flex items-center justify-between ${
                            isHighlight
                              ? 'bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50'
                              : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-xs font-bold px-3 py-1.5 rounded-lg text-white bg-gradient-to-r ${stageInfo?.gradient || 'from-gray-500 to-gray-600'}`}
                            >
                              Match #{match.matchNumber}
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              {stageInfo?.label || match.matchType}
                            </span>
                            {match.matchType === 'final' && (
                              <TrophyIcon className="w-4 h-4 text-yellow-500" />
                            )}
                            {isHighlight && match.matchType !== 'final' && (
                              <FlameIcon className="w-4 h-4 text-orange-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <ClockIcon className="w-4 h-4" />
                            <span className="font-semibold">
                              {format(new Date(match.startTime), 'HH:mm')} UTC
                            </span>
                          </div>
                        </div>

                        {/* Match Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between">
                            {/* Team 1 */}
                            <div className="flex-1">
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-10 rounded-lg overflow-hidden shadow-md">
                                  <Image
                                    src={match.team1.flagUrl}
                                    alt={match.team1.name}
                                    width={56}
                                    height={40}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-bold text-lg text-gray-900">
                                    {match.team1.name}
                                  </h3>
                                  <span className="text-sm text-gray-400">
                                    Rank #{match.team1.ranking}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Odds */}
                            <div className="flex items-center gap-3 px-4">
                              {team1Odds ? (
                                <button
                                  onClick={() => handleBetClick(match.id)}
                                  className="min-w-[100px] py-3 px-5 bg-gradient-to-b from-white to-gray-50 hover:from-ton-blue hover:to-blue-600 border-2 border-gray-200 hover:border-ton-blue rounded-xl transition-all text-center group shadow-sm hover:shadow-lg"
                                >
                                  <div className="text-2xl font-black text-gray-900 group-hover:text-white">
                                    {team1Odds.odds.toFixed(2)}
                                  </div>
                                  <div className="text-xs text-gray-500 group-hover:text-blue-100 font-medium">
                                    {team1Odds.impliedProbability.toFixed(0)}%
                                  </div>
                                </button>
                              ) : (
                                <div className="min-w-[100px] py-3 px-5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-center">
                                  <div className="text-lg font-bold text-gray-300">TBD</div>
                                </div>
                              )}

                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-sm font-bold text-gray-400">VS</span>
                              </div>

                              {team2Odds ? (
                                <button
                                  onClick={() => handleBetClick(match.id)}
                                  className="min-w-[100px] py-3 px-5 bg-gradient-to-b from-white to-gray-50 hover:from-ton-blue hover:to-blue-600 border-2 border-gray-200 hover:border-ton-blue rounded-xl transition-all text-center group shadow-sm hover:shadow-lg"
                                >
                                  <div className="text-2xl font-black text-gray-900 group-hover:text-white">
                                    {team2Odds.odds.toFixed(2)}
                                  </div>
                                  <div className="text-xs text-gray-500 group-hover:text-blue-100 font-medium">
                                    {team2Odds.impliedProbability.toFixed(0)}%
                                  </div>
                                </button>
                              ) : (
                                <div className="min-w-[100px] py-3 px-5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-center">
                                  <div className="text-lg font-bold text-gray-300">TBD</div>
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
                                  <span className="text-sm text-gray-400">
                                    Rank #{match.team2.ranking}
                                  </span>
                                </div>
                                <div className="w-14 h-10 rounded-lg overflow-hidden shadow-md">
                                  <Image
                                    src={match.team2.flagUrl}
                                    alt={match.team2.name}
                                    width={56}
                                    height={40}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Venue */}
                          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPinIcon className="w-4 h-4" />
                              <span className="font-medium">{match.venue}</span>
                              <span className="text-gray-300">•</span>
                              <span>{venueCountryFlag[match.country]} {match.city}</span>
                            </div>
                            {market && (
                              <button 
                                onClick={() => handleBetClick(match.id)}
                                className="text-sm text-ton-blue hover:text-blue-700 font-semibold flex items-center gap-1 transition"
                              >
                                All markets
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
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <GlobeIcon className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No matches found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters to see more matches</p>
            <button
              onClick={() => {
                setSelectedStage('all');
                setSelectedGroup('all');
              }}
              className="px-6 py-3 bg-ton-blue text-white rounded-xl hover:bg-blue-600 transition font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ===== TOURNAMENT FORMAT FOOTER ===== */}
        <div className="mt-16 mb-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src="/images/cricket2.jpg"
                alt="Cricket Action"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/80" />
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-12">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <TrophyIcon className="w-6 h-6 text-yellow-400" />
                Tournament Format
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10">
                  <div className="text-4xl font-black text-blue-400 mb-2">{tournamentStats.groupMatches}</div>
                  <div className="text-white font-semibold">Group Stage</div>
                  <div className="text-white/50 text-sm mt-1">Feb 7 - Feb 20</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10">
                  <div className="text-4xl font-black text-purple-400 mb-2">{tournamentStats.super8Matches}</div>
                  <div className="text-white font-semibold">Super 8</div>
                  <div className="text-white/50 text-sm mt-1">Feb 21 - Mar 1</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10">
                  <div className="text-4xl font-black text-orange-400 mb-2">2</div>
                  <div className="text-white font-semibold">Semi Finals</div>
                  <div className="text-white/50 text-sm mt-1">Mar 4 - 5</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center border border-white/10">
                  <div className="text-4xl font-black text-yellow-400 mb-2">1</div>
                  <div className="text-white font-semibold">Grand Final</div>
                  <div className="text-white/50 text-sm mt-1">Mar 8, Ahmedabad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
