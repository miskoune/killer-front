import {
  type QueryObserverResult,
  type UseMutationResult,
} from '@tanstack/react-query';

import { type Player } from '@/services/player/types';

import { type Mission } from '../mission/types';

import { type RoomStatus } from './constants';

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

export interface CreateRoomParams {
  isGameMastered: boolean;
}

export interface CreateRoomMutation {
  createRoom: UseMutationResult<Room, unknown, CreateRoomParams, unknown>;
}

export interface DeleteRoomMutation {
  deleteRoom: UseMutationResult<void, unknown, string, unknown>;
}

export interface StartPartyMutation {
  startParty: UseMutationResult<void, unknown, string, unknown>;
}

export interface RoomQuery {
  room: Room | undefined;
  refetchRoom(): Promise<QueryObserverResult<Room, unknown>>;
}
