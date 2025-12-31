export enum MarketStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  SETTLED = 'settled',
  CANCELLED = 'cancelled',
}

export enum MarketType {
  // Tournament Outrights
  TOURNAMENT_WINNER = 'tournament_winner',
  TOP_BATSMAN = 'top_batsman',
  TOP_BOWLER = 'top_bowler',
  TOP_ALLROUNDER = 'top_allrounder',
  MOST_SIXES = 'most_sixes',

  // Match Markets
  MATCH_WINNER = 'match_winner',
  MATCH_WINNER_WITH_TIE = 'match_winner_with_tie',
  TOTAL_RUNS = 'total_runs',
  TEAM_TOTAL = 'team_total',
  MATCH_SIXES = 'match_sixes',
  MATCH_WICKETS = 'match_wickets',

  // Player Props
  PLAYER_RUNS = 'player_runs',
  PLAYER_WICKETS = 'player_wickets',
  PLAYER_BOUNDARIES = 'player_boundaries',
  PLAYER_TO_SCORE_FIFTY = 'player_to_score_fifty',
  PLAYER_TO_TAKE_THREE_WICKETS = 'player_to_take_three_wickets',

  // Top Performers
  TOP_TEAM_BATSMAN = 'top_team_batsman',
  TOP_TEAM_BOWLER = 'top_team_bowler',

  // In-Play Markets
  NEXT_OVER_RUNS = 'next_over_runs',
  FALL_OF_NEXT_WICKET = 'fall_of_next_wicket',
  METHOD_OF_DISMISSAL = 'method_of_dismissal',

  // Special Markets
  POWERPLAY_RUNS = 'powerplay_runs',
  DEATH_OVERS_RUNS = 'death_overs_runs',
  OPENING_PARTNERSHIP = 'opening_partnership',
  GROUP_WINNER = 'group_winner',
}

export interface MarketOutcome {
  id: string;
  name: string;
  odds: number;
  impliedProbability: number;
  totalVolume: number;
  shares: number;
  metadata?: {
    teamCode?: string;
    playerName?: string;
    flagUrl?: string;
  };
}

export interface Market {
  id: string;
  contractAddress: string;
  marketType: MarketType;
  status: MarketStatus;
  title: string;
  description: string;
  outcomes: MarketOutcome[];
  matchId?: number;
  tournamentId: number;
  totalVolume: number;
  liquidityParameter: number;
  startTime: Date;
  closingTime: Date;
  resolutionTime?: Date;
  settlementValue?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata: {
    category: string;
    tags: string[];
    iconUrl?: string;
  };
}

export interface TradeSlipItem {
  id: string;
  market: Market;
  outcomeId: string;
  outcomeName: string;
  odds: number;
  amount: number;
  potentialReturn: number;
}

export interface PlacedBet {
  id: string;
  userId: string;
  marketId: string;
  outcomeId: string;
  amount: number;
  odds: number;
  status: 'pending' | 'confirmed' | 'settled' | 'cancelled';
  placedAt: Date;
  settledAt?: Date;
  payout?: number;
  transactionHash?: string;
}
