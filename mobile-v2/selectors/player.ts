import { type PlayerStore } from '@/store/player';

export const selectPlayer = (state: PlayerStore) => state.player;
export const selectUpdatePlayer = (state: PlayerStore) => state.updatePlayer;
