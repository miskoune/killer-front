import { useQuery } from '@tanstack/react-query';

import { getRoomRequest } from './requests';
import { type RoomQuery } from './types';

export function useRoom(roomCode: string): RoomQuery {
  const { data: room, refetch: refetchRoom } = useQuery({
    queryKey: ['room', roomCode],
    queryFn: () => getRoomRequest(roomCode),
  });

  return { room, refetchRoom };
}
