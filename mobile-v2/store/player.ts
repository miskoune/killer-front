import { create } from 'zustand';

import { type Player } from '@/shared/types/player';

export interface PlayerStore {
  player: Partial<Player> | null;
  updatePlayer: (player: Partial<Player>) => void;
  clearPlayer: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  player: { avatar: 'mummy' },
  updatePlayer: (player: Partial<Player>) =>
    set((state) => ({ player: { ...state.player, ...player } })),
  clearPlayer: () => set({ player: null }),
}));
