import { useQuery } from '@tanstack/react-query';

import { type Player } from '@/requests/types';
import { request } from '@/utils/apis';

export function useGetSession() {
  const queryFn = () => {
    return request<Player>({
      url: 'https://api.killerparty.app/player/me',
      method: 'GET',
    });
  };

  return useQuery({
    queryKey: ['session'],
    queryFn,
  });
}
