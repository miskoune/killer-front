import { http, HttpResponse } from 'msw';

import { PLAYER_ENDPOINT, SESSION_ENDPOINT } from '@/constants/endpoints';
import { ErrorCode } from '@/constants/errors';
import { type Session } from '@/services/player/types';

export function getPlayerSession(session: Session | null) {
  return http.get(SESSION_ENDPOINT, async ({ request }) => {
    await request.json();

    return HttpResponse.json(session);
  });
}

export function createPlayer() {
  return http.post(PLAYER_ENDPOINT, async ({ request }) => {
    await request.json();

    return HttpResponse.json({});
  });
}

export function updatePlayer(playerId: string) {
  return http.patch(`${PLAYER_ENDPOINT}/${playerId}`, async ({ request }) => {
    await request.json();

    const pageParams = new URLSearchParams(window.location.search);
    const scenario = pageParams.get('scenario');

    if (scenario === 'room-not-found') {
      return HttpResponse.json(null, { status: 404 });
    }

    if (scenario === 'pseudo-already-used') {
      return HttpResponse.json(
        { detail: ErrorCode.ALREADY_EXIST },
        { status: 400 },
      );
    }

    return HttpResponse.json({});
  });
}
