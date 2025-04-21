import { PLAYER_ENDPOINT, SESSION_ENDPOINT } from '../constants';
import { createRequest } from '../utils/create-request';

import { type Player, type Session } from './types';

export function getSessionRequest(): Promise<Session> {
  return createRequest({ url: SESSION_ENDPOINT, method: 'GET' });
}

export async function createPlayerRequest({
  name,
  avatar,
}: Pick<Player, 'name' | 'avatar'>): Promise<Player> {
  return createRequest({
    url: PLAYER_ENDPOINT,
    method: 'POST',
    requestInit: { body: JSON.stringify({ name, avatar }) },
  });
}

export async function updatePlayerRequest(
  player: Partial<Player>,
): Promise<void> {
  await createRequest({
    url: `${PLAYER_ENDPOINT}/${player.id}`,
    method: 'PATCH',
    requestInit: { body: JSON.stringify(player) },
  });
}
