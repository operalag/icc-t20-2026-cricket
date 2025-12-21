import { Team, Match, Tournament } from '@/types/matches';
import { Market, MarketType, MarketStatus } from '@/types/markets';

// All 20 teams for the 2026 ICC T20 World Cup
export const teams: Team[] = [
  // Group A
  { id: 1, name: 'India', code: 'IND', flagUrl: 'https://flagcdn.com/w40/in.png', ranking: 1 },
  { id: 2, name: 'USA', code: 'USA', flagUrl: 'https://flagcdn.com/w40/us.png', ranking: 17 },
  { id: 3, name: 'Namibia', code: 'NAM', flagUrl: 'https://flagcdn.com/w40/na.png', ranking: 18 },
  { id: 4, name: 'Netherlands', code: 'NED', flagUrl: 'https://flagcdn.com/w40/nl.png', ranking: 14 },
  { id: 5, name: 'Pakistan', code: 'PAK', flagUrl: 'https://flagcdn.com/w40/pk.png', ranking: 6 },
  // Group B
  { id: 6, name: 'Australia', code: 'AUS', flagUrl: 'https://flagcdn.com/w40/au.png', ranking: 2 },
  { id: 7, name: 'Sri Lanka', code: 'SL', flagUrl: 'https://flagcdn.com/w40/lk.png', ranking: 8 },
  { id: 8, name: 'Zimbabwe', code: 'ZIM', flagUrl: 'https://flagcdn.com/w40/zw.png', ranking: 12 },
  { id: 9, name: 'Ireland', code: 'IRE', flagUrl: 'https://flagcdn.com/w40/ie.png', ranking: 13 },
  { id: 10, name: 'Oman', code: 'OMA', flagUrl: 'https://flagcdn.com/w40/om.png', ranking: 19 },
  // Group C
  { id: 11, name: 'England', code: 'ENG', flagUrl: 'https://flagcdn.com/w40/gb-eng.png', ranking: 3 },
  { id: 12, name: 'West Indies', code: 'WI', flagUrl: 'https://flagcdn.com/w40/jm.png', ranking: 7 },
  { id: 13, name: 'Bangladesh', code: 'BAN', flagUrl: 'https://flagcdn.com/w40/bd.png', ranking: 9 },
  { id: 14, name: 'Italy', code: 'ITA', flagUrl: 'https://flagcdn.com/w40/it.png', ranking: 20 },
  { id: 15, name: 'Nepal', code: 'NEP', flagUrl: 'https://flagcdn.com/w40/np.png', ranking: 16 },
  // Group D
  { id: 16, name: 'South Africa', code: 'RSA', flagUrl: 'https://flagcdn.com/w40/za.png', ranking: 4 },
  { id: 17, name: 'New Zealand', code: 'NZ', flagUrl: 'https://flagcdn.com/w40/nz.png', ranking: 5 },
  { id: 18, name: 'Afghanistan', code: 'AFG', flagUrl: 'https://flagcdn.com/w40/af.png', ranking: 10 },
  { id: 19, name: 'Canada', code: 'CAN', flagUrl: 'https://flagcdn.com/w40/ca.png', ranking: 15 },
  { id: 20, name: 'UAE', code: 'UAE', flagUrl: 'https://flagcdn.com/w40/ae.png', ranking: 11 },
];

export const tournament: Tournament = {
  id: 1,
  name: 'ICC Men\'s T20 World Cup',
  year: 2026,
  startDate: new Date('2026-02-07'),
  endDate: new Date('2026-03-08'),
  hostCountries: ['India', 'Sri Lanka'],
  participatingTeams: teams,
  totalMatches: 55,
};

// Group structure
export const groups = {
  A: ['IND', 'USA', 'NAM', 'NED', 'PAK'],
  B: ['AUS', 'SL', 'ZIM', 'IRE', 'OMA'],
  C: ['ENG', 'WI', 'BAN', 'ITA', 'NEP'],
  D: ['RSA', 'NZ', 'AFG', 'CAN', 'UAE'],
};

// Venues
export const venues = [
  { name: 'Narendra Modi Stadium', city: 'Ahmedabad', country: 'India', capacity: 132000 },
  { name: 'Wankhede Stadium', city: 'Mumbai', country: 'India', capacity: 33000 },
  { name: 'Eden Gardens', city: 'Kolkata', country: 'India', capacity: 68000 },
  { name: 'M.A. Chidambaram Stadium', city: 'Chennai', country: 'India', capacity: 50000 },
  { name: 'Arun Jaitley Stadium', city: 'Delhi', country: 'India', capacity: 41000 },
  { name: 'R. Premadasa Stadium', city: 'Colombo', country: 'Sri Lanka', capacity: 35000 },
  { name: 'SSC Cricket Ground', city: 'Colombo', country: 'Sri Lanka', capacity: 15000 },
  { name: 'Pallekele Cricket Stadium', city: 'Kandy', country: 'Sri Lanka', capacity: 35000 },
];

// Helper function to create date relative to now
const daysFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// Helper to get team by code
const getTeam = (code: string) => teams.find(t => t.code === code)!;

export const matches: Match[] = [
  // ============ GROUP STAGE - Feb 7 to Feb 20 ============

  // Day 1 - Saturday, Feb 7, 2026
  { id: 1, tournamentId: 1, matchNumber: 1, matchType: 'group', team1: getTeam('NED'), team2: getTeam('PAK'), venue: 'Sinhalese Sports Club', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-07T05:00:00Z'), status: 'scheduled' },
  { id: 2, tournamentId: 1, matchNumber: 2, matchType: 'group', team1: getTeam('BAN'), team2: getTeam('WI'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-02-07T09:00:00Z'), status: 'scheduled' },
  { id: 3, tournamentId: 1, matchNumber: 3, matchType: 'group', team1: getTeam('IND'), team2: getTeam('USA'), venue: 'Wankhede Stadium', city: 'Mumbai', country: 'India', startTime: new Date('2026-02-07T13:30:00Z'), status: 'scheduled' },

  // Day 2 - Sunday, Feb 8, 2026
  { id: 4, tournamentId: 1, matchNumber: 4, matchType: 'group', team1: getTeam('AFG'), team2: getTeam('NZ'), venue: 'M.A. Chidambaram Stadium', city: 'Chennai', country: 'India', startTime: new Date('2026-02-08T05:00:00Z'), status: 'scheduled' },
  { id: 5, tournamentId: 1, matchNumber: 5, matchType: 'group', team1: getTeam('ENG'), team2: getTeam('NEP'), venue: 'Wankhede Stadium', city: 'Mumbai', country: 'India', startTime: new Date('2026-02-08T09:00:00Z'), status: 'scheduled' },
  { id: 6, tournamentId: 1, matchNumber: 6, matchType: 'group', team1: getTeam('SL'), team2: getTeam('IRE'), venue: 'R. Premadasa Stadium', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-08T13:30:00Z'), status: 'scheduled' },

  // Day 3 - Monday, Feb 9, 2026
  { id: 7, tournamentId: 1, matchNumber: 7, matchType: 'group', team1: getTeam('RSA'), team2: getTeam('UAE'), venue: 'M.A. Chidambaram Stadium', city: 'Chennai', country: 'India', startTime: new Date('2026-02-09T05:00:00Z'), status: 'scheduled' },
  { id: 8, tournamentId: 1, matchNumber: 8, matchType: 'group', team1: getTeam('AUS'), team2: getTeam('OMA'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-02-09T09:00:00Z'), status: 'scheduled' },
  { id: 9, tournamentId: 1, matchNumber: 9, matchType: 'group', team1: getTeam('IND'), team2: getTeam('NAM'), venue: 'Wankhede Stadium', city: 'Mumbai', country: 'India', startTime: new Date('2026-02-09T13:30:00Z'), status: 'scheduled' },

  // Day 4 - Tuesday, Feb 10, 2026
  { id: 10, tournamentId: 1, matchNumber: 10, matchType: 'group', team1: getTeam('NZ'), team2: getTeam('CAN'), venue: 'M.A. Chidambaram Stadium', city: 'Chennai', country: 'India', startTime: new Date('2026-02-10T05:00:00Z'), status: 'scheduled' },
  { id: 11, tournamentId: 1, matchNumber: 11, matchType: 'group', team1: getTeam('WI'), team2: getTeam('ITA'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-02-10T09:00:00Z'), status: 'scheduled' },
  { id: 12, tournamentId: 1, matchNumber: 12, matchType: 'group', team1: getTeam('PAK'), team2: getTeam('USA'), venue: 'R. Premadasa Stadium', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-10T13:30:00Z'), status: 'scheduled' },

  // Day 5 - Wednesday, Feb 11, 2026
  { id: 13, tournamentId: 1, matchNumber: 13, matchType: 'group', team1: getTeam('ZIM'), team2: getTeam('OMA'), venue: 'Pallekele Cricket Stadium', city: 'Kandy', country: 'Sri Lanka', startTime: new Date('2026-02-11T05:00:00Z'), status: 'scheduled' },
  { id: 14, tournamentId: 1, matchNumber: 14, matchType: 'group', team1: getTeam('BAN'), team2: getTeam('ITA'), venue: 'Arun Jaitley Stadium', city: 'Delhi', country: 'India', startTime: new Date('2026-02-11T09:00:00Z'), status: 'scheduled' },
  { id: 15, tournamentId: 1, matchNumber: 15, matchType: 'group', team1: getTeam('AFG'), team2: getTeam('RSA'), venue: 'M.A. Chidambaram Stadium', city: 'Chennai', country: 'India', startTime: new Date('2026-02-11T13:30:00Z'), status: 'scheduled' },

  // Day 6 - Thursday, Feb 12, 2026
  { id: 16, tournamentId: 1, matchNumber: 16, matchType: 'group', team1: getTeam('NAM'), team2: getTeam('NED'), venue: 'Sinhalese Sports Club', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-12T05:00:00Z'), status: 'scheduled' },
  { id: 17, tournamentId: 1, matchNumber: 17, matchType: 'group', team1: getTeam('AUS'), team2: getTeam('IRE'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-02-12T09:00:00Z'), status: 'scheduled' },
  { id: 18, tournamentId: 1, matchNumber: 18, matchType: 'group', team1: getTeam('ENG'), team2: getTeam('WI'), venue: 'Arun Jaitley Stadium', city: 'Delhi', country: 'India', startTime: new Date('2026-02-12T13:30:00Z'), status: 'scheduled' },

  // Day 7 - Friday, Feb 13, 2026
  { id: 19, tournamentId: 1, matchNumber: 19, matchType: 'group', team1: getTeam('NZ'), team2: getTeam('UAE'), venue: 'M.A. Chidambaram Stadium', city: 'Chennai', country: 'India', startTime: new Date('2026-02-13T05:00:00Z'), status: 'scheduled' },
  { id: 20, tournamentId: 1, matchNumber: 20, matchType: 'group', team1: getTeam('SL'), team2: getTeam('ZIM'), venue: 'Pallekele Cricket Stadium', city: 'Kandy', country: 'Sri Lanka', startTime: new Date('2026-02-13T09:00:00Z'), status: 'scheduled' },
  { id: 21, tournamentId: 1, matchNumber: 21, matchType: 'group', team1: getTeam('IND'), team2: getTeam('NED'), venue: 'Wankhede Stadium', city: 'Mumbai', country: 'India', startTime: new Date('2026-02-13T13:30:00Z'), status: 'scheduled' },

  // Day 8 - Saturday, Feb 14, 2026
  { id: 22, tournamentId: 1, matchNumber: 22, matchType: 'group', team1: getTeam('NEP'), team2: getTeam('ITA'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-02-14T05:00:00Z'), status: 'scheduled' },
  { id: 23, tournamentId: 1, matchNumber: 23, matchType: 'group', team1: getTeam('CAN'), team2: getTeam('UAE'), venue: 'M.A. Chidambaram Stadium', city: 'Chennai', country: 'India', startTime: new Date('2026-02-14T09:00:00Z'), status: 'scheduled' },
  { id: 24, tournamentId: 1, matchNumber: 24, matchType: 'group', team1: getTeam('AUS'), team2: getTeam('SL'), venue: 'R. Premadasa Stadium', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-14T13:30:00Z'), status: 'scheduled' },

  // Day 9 - Sunday, Feb 15, 2026 - INDIA VS PAKISTAN 🏏
  { id: 25, tournamentId: 1, matchNumber: 25, matchType: 'group', team1: getTeam('PAK'), team2: getTeam('NAM'), venue: 'Sinhalese Sports Club', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-15T05:00:00Z'), status: 'scheduled' },
  { id: 26, tournamentId: 1, matchNumber: 26, matchType: 'group', team1: getTeam('BAN'), team2: getTeam('NEP'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-02-15T09:00:00Z'), status: 'scheduled' },
  { id: 27, tournamentId: 1, matchNumber: 27, matchType: 'group', team1: getTeam('IND'), team2: getTeam('PAK'), venue: 'R. Premadasa Stadium', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-15T13:30:00Z'), status: 'scheduled' },

  // Day 10 - Monday, Feb 16, 2026
  { id: 28, tournamentId: 1, matchNumber: 28, matchType: 'group', team1: getTeam('IRE'), team2: getTeam('OMA'), venue: 'Pallekele Cricket Stadium', city: 'Kandy', country: 'Sri Lanka', startTime: new Date('2026-02-16T05:00:00Z'), status: 'scheduled' },
  { id: 29, tournamentId: 1, matchNumber: 29, matchType: 'group', team1: getTeam('RSA'), team2: getTeam('CAN'), venue: 'Arun Jaitley Stadium', city: 'Delhi', country: 'India', startTime: new Date('2026-02-16T09:00:00Z'), status: 'scheduled' },
  { id: 30, tournamentId: 1, matchNumber: 30, matchType: 'group', team1: getTeam('ENG'), team2: getTeam('BAN'), venue: 'Wankhede Stadium', city: 'Mumbai', country: 'India', startTime: new Date('2026-02-16T13:30:00Z'), status: 'scheduled' },

  // Day 11 - Tuesday, Feb 17, 2026
  { id: 31, tournamentId: 1, matchNumber: 31, matchType: 'group', team1: getTeam('USA'), team2: getTeam('NAM'), venue: 'Sinhalese Sports Club', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-17T05:00:00Z'), status: 'scheduled' },
  { id: 32, tournamentId: 1, matchNumber: 32, matchType: 'group', team1: getTeam('AUS'), team2: getTeam('ZIM'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-02-17T09:00:00Z'), status: 'scheduled' },
  { id: 33, tournamentId: 1, matchNumber: 33, matchType: 'group', team1: getTeam('AFG'), team2: getTeam('CAN'), venue: 'M.A. Chidambaram Stadium', city: 'Chennai', country: 'India', startTime: new Date('2026-02-17T13:30:00Z'), status: 'scheduled' },

  // Day 12 - Wednesday, Feb 18, 2026
  { id: 34, tournamentId: 1, matchNumber: 34, matchType: 'group', team1: getTeam('SL'), team2: getTeam('OMA'), venue: 'R. Premadasa Stadium', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-18T05:00:00Z'), status: 'scheduled' },
  { id: 35, tournamentId: 1, matchNumber: 35, matchType: 'group', team1: getTeam('WI'), team2: getTeam('NEP'), venue: 'Arun Jaitley Stadium', city: 'Delhi', country: 'India', startTime: new Date('2026-02-18T09:00:00Z'), status: 'scheduled' },
  { id: 36, tournamentId: 1, matchNumber: 36, matchType: 'group', team1: getTeam('NZ'), team2: getTeam('RSA'), venue: 'Wankhede Stadium', city: 'Mumbai', country: 'India', startTime: new Date('2026-02-18T13:30:00Z'), status: 'scheduled' },

  // Day 13 - Thursday, Feb 19, 2026
  { id: 37, tournamentId: 1, matchNumber: 37, matchType: 'group', team1: getTeam('IRE'), team2: getTeam('ZIM'), venue: 'Pallekele Cricket Stadium', city: 'Kandy', country: 'Sri Lanka', startTime: new Date('2026-02-19T05:00:00Z'), status: 'scheduled' },
  { id: 38, tournamentId: 1, matchNumber: 38, matchType: 'group', team1: getTeam('USA'), team2: getTeam('NED'), venue: 'Sinhalese Sports Club', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-19T09:00:00Z'), status: 'scheduled' },
  { id: 39, tournamentId: 1, matchNumber: 39, matchType: 'group', team1: getTeam('ENG'), team2: getTeam('ITA'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-02-19T13:30:00Z'), status: 'scheduled' },

  // Day 14 - Friday, Feb 20, 2026 (Last Group Stage Day)
  { id: 40, tournamentId: 1, matchNumber: 40, matchType: 'group', team1: getTeam('AFG'), team2: getTeam('UAE'), venue: 'M.A. Chidambaram Stadium', city: 'Chennai', country: 'India', startTime: new Date('2026-02-20T09:00:00Z'), status: 'scheduled' },

  // ============ SUPER 8 STAGE - Feb 21 to Mar 1 ============

  // Super 8 - Day 1 - Saturday, Feb 21
  { id: 41, tournamentId: 1, matchNumber: 41, matchType: 'super8', team1: getTeam('IND'), team2: getTeam('AUS'), venue: 'Narendra Modi Stadium', city: 'Ahmedabad', country: 'India', startTime: new Date('2026-02-21T09:00:00Z'), status: 'scheduled' },
  { id: 42, tournamentId: 1, matchNumber: 42, matchType: 'super8', team1: getTeam('ENG'), team2: getTeam('RSA'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-02-21T13:30:00Z'), status: 'scheduled' },

  // Super 8 - Day 2 - Sunday, Feb 22
  { id: 43, tournamentId: 1, matchNumber: 43, matchType: 'super8', team1: getTeam('NZ'), team2: getTeam('WI'), venue: 'M.A. Chidambaram Stadium', city: 'Chennai', country: 'India', startTime: new Date('2026-02-22T09:00:00Z'), status: 'scheduled' },
  { id: 44, tournamentId: 1, matchNumber: 44, matchType: 'super8', team1: getTeam('PAK'), team2: getTeam('SL'), venue: 'R. Premadasa Stadium', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-22T13:30:00Z'), status: 'scheduled' },

  // Super 8 - Day 3 - Monday, Feb 23
  { id: 45, tournamentId: 1, matchNumber: 45, matchType: 'super8', team1: getTeam('IND'), team2: getTeam('NZ'), venue: 'Wankhede Stadium', city: 'Mumbai', country: 'India', startTime: new Date('2026-02-23T13:30:00Z'), status: 'scheduled' },

  // Super 8 - Day 4 - Tuesday, Feb 24
  { id: 46, tournamentId: 1, matchNumber: 46, matchType: 'super8', team1: getTeam('AUS'), team2: getTeam('WI'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-02-24T09:00:00Z'), status: 'scheduled' },
  { id: 47, tournamentId: 1, matchNumber: 47, matchType: 'super8', team1: getTeam('ENG'), team2: getTeam('PAK'), venue: 'Arun Jaitley Stadium', city: 'Delhi', country: 'India', startTime: new Date('2026-02-24T13:30:00Z'), status: 'scheduled' },

  // Super 8 - Day 5 - Wednesday, Feb 25
  { id: 48, tournamentId: 1, matchNumber: 48, matchType: 'super8', team1: getTeam('RSA'), team2: getTeam('SL'), venue: 'Pallekele Cricket Stadium', city: 'Kandy', country: 'Sri Lanka', startTime: new Date('2026-02-25T09:00:00Z'), status: 'scheduled' },
  { id: 49, tournamentId: 1, matchNumber: 49, matchType: 'super8', team1: getTeam('IND'), team2: getTeam('WI'), venue: 'Narendra Modi Stadium', city: 'Ahmedabad', country: 'India', startTime: new Date('2026-02-25T13:30:00Z'), status: 'scheduled' },

  // Super 8 - Day 6 - Thursday, Feb 26
  { id: 50, tournamentId: 1, matchNumber: 50, matchType: 'super8', team1: getTeam('AUS'), team2: getTeam('NZ'), venue: 'M.A. Chidambaram Stadium', city: 'Chennai', country: 'India', startTime: new Date('2026-02-26T13:30:00Z'), status: 'scheduled' },

  // Super 8 - Day 7 - Friday, Feb 27
  { id: 51, tournamentId: 1, matchNumber: 51, matchType: 'super8', team1: getTeam('ENG'), team2: getTeam('SL'), venue: 'R. Premadasa Stadium', city: 'Colombo', country: 'Sri Lanka', startTime: new Date('2026-02-27T09:00:00Z'), status: 'scheduled' },
  { id: 52, tournamentId: 1, matchNumber: 52, matchType: 'super8', team1: getTeam('RSA'), team2: getTeam('PAK'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-02-27T13:30:00Z'), status: 'scheduled' },

  // ============ KNOCKOUT STAGE ============

  // Semi Final 1 - Wednesday, Mar 4, 2026
  { id: 53, tournamentId: 1, matchNumber: 53, matchType: 'semi', team1: getTeam('IND'), team2: getTeam('ENG'), venue: 'Eden Gardens', city: 'Kolkata', country: 'India', startTime: new Date('2026-03-04T13:30:00Z'), status: 'scheduled' },

  // Semi Final 2 - Thursday, Mar 5, 2026
  { id: 54, tournamentId: 1, matchNumber: 54, matchType: 'semi', team1: getTeam('AUS'), team2: getTeam('RSA'), venue: 'Wankhede Stadium', city: 'Mumbai', country: 'India', startTime: new Date('2026-03-05T13:30:00Z'), status: 'scheduled' },

  // FINAL - Sunday, Mar 8, 2026
  { id: 55, tournamentId: 1, matchNumber: 55, matchType: 'final', team1: getTeam('IND'), team2: getTeam('AUS'), venue: 'Narendra Modi Stadium', city: 'Ahmedabad', country: 'India', startTime: new Date('2026-03-08T13:30:00Z'), status: 'scheduled' },
];

// Helper to calculate LMSR odds
function calculateOdds(shares: number[], liquidityParam: number = 100): number[] {
  const expTerms = shares.map(s => Math.exp(s / liquidityParam));
  const sum = expTerms.reduce((a, b) => a + b, 0);
  const probabilities = expTerms.map(exp => exp / sum);
  return probabilities.map(p => 1 / p);
}

// Tournament winner odds from bookmaker consensus (Dec 2025)
// Source: OddsPortal / betting market consensus - run `npm run scrape-odds` to refresh
const tournamentWinnerOdds: { [key: string]: number } = {
  'IND': 3.50,
  'AUS': 4.00,
  'ENG': 5.00,
  'RSA': 5.50,
  'NZ': 8.00,
  'PAK': 9.00,
  'WI': 11.00,
  'SL': 17.00,
  'AFG': 21.00,
  'BAN': 34.00,
};

export const mockMarkets: Market[] = [
  {
    id: 'market-1',
    contractAddress: 'EQDtFpEwcFAEcRe5mLVh2N6C0x-_hJEM7W61_JLnSF74p4q2',
    marketType: MarketType.TOURNAMENT_WINNER,
    status: MarketStatus.ACTIVE,
    title: 'ICC T20 World Cup 2026 Winner',
    description: 'Which team will win the 2026 ICC T20 World Cup?',
    tournamentId: 1,
    totalVolume: 285000,
    liquidityParameter: 200,
    startTime: new Date('2025-12-01'),
    closingTime: new Date('2026-02-07T05:00:00Z'),
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date(),
    metadata: {
      category: 'Tournament Outrights',
      tags: ['tournament', 'winner', 'outright'],
      iconUrl: '/icons/trophy.svg',
    },
    outcomes: [
      {
        id: 'out-ind',
        name: 'India',
        odds: 3.50,
        impliedProbability: 28.6,
        shares: 45000,
        totalVolume: 45000,
        metadata: { teamCode: 'IND', flagUrl: getTeam('IND').flagUrl },
      },
      {
        id: 'out-aus',
        name: 'Australia',
        odds: 4.00,
        impliedProbability: 25.0,
        shares: 35000,
        totalVolume: 35000,
        metadata: { teamCode: 'AUS', flagUrl: getTeam('AUS').flagUrl },
      },
      {
        id: 'out-eng',
        name: 'England',
        odds: 5.00,
        impliedProbability: 20.0,
        shares: 30000,
        totalVolume: 30000,
        metadata: { teamCode: 'ENG', flagUrl: getTeam('ENG').flagUrl },
      },
      {
        id: 'out-rsa',
        name: 'South Africa',
        odds: 5.50,
        impliedProbability: 18.2,
        shares: 28000,
        totalVolume: 28000,
        metadata: { teamCode: 'RSA', flagUrl: getTeam('RSA').flagUrl },
      },
      {
        id: 'out-nz',
        name: 'New Zealand',
        odds: 8.00,
        impliedProbability: 12.5,
        shares: 22000,
        totalVolume: 22000,
        metadata: { teamCode: 'NZ', flagUrl: getTeam('NZ').flagUrl },
      },
      {
        id: 'out-pak',
        name: 'Pakistan',
        odds: 9.00,
        impliedProbability: 11.1,
        shares: 20000,
        totalVolume: 20000,
        metadata: { teamCode: 'PAK', flagUrl: getTeam('PAK').flagUrl },
      },
      {
        id: 'out-wi',
        name: 'West Indies',
        odds: 11.00,
        impliedProbability: 9.1,
        shares: 18000,
        totalVolume: 18000,
        metadata: { teamCode: 'WI', flagUrl: getTeam('WI').flagUrl },
      },
      {
        id: 'out-sl',
        name: 'Sri Lanka',
        odds: 17.00,
        impliedProbability: 5.9,
        shares: 12000,
        totalVolume: 12000,
        metadata: { teamCode: 'SL', flagUrl: getTeam('SL').flagUrl },
      },
      {
        id: 'out-afg',
        name: 'Afghanistan',
        odds: 21.00,
        impliedProbability: 4.8,
        shares: 8000,
        totalVolume: 8000,
        metadata: { teamCode: 'AFG', flagUrl: getTeam('AFG').flagUrl },
      },
      {
        id: 'out-ban',
        name: 'Bangladesh',
        odds: 34.00,
        impliedProbability: 2.9,
        shares: 6000,
        totalVolume: 6000,
        metadata: { teamCode: 'BAN', flagUrl: getTeam('BAN').flagUrl },
      },
    ],
  },
  {
    id: 'market-2',
    contractAddress: 'EQBqSpvo_ae2Vg1JqUFj_sz8p9rZKSHfbZEaM-eAQMWRRe6Y',
    marketType: MarketType.MATCH_WINNER,
    status: MarketStatus.ACTIVE,
    title: 'India vs Pakistan - Match Winner',
    description: 'Feb 15 - The marquee Group A clash at R. Premadasa Stadium, Colombo',
    matchId: 13,
    tournamentId: 1,
    totalVolume: 125000,
    liquidityParameter: 150,
    startTime: new Date('2026-02-01'),
    closingTime: new Date('2026-02-15T13:00:00Z'),
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date(),
    metadata: {
      category: 'Match Winner',
      tags: ['match', 'india', 'pakistan', 'group-a'],
    },
    outcomes: [
      {
        id: 'out-ind-win',
        name: 'India',
        odds: 1.57,
        impliedProbability: 63.7,
        shares: 75000,
        totalVolume: 75000,
        metadata: { teamCode: 'IND', flagUrl: getTeam('IND').flagUrl },
      },
      {
        id: 'out-pak-win',
        name: 'Pakistan',
        odds: 2.40,
        impliedProbability: 41.7,
        shares: 50000,
        totalVolume: 50000,
        metadata: { teamCode: 'PAK', flagUrl: getTeam('PAK').flagUrl },
      },
    ],
  },
  // India vs USA - Opening match
  {
    id: 'market-2b',
    contractAddress: 'EQBqSpvo_ae2Vg1JqUFj_sz8p9rZKSHfbZEaM-eAQMWRRe7Z',
    marketType: MarketType.MATCH_WINNER,
    status: MarketStatus.ACTIVE,
    title: 'India vs USA - Match Winner',
    description: 'Feb 7 - Opening match at Wankhede Stadium, Mumbai',
    matchId: 3,
    tournamentId: 1,
    totalVolume: 45000,
    liquidityParameter: 100,
    startTime: new Date('2026-02-01'),
    closingTime: new Date('2026-02-07T13:00:00Z'),
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date(),
    metadata: {
      category: 'Match Winner',
      tags: ['match', 'india', 'usa', 'group-a'],
    },
    outcomes: [
      {
        id: 'out-ind-win-usa',
        name: 'India',
        odds: 1.08,
        impliedProbability: 92.6,
        shares: 35000,
        totalVolume: 35000,
        metadata: { teamCode: 'IND', flagUrl: getTeam('IND').flagUrl },
      },
      {
        id: 'out-usa-win',
        name: 'USA',
        odds: 8.50,
        impliedProbability: 11.8,
        shares: 10000,
        totalVolume: 10000,
        metadata: { teamCode: 'USA', flagUrl: getTeam('USA').flagUrl },
      },
    ],
  },
  // Australia vs Sri Lanka
  {
    id: 'market-2c',
    contractAddress: 'EQBqSpvo_ae2Vg1JqUFj_sz8p9rZKSHfbZEaM-eAQMWRRe8A',
    marketType: MarketType.MATCH_WINNER,
    status: MarketStatus.ACTIVE,
    title: 'Australia vs Sri Lanka - Match Winner',
    description: 'Feb 16 - Group B clash at Pallekele Cricket Stadium, Kandy',
    matchId: 14,
    tournamentId: 1,
    totalVolume: 32000,
    liquidityParameter: 100,
    startTime: new Date('2026-02-01'),
    closingTime: new Date('2026-02-16T09:00:00Z'),
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date(),
    metadata: {
      category: 'Match Winner',
      tags: ['match', 'australia', 'sri-lanka', 'group-b'],
    },
    outcomes: [
      {
        id: 'out-aus-win-sl',
        name: 'Australia',
        odds: 1.45,
        impliedProbability: 69.0,
        shares: 20000,
        totalVolume: 20000,
        metadata: { teamCode: 'AUS', flagUrl: getTeam('AUS').flagUrl },
      },
      {
        id: 'out-sl-win',
        name: 'Sri Lanka',
        odds: 2.75,
        impliedProbability: 36.4,
        shares: 12000,
        totalVolume: 12000,
        metadata: { teamCode: 'SL', flagUrl: getTeam('SL').flagUrl },
      },
    ],
  },
  // England vs West Indies
  {
    id: 'market-2d',
    contractAddress: 'EQBqSpvo_ae2Vg1JqUFj_sz8p9rZKSHfbZEaM-eAQMWRRe9B',
    marketType: MarketType.MATCH_WINNER,
    status: MarketStatus.ACTIVE,
    title: 'England vs West Indies - Match Winner',
    description: 'Feb 16 - Group C clash at Eden Gardens, Kolkata',
    matchId: 15,
    tournamentId: 1,
    totalVolume: 28000,
    liquidityParameter: 100,
    startTime: new Date('2026-02-01'),
    closingTime: new Date('2026-02-16T13:00:00Z'),
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date(),
    metadata: {
      category: 'Match Winner',
      tags: ['match', 'england', 'west-indies', 'group-c'],
    },
    outcomes: [
      {
        id: 'out-eng-win-wi',
        name: 'England',
        odds: 1.62,
        impliedProbability: 61.7,
        shares: 16000,
        totalVolume: 16000,
        metadata: { teamCode: 'ENG', flagUrl: getTeam('ENG').flagUrl },
      },
      {
        id: 'out-wi-win',
        name: 'West Indies',
        odds: 2.30,
        impliedProbability: 43.5,
        shares: 12000,
        totalVolume: 12000,
        metadata: { teamCode: 'WI', flagUrl: getTeam('WI').flagUrl },
      },
    ],
  },
  // Afghanistan vs New Zealand
  {
    id: 'market-2e',
    contractAddress: 'EQBqSpvo_ae2Vg1JqUFj_sz8p9rZKSHfbZEaM-eAQMWRReAC',
    marketType: MarketType.MATCH_WINNER,
    status: MarketStatus.ACTIVE,
    title: 'Afghanistan vs New Zealand - Match Winner',
    description: 'Feb 8 - Group D clash at M.A. Chidambaram Stadium, Chennai',
    matchId: 4,
    tournamentId: 1,
    totalVolume: 22000,
    liquidityParameter: 100,
    startTime: new Date('2026-02-01'),
    closingTime: new Date('2026-02-08T05:00:00Z'),
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date(),
    metadata: {
      category: 'Match Winner',
      tags: ['match', 'afghanistan', 'new-zealand', 'group-d'],
    },
    outcomes: [
      {
        id: 'out-afg-win',
        name: 'Afghanistan',
        odds: 2.50,
        impliedProbability: 40.0,
        shares: 9000,
        totalVolume: 9000,
        metadata: { teamCode: 'AFG', flagUrl: getTeam('AFG').flagUrl },
      },
      {
        id: 'out-nz-win',
        name: 'New Zealand',
        odds: 1.55,
        impliedProbability: 64.5,
        shares: 13000,
        totalVolume: 13000,
        metadata: { teamCode: 'NZ', flagUrl: getTeam('NZ').flagUrl },
      },
    ],
  },
  {
    id: 'market-3',
    contractAddress: 'EQC5s3h3j9ZqK3_FN_n-QJ0z5jNNWqNzLq5VPqLlNvBHPPxz',
    marketType: MarketType.TOTAL_RUNS,
    status: MarketStatus.ACTIVE,
    title: 'India vs Pakistan - Total Match Runs',
    description: 'Total runs scored by both teams (Over/Under 340.5)',
    matchId: 2,
    tournamentId: 1,
    totalVolume: 18000,
    liquidityParameter: 80,
    startTime: new Date('2025-12-10'),
    closingTime: daysFromNow(58),
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date(),
    metadata: {
      category: 'Totals',
      tags: ['match', 'runs', 'total'],
    },
    outcomes: [
      {
        id: 'out-over',
        name: 'Over 340.5',
        shares: 2800,
        totalVolume: 9000,
        ...{ metadata: {} },
      },
      {
        id: 'out-under',
        name: 'Under 340.5',
        shares: 2600,
        totalVolume: 9000,
        ...{ metadata: {} },
      },
    ].map((outcome, idx) => {
      const allShares = [2800, 2600];
      const odds = calculateOdds(allShares, 80);
      return {
        ...outcome,
        odds: odds[idx],
        impliedProbability: (1 / odds[idx]) * 100,
      };
    }),
  },
  {
    id: 'market-4',
    contractAddress: 'EQDnW7u3h3j9ZqKx_FN_n-QJ0z5jNNWqNzLq5VPqLlNv4HqN',
    marketType: MarketType.TOP_BATSMAN,
    status: MarketStatus.ACTIVE,
    title: 'Tournament Top Batsman',
    description: 'Which player will score the most runs in the tournament?',
    tournamentId: 1,
    totalVolume: 32000,
    liquidityParameter: 150,
    startTime: new Date('2025-12-01'),
    closingTime: daysFromNow(50),
    createdAt: new Date('2025-11-15'),
    updatedAt: new Date(),
    metadata: {
      category: 'Tournament Outrights',
      tags: ['tournament', 'batsman', 'runs'],
    },
    outcomes: [
      {
        id: 'out-kohli',
        name: 'Virat Kohli',
        shares: 4500,
        totalVolume: 5500,
        ...{ metadata: { playerName: 'Virat Kohli', teamCode: 'IND' } },
      },
      {
        id: 'out-rohit',
        name: 'Rohit Sharma',
        shares: 4200,
        totalVolume: 5000,
        ...{ metadata: { playerName: 'Rohit Sharma', teamCode: 'IND' } },
      },
      {
        id: 'out-babar',
        name: 'Babar Azam',
        shares: 3800,
        totalVolume: 4500,
        ...{ metadata: { playerName: 'Babar Azam', teamCode: 'PAK' } },
      },
      {
        id: 'out-buttler',
        name: 'Jos Buttler',
        shares: 3500,
        totalVolume: 4200,
        ...{ metadata: { playerName: 'Jos Buttler', teamCode: 'ENG' } },
      },
      {
        id: 'out-head',
        name: 'Travis Head',
        shares: 3200,
        totalVolume: 3800,
        ...{ metadata: { playerName: 'Travis Head', teamCode: 'AUS' } },
      },
    ].map((outcome, idx) => {
      const allShares = [4500, 4200, 3800, 3500, 3200];
      const odds = calculateOdds(allShares, 150);
      return {
        ...outcome,
        odds: odds[idx],
        impliedProbability: (1 / odds[idx]) * 100,
      };
    }),
  },
  {
    id: 'market-5',
    contractAddress: 'EQAs3h3j9ZqK3_FN_n-QJ0z5jNNWqNzLq5VPqLlNvBHPqWx',
    marketType: MarketType.TOP_BOWLER,
    status: MarketStatus.ACTIVE,
    title: 'Tournament Top Bowler',
    description: 'Which bowler will take the most wickets?',
    tournamentId: 1,
    totalVolume: 22000,
    liquidityParameter: 120,
    startTime: new Date('2025-12-01'),
    closingTime: daysFromNow(50),
    createdAt: new Date('2025-11-15'),
    updatedAt: new Date(),
    metadata: {
      category: 'Tournament Outrights',
      tags: ['tournament', 'bowler', 'wickets'],
    },
    outcomes: [
      {
        id: 'out-bumrah',
        name: 'Jasprit Bumrah',
        shares: 3800,
        totalVolume: 4500,
        ...{ metadata: { playerName: 'Jasprit Bumrah', teamCode: 'IND' } },
      },
      {
        id: 'out-rashid',
        name: 'Rashid Khan',
        shares: 3600,
        totalVolume: 4200,
        ...{ metadata: { playerName: 'Rashid Khan', teamCode: 'AFG' } },
      },
      {
        id: 'out-starc',
        name: 'Mitchell Starc',
        shares: 3400,
        totalVolume: 4000,
        ...{ metadata: { playerName: 'Mitchell Starc', teamCode: 'AUS' } },
      },
      {
        id: 'out-archer',
        name: 'Jofra Archer',
        shares: 3200,
        totalVolume: 3800,
        ...{ metadata: { playerName: 'Jofra Archer', teamCode: 'ENG' } },
      },
    ].map((outcome, idx) => {
      const allShares = [3800, 3600, 3400, 3200];
      const odds = calculateOdds(allShares, 120);
      return {
        ...outcome,
        odds: odds[idx],
        impliedProbability: (1 / odds[idx]) * 100,
      };
    }),
  },
  {
    id: 'market-6',
    contractAddress: 'EQBqW7u3h3j9ZqKx_FN_n-QJ0z5jNNWqNzLq5VPqLlNv8KpP',
    marketType: MarketType.MATCH_SIXES,
    status: MarketStatus.ACTIVE,
    title: 'India vs Pakistan - Total Match Sixes',
    description: 'Total sixes hit in the match (Over/Under 15.5)',
    matchId: 2,
    tournamentId: 1,
    totalVolume: 12000,
    liquidityParameter: 60,
    startTime: new Date('2025-12-10'),
    closingTime: daysFromNow(58),
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date(),
    metadata: {
      category: 'Special Markets',
      tags: ['match', 'sixes', 'boundaries'],
    },
    outcomes: [
      {
        id: 'out-over-sixes',
        name: 'Over 15.5',
        shares: 1900,
        totalVolume: 6200,
        ...{ metadata: {} },
      },
      {
        id: 'out-under-sixes',
        name: 'Under 15.5',
        shares: 1800,
        totalVolume: 5800,
        ...{ metadata: {} },
      },
    ].map((outcome, idx) => {
      const allShares = [1900, 1800];
      const odds = calculateOdds(allShares, 60);
      return {
        ...outcome,
        odds: odds[idx],
        impliedProbability: (1 / odds[idx]) * 100,
      };
    }),
  },
];

// Function to simulate live odds updates
export function simulateOddsUpdate(market: Market, outcomeId: string, betAmount: number): Market {
  const updatedOutcomes = market.outcomes.map(outcome => {
    if (outcome.id === outcomeId) {
      const newShares = outcome.shares + betAmount;
      return { ...outcome, shares: newShares, totalVolume: outcome.totalVolume + betAmount };
    }
    return outcome;
  });

  const allShares = updatedOutcomes.map(o => o.shares);
  const odds = calculateOdds(allShares, market.liquidityParameter);

  return {
    ...market,
    outcomes: updatedOutcomes.map((outcome, idx) => ({
      ...outcome,
      odds: odds[idx],
      impliedProbability: (1 / odds[idx]) * 100,
    })),
    totalVolume: market.totalVolume + betAmount,
    updatedAt: new Date(),
  };
}
