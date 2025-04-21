import { ROOM_ENDPOINT } from '../constants';
import { createRequest } from '../utils/create-request';

import { type CreateRoomParams, type Room } from './types';

export function createRoomRequest({
  isGameMastered,
}: CreateRoomParams): Promise<Room> {
  return createRequest({
    url: ROOM_ENDPOINT,
    method: 'POST',
    requestInit: {
      body: JSON.stringify({ isGameMastered }),
    },
  });
}

export function deleteRoomRequest(roomCode: string): Promise<void> {
  return createRequest({
    url: `${ROOM_ENDPOINT}/${roomCode}`,
    method: 'DELETE',
  });
}

export function getRoomRequest(roomCode: string): Promise<Room> {
  return createRequest({ url: `${ROOM_ENDPOINT}/${roomCode}`, method: 'GET' });
}

export function startPartyRequest(roomCode: string): Promise<void> {
  return createRequest({
    url: `${ROOM_ENDPOINT}/${roomCode}`,
    method: 'PATCH',
    requestInit: {
      body: JSON.stringify({ status: 'IN_GAME' }),
    },
  });
}
