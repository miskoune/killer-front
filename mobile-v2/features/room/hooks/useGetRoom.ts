import { useQuery } from '@tanstack/react-query';

import { ROOM_ENDPOINT } from '@/shared/constants/endpoints';
import { type Room } from '@/shared/types/room';
import { request } from '@/shared/utils/apis';
import { wait } from '@/shared/utils/wait';

export function useGetRoom(roomId: string) {
  const queryFn = async () => {
    await wait(2000);
    return null;
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
