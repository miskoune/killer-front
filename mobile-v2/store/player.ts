import { create } from 'zustand';

import { type Player } from '@/requests/types';

export interface PlayerStore {
  player: Partial<Player> | null;
  updatePlayer: (player: Partial<Player>) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  player: { avatar: 'mummy' },
  updatePlayer: (player: Partial<Player>) =>
    set((state) => ({ player: { ...state.player, ...player } })),
}));
