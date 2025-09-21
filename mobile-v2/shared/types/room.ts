import { type Mission } from './mission';
import { type Player } from './player';

export type RoomStatus = 'PENDING' | 'IN_GAME' | 'ENDED';

export interface Room {
  id: string;
  missions: Mission[];
  name: string;
  status: RoomStatus;
  admin: Player;
  players: Player[];
  winner: Player | null;
  hasEnoughMissions: boolean;
  hasEnoughPlayers: boolean;
  isGameMastered: boolean;
  allPlayersAddedMissions: boolean;
}
