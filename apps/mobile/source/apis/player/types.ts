import {
  type QueryObserverResult,
  type UseMutationResult,
} from '@tanstack/react-query';

import { type Mission } from '../mission/types';
import { type Room } from '../room/types';
import { type PlayerStatus } from '../types';
import { type RequestError } from '../utils/request-error';

export interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
  avatar: string;
  hasAtLeastOneMission: boolean;
}

export interface Session {
  avatar: string;
  id: number;
  name: string;
  killer: string | null;
  assignedMission: Mission | null;
  authoredMissions: Mission[];
  status: PlayerStatus;
  target: Player | null;
  room: Omit<Room, 'admin' | 'players'> | null;
}

export interface PlayerUpdateInfos {
  id: number;
  name: string;
  room: string | null;
  status: PlayerStatus;
  avatar: string;
}

export interface SessionQuery {
  session: Session | undefined;
  refetchSession(): Promise<QueryObserverResult<Session, unknown>>;
}

export interface UpdatePlayerMutation {
  updatePlayer: UseMutationResult<
    void,
    RequestError,
    Partial<PlayerUpdateInfos>,
    unknown
  >;
}
export interface CreatePlayerMutation {
  createPlayer: UseMutationResult<
    Player,
    unknown,
    Pick<Player, 'name' | 'avatar'>,
    unknown
  >;
}
