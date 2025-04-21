import { ROOM_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';

import { RoomStatus } from './constants';
import { type CreateRoomParams, type Room } from './types';

const { POST, GET, DELETE, PATCH } = Method;

export function createRoomRequest({
  isGameMastered,
}: CreateRoomParams): Promise<Room> {
  return request({
    url: ROOM_ENDPOINT,
    method: POST,
    requestInit: {
      body: JSON.stringify({ isGameMastered }),
    },
  });
}

export function deleteRoomRequest(roomCode: string): Promise<void> {
  return request({ url: `${ROOM_ENDPOINT}/${roomCode}`, method: DELETE });
}

export function getRoomRequest(roomCode: string): Promise<Room> {
  return request({ url: `${ROOM_ENDPOINT}/${roomCode}`, method: GET });
}

export function startPartyRequest(roomCode: string): Promise<void> {
  return request({
    url: `${ROOM_ENDPOINT}/${roomCode}`,
    method: PATCH,
    requestInit: {
      body: JSON.stringify({ status: RoomStatus.IN_GAME }),
    },
  });
}
