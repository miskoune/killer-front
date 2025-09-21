/**
 * Room is a type that represents the room state.
 */
export type RoomStatus = 'PENDING' | 'IN_GAME' | 'ENDED';

export interface Session {
  avatar: string;
  id: number;
  name: string;
  room: Room | null;
  status: PlayerStatus;
  token: string;
  authoredMissions?: Mission[];
}
export interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
  avatar: string;
  hasAtLeastOneMission: boolean;
}

export interface SessionUpdate {
  id: number;
  room: string | null;
}

export interface Mission {
  id: number;
  content: string;
}

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
}

export type PlayerStatus = 'ALIVE' | 'KILLED' | 'SPECTATING';
