import { create } from 'zustand';

import { type Player } from '@/shared/types/player';

interface PlayerStore {
  player: Partial<Player> | null;
  updatePlayer: (player: Partial<Player>) => void;
}

/**
 * Player Store
 */
export const usePlayerStore = create<PlayerStore>((set) => ({
  player: { avatar: 'mummy' },
  updatePlayer: (player: Partial<Player>) =>
    set((state) => ({ player: { ...state.player, ...player } })),
}));

/**
 * Player Selectors
 */
export const selectPlayer = (state: PlayerStore) => state.player;
export const selectUpdatePlayer = (state: PlayerStore) => state.updatePlayer;
