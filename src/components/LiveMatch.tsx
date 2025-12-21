import React, { useState } from 'react';
import { Activity, TrendingUp, Clock, Target, Zap, BarChart3 } from 'lucide-react';
import { OddsButton, CompactOdds } from './OddsButton';

interface Batsman {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
}

interface Bowler {
  name: string;
  overs: number;
  runs: number;
  wickets: number;
  economy: number;
}

interface LiveScore {
  team: string;
  runs: number;
  wickets: number;
  overs: number;
  runRate: number;
}

interface LiveMatchProps {
  matchId: string;
  team1: string;
  team2: string;
  currentInnings: 1 | 2;
  battingTeam: string;
  bowlingTeam: string;
  score: LiveScore;
  target?: number;
  required?: {
    runs: number;
    balls: number;
    runRate: number;
  };
  batsmen: [Batsman, Batsman];
  currentBowler: Bowler;
  recentOvers: string[];
  liveOdds: {
    team1: number;
    team2: number;
    previousTeam1?: number;
    previousTeam2?: number;
  };
  onPlaceBet: (selection: string, odds: number) => void;
}

export const LiveMatch: React.FC<LiveMatchProps> = ({
  team1,
  team2,
  currentInnings,
  battingTeam,
  bowlingTeam,
  score,
  target,
  required,
  batsmen,
  currentBowler,
  recentOvers,
  liveOdds,
  onPlaceBet
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scorecard' | 'markets'>('overview');

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Live Indicator */}
      <div className="flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg py-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="text-sm font-bold text-red-700 dark:text-red-400 uppercase">Live Match</span>
      </div>

      {/* Match Header */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        {/* Teams */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <h3 className="text-2xl font-bold mb-2">{team1}</h3>
              {currentInnings === 2 && target && (
                <p className="text-sm opacity-90">Target: {target}</p>
              )}
            </div>
            <div className="text-3xl font-bold px-4">vs</div>
            <div className="text-center flex-1">
              <h3 className="text-2xl font-bold mb-2">{team2}</h3>
            </div>
          </div>

          {/* Current Score */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
            <p className="text-sm opacity-90 mb-2">{battingTeam}</p>
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-6xl font-bold tabular-nums">{score.runs}</span>
              <span className="text-3xl font-semibold">/{score.wickets}</span>
              <span className="text-2xl opacity-90">({score.overs} ov)</span>
            </div>
            <p className="text-lg mt-3">Run Rate: {score.runRate.toFixed(2)}</p>

            {/* Required Run Rate (if chasing) */}
            {required && (
              <div className="mt-4 pt-4 border-t border-white/30">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm opacity-90">Need</p>
                    <p className="text-2xl font-bold">{required.runs}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">In</p>
                    <p className="text-2xl font-bold">{required.balls}</p>
                    <p className="text-xs opacity-75">balls</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">RRR</p>
                    <p className="text-2xl font-bold">{required.runRate.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Odds */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Live Match Winner
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <OddsButton
              odds={liveOdds.team1}
              previousOdds={liveOdds.previousTeam1}
              label={team1}
              onClick={() => onPlaceBet(team1, liveOdds.team1)}
              size="lg"
            />
            <OddsButton
              odds={liveOdds.team2}
              previousOdds={liveOdds.previousTeam2}
              label={team2}
              onClick={() => onPlaceBet(team2, liveOdds.team2)}
              size="lg"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('scorecard')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'scorecard'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Scorecard
            </button>
            <button
              onClick={() => setActiveTab('markets')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'markets'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Markets
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <OverviewTab
              batsmen={batsmen}
              currentBowler={currentBowler}
              recentOvers={recentOvers}
            />
          )}

          {activeTab === 'scorecard' && (
            <ScorecardTab batsmen={batsmen} currentBowler={currentBowler} />
          )}

          {activeTab === 'markets' && (
            <MarketsTab team1={team1} team2={team2} onPlaceBet={onPlaceBet} />
          )}
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{
  batsmen: [Batsman, Batsman];
  currentBowler: Bowler;
  recentOvers: string[];
}> = ({ batsmen, currentBowler, recentOvers }) => {
  return (
    <div className="space-y-6">
      {/* Current Partnership */}
      <div>
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Current Partnership
        </h4>

        <div className="grid grid-cols-2 gap-4">
          {batsmen.map((batsman, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="font-bold text-lg text-gray-900 dark:text-white">{batsman.name}</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">On strike</p>
                </div>
                <span className="text-3xl font-bold text-blue-600">{batsman.runs}*</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Balls</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{batsman.balls}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">4s</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{batsman.fours}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">6s</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{batsman.sixes}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SR</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{batsman.strikeRate.toFixed(0)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Bowler */}
      <div>
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Current Bowler
        </h4>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-bold text-lg text-gray-900 dark:text-white">{currentBowler.name}</h5>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {currentBowler.wickets}-{currentBowler.runs} ({currentBowler.overs})
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Overs</p>
              <p className="font-semibold text-gray-900 dark:text-white">{currentBowler.overs}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Runs</p>
              <p className="font-semibold text-gray-900 dark:text-white">{currentBowler.runs}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Wickets</p>
              <p className="font-semibold text-gray-900 dark:text-white">{currentBowler.wickets}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Economy</p>
              <p className="font-semibold text-gray-900 dark:text-white">{currentBowler.economy.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Overs */}
      <div>
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Recent Overs
        </h4>

        <div className="space-y-2">
          {recentOvers.slice(0, 5).map((over, index) => {
            const overNumber = recentOvers.length - index;
            const balls = over.split(' ');
            const runs = balls.reduce((sum, ball) => {
              const num = parseInt(ball);
              return sum + (isNaN(num) ? 0 : num);
            }, 0);

            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-16">
                    Over {overNumber}:
                  </span>
                  <div className="flex gap-2">
                    {balls.map((ball, ballIndex) => (
                      <span
                        key={ballIndex}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          ball === 'W'
                            ? 'bg-red-600 text-white'
                            : ball === '6'
                            ? 'bg-green-600 text-white'
                            : ball === '4'
                            ? 'bg-blue-600 text-white'
                            : ball === '•'
                            ? 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        {ball === '•' ? '•' : ball}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {runs} runs
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          Legend: • = dot, W = wicket, 4 = four, 6 = six
        </p>
      </div>
    </div>
  );
};

// Scorecard Tab (simplified)
const ScorecardTab: React.FC<{
  batsmen: [Batsman, Batsman];
  currentBowler: Bowler;
}> = ({ batsmen, currentBowler }) => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Batting</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Batsman</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">R</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">B</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">4s</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">6s</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">SR</th>
              </tr>
            </thead>
            <tbody>
              {batsmen.map((batsman, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 font-medium text-gray-900 dark:text-white">{batsman.name}*</td>
                  <td className="text-right font-semibold text-gray-900 dark:text-white">{batsman.runs}</td>
                  <td className="text-right text-gray-600 dark:text-gray-400">{batsman.balls}</td>
                  <td className="text-right text-gray-600 dark:text-gray-400">{batsman.fours}</td>
                  <td className="text-right text-gray-600 dark:text-gray-400">{batsman.sixes}</td>
                  <td className="text-right text-gray-600 dark:text-gray-400">{batsman.strikeRate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Bowling</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Bowler</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">O</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">R</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">W</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Econ</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 font-medium text-gray-900 dark:text-white">{currentBowler.name}*</td>
                <td className="text-right text-gray-600 dark:text-gray-400">{currentBowler.overs}</td>
                <td className="text-right text-gray-600 dark:text-gray-400">{currentBowler.runs}</td>
                <td className="text-right font-semibold text-gray-900 dark:text-white">{currentBowler.wickets}</td>
                <td className="text-right text-gray-600 dark:text-gray-400">{currentBowler.economy.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Markets Tab
const MarketsTab: React.FC<{
  team1: string;
  team2: string;
  onPlaceBet: (selection: string, odds: number) => void;
}> = ({ team1, team2, onPlaceBet }) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-sm text-amber-900 dark:text-amber-200">
          Live odds update every ball. Markets may be suspended during key moments.
        </p>
      </div>

      {/* Next Over Markets */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Next Over Runs (O/U 7.5)</h4>
        <div className="grid grid-cols-2 gap-3">
          <OddsButton
            odds={1.90}
            label="Over 7.5"
            onClick={() => onPlaceBet('Over 7.5 next over', 1.90)}
          />
          <OddsButton
            odds={1.90}
            label="Under 7.5"
            onClick={() => onPlaceBet('Under 7.5 next over', 1.90)}
          />
        </div>
      </div>

      {/* Total Match Runs */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Total Match Runs (O/U 340.5)</h4>
        <div className="grid grid-cols-2 gap-3">
          <OddsButton
            odds={2.05}
            label="Over 340.5"
            onClick={() => onPlaceBet('Over 340.5 total runs', 2.05)}
          />
          <OddsButton
            odds={1.78}
            label="Under 340.5"
            onClick={() => onPlaceBet('Under 340.5 total runs', 1.78)}
          />
        </div>
      </div>
    </div>
  );
};
