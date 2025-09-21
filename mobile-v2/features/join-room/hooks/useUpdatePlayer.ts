import { useMutation } from '@tanstack/react-query';

import { PLAYER_ENDPOINT } from '@/shared/constants/endpoints';
import { type Session } from '@/shared/types/session';
import { request } from '@/shared/utils/apis';

interface SessionUpdate {
  id: number;
  room: string;
}

export function useUpdatePlayer() {
  const mutationFn = (session: Partial<SessionUpdate>) => {
    return request<Session>({
      url: `${PLAYER_ENDPOINT}/${session.id}`,
      method: 'PATCH',
      requestInit: { body: JSON.stringify(session) },
    });
  };

  return useMutation({ mutationFn });
}
