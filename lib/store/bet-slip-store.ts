import { create } from 'zustand';
import { BetSlipItem, Market } from '@/types/markets';
import { persist } from 'zustand/middleware';

interface BetSlipStore {
  items: BetSlipItem[];
  addItem: (market: Market, outcomeId: string) => void;
  removeItem: (id: string) => void;
  updateAmount: (id: string, amount: number) => void;
  clearItems: () => void;
  getTotalStake: () => number;
  getPotentialReturn: () => number;
}

export const useBetSlipStore = create<BetSlipStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (market, outcomeId) => {
        const outcome = market.outcomes.find((o) => o.id === outcomeId);
        if (!outcome) return;

        const existingItem = get().items.find(
          (item) => item.market.id === market.id && item.outcomeId === outcomeId
        );

        if (existingItem) {
          // If already exists, just update amount
          set((state) => ({
            items: state.items.map((item) =>
              item.id === existingItem.id
                ? { ...item, amount: item.amount + 10 }
                : item
            ),
          }));
        } else {
          // Add new item
          const newItem: BetSlipItem = {
            id: `${market.id}-${outcomeId}-${Date.now()}`,
            market,
            outcomeId,
            outcomeName: outcome.name,
            odds: outcome.odds,
            amount: 10,
            potentialReturn: 10 * outcome.odds,
          };

          set((state) => ({
            items: [...state.items, newItem],
          }));
        }
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateAmount: (id, amount) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  amount,
                  potentialReturn: amount * item.odds,
                }
              : item
          ),
        })),

      clearItems: () => set({ items: [] }),

      getTotalStake: () => {
        return get().items.reduce((sum, item) => sum + item.amount, 0);
      },

      getPotentialReturn: () => {
        return get().items.reduce((sum, item) => sum + item.potentialReturn, 0);
      },
    }),
    {
      name: 'bet-slip-storage',
    }
  )
);
