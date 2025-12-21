import { create } from 'zustand';

interface WalletStore {
  address: string | null;
  balance: number;
  connected: boolean;
  connecting: boolean;

  setAddress: (address: string | null) => void;
  setBalance: (balance: number) => void;
  setConnected: (connected: boolean) => void;
  setConnecting: (connecting: boolean) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  address: null,
  balance: 0,
  connected: false,
  connecting: false,

  setAddress: (address) => set({ address, connected: !!address }),
  setBalance: (balance) => set({ balance }),
  setConnected: (connected) => set({ connected }),
  setConnecting: (connecting) => set({ connecting }),

  disconnect: () => set({
    address: null,
    balance: 0,
    connected: false,
    connecting: false,
  }),
}));
