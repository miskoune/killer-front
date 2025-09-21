import { useQuery } from '@tanstack/react-query';

import { ROOM_ENDPOINT } from '@/shared/constants/endpoints';
import { type Room } from '@/shared/types/room';
import { request } from '@/shared/utils/request';

export function useGetRoom(roomId: string) {
  const queryFn = async () => {
    return request<Room>({
      url: `${ROOM_ENDPOINT}/${roomId}`,
      method: 'GET',
    });
  };

  return useQuery({
    queryKey: ['room', roomId],
    queryFn,
    enabled: !!roomId,
  });
}
