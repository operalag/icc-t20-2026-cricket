export interface Team {
  id: number;
  name: string;
  code: string; // IND, AUS, PAK, etc.
  flagUrl: string;
  ranking: number;
}

export interface Match {
  id: number;
  tournamentId: number;
  matchNumber: number;
  matchType: 'group' | 'super8' | 'semi' | 'final';
  team1: Team;
  team2: Team;
  venue: string;
  city: string;
  country: string;
  startTime: Date;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  result?: {
    winner: number; // team id
    margin: string; // "20 runs" or "5 wickets"
    summary: string;
  };
  liveScore?: LiveScore;
}

export interface LiveScore {
  matchId: number;
  currentInnings: 1 | 2;
  team1Score: {
    runs: number;
    wickets: number;
    overs: number;
  };
  team2Score?: {
    runs: number;
    wickets: number;
    overs: number;
  };
  currentBatsmen: {
    name: string;
    runs: number;
    balls: number;
  }[];
  currentBowler: {
    name: string;
    overs: number;
    wickets: number;
    runs: number;
  };
  lastBalls: string[]; // ["4", "1", "W", "0", "6", "2"]
  requiredRunRate?: number;
  currentRunRate: number;
}

export interface Tournament {
  id: number;
  name: string;
  year: number;
  startDate: Date;
  endDate: Date;
  hostCountries: string[];
  participatingTeams: Team[];
  totalMatches: number;
}
