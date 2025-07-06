import { useQuery } from '@tanstack/react-query';

import { type Room } from '@/requests/types';
import { request } from '@/utils/apis';

export function useGetRoom(roomId: string) {
  const queryFn = () => {
    return request<Room>({
      url: `https://api.killerparty.app/room/${roomId}`,
      method: 'GET',
    });
  };

  return useQuery({
    queryKey: ['room', roomId],
    queryFn,
    enabled: !!roomId,
  });
}
