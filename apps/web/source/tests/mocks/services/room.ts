import { http, HttpResponse } from 'msw';

import { ROOM_ENDPOINT } from '@/constants/endpoints';
import { type Player } from '@/services/player/types';
import { type Room } from '@/services/room/types';

export function createRoom() {
  return http.post(ROOM_ENDPOINT, async ({ request }) => {
    await request.json();

    return HttpResponse.json();
  });
}

export function deleteRoom(roomCode: string) {
  return http.delete(`${ROOM_ENDPOINT}/${roomCode}`, async ({ request }) => {
    await request.json();

    return HttpResponse.json();
  });
}

export function getPlayersRoom(roomCode: string, players: Player[] = []) {
  return http.get(
    `${ROOM_ENDPOINT}/${roomCode}/players`,
    async ({ request }) => {
      await request.json();

      return HttpResponse.json(players);
    },
  );
}

export function getRoomSession(roomCode: string, roomSession?: Room) {
  return http.get(`${ROOM_ENDPOINT}/${roomCode}`, async ({ request }) => {
    await request.json();

    const pageParams = new URLSearchParams(window.location.search);
    const scenario = pageParams.get('scenario');

    if (scenario === 'room-not-found') {
      return HttpResponse.json(null, { status: 404 });
    }

    return HttpResponse.json(roomSession);
  });
}

export function startParty(roomCode: string) {
  return http.patch(`${ROOM_ENDPOINT}/${roomCode}`, async ({ request }) => {
    await request.json();

    return HttpResponse.json();
  });
}
