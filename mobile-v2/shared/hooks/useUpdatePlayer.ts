import { useMutation } from '@tanstack/react-query';

import { PLAYER_ENDPOINT } from '@/shared/constants/endpoints';
import { type Session } from '@/shared/types/session';
import { request } from '@/shared/utils/request';

import { SHOW_LOADING_WAIT_TIME } from '../constants/timers';
import { type PlayerStatus } from '../types/player';
import { wait } from '../utils/wait';

interface SessionUpdate {
  id: number;
  room: string;
  name: string;
  avatar: string;
  status: PlayerStatus;
}

export function useUpdatePlayer() {
  const mutationFn = async (session: Partial<SessionUpdate>) => {
    await wait(SHOW_LOADING_WAIT_TIME);

    return request<Session>({
      url: `${PLAYER_ENDPOINT}/${session.id}`,
      method: 'PATCH',
      requestInit: { body: JSON.stringify(session) },
    });
  };

  return useMutation({ mutationFn });
}
