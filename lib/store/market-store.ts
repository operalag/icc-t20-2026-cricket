import { create } from 'zustand';
import { Market, MarketStatus, MarketType } from '@/types/markets';
import { mockMarkets, simulateOddsUpdate } from '@/lib/data/mock-data';

interface MarketFilters {
  status: MarketStatus[];
  matchId: number | null;
  marketType: MarketType | null;
  search: string;
}

interface MarketStore {
  // State
  markets: Market[];
  selectedMarket: Market | null;
  filters: MarketFilters;
  loading: boolean;
  error: string | null;

  // Actions
  setMarkets: (markets: Market[]) => void;
  updateMarket: (id: string, updates: Partial<Market>) => void;
  selectMarket: (id: string) => void;
  setFilters: (filters: Partial<MarketFilters>) => void;
  fetchMarkets: () => Promise<void>;
  simulateBet: (marketId: string, outcomeId: string, amount: number) => void;
}

export const useMarketStore = create<MarketStore>((set, get) => ({
  markets: [],
  selectedMarket: null,
  filters: {
    status: [MarketStatus.ACTIVE],
    matchId: null,
    marketType: null,
    search: '',
  },
  loading: false,
  error: null,

  setMarkets: (markets) => set({ markets }),

  updateMarket: (id, updates) =>
    set((state) => ({
      markets: state.markets.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),

  selectMarket: (id) =>
    set((state) => ({
      selectedMarket: state.markets.find((m) => m.id === id) || null,
    })),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  fetchMarkets: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ markets: mockMarkets, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch markets', loading: false });
    }
  },

  simulateBet: (marketId, outcomeId, amount) => {
    const market = get().markets.find((m) => m.id === marketId);
    if (!market) return;

    const updatedMarket = simulateOddsUpdate(market, outcomeId, amount);
    get().updateMarket(marketId, updatedMarket);
  },
}));
