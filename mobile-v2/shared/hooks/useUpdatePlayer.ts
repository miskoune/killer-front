import { useMutation } from '@tanstack/react-query';

import { PLAYER_ENDPOINT } from '@/shared/constants/endpoints';
import { type Session } from '@/shared/types/session';
import { request } from '@/shared/utils/request';

import { UPDATE_PLAYER_WAIT_TIME } from '../constants/timers';
import { wait } from '../utils/wait';

interface SessionUpdate {
  id: number;
  room: string;
  name: string;
  avatar: string;
}

export function useUpdatePlayer() {
  const mutationFn = async (session: Partial<SessionUpdate>) => {
    // Prevent glitch effect
    await wait(UPDATE_PLAYER_WAIT_TIME);

    return request<Session>({
      url: `${PLAYER_ENDPOINT}/${session.id}`,
      method: 'PATCH',
      requestInit: { body: JSON.stringify(session) },
    });
  };

  return useMutation({ mutationFn });
}
