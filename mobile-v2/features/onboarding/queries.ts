import { useQuery } from '@tanstack/react-query';

import { type Session } from '@/requests/types';
import { request } from '@/utils/apis';

export function useGetSession() {
  const queryFn = () => {
    return request<Session>({
      url: 'https://api.killerparty.app/player/me',
      method: 'GET',
    });
  };

  return useQuery({
    queryKey: ['session'],
    queryFn,
  });
}
