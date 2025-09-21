import { useQuery } from '@tanstack/react-query';

import { PLAYER_ENDPOINT } from '@/constants/endpoints';
import { type Session } from '@/shared/types/session';
import { request } from '@/shared/utils/apis';

export function useGetSession() {
  const queryFn = () => {
    return request<Session>({
      url: `${PLAYER_ENDPOINT}/me`,
      method: 'GET',
    });
  };

  return useQuery({
    queryKey: ['session'],
    queryFn,
  });
}
