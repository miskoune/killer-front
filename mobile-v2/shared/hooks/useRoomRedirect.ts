import { useRouter, usePathname, type RelativePathString } from 'expo-router';
import { useEffect } from 'react';

import { type RoomStatus } from '../types/room';

import { useGetSession } from './useGetSession';

const MAP_ROOM_STATUS_TO_ROUTE = new Map<RoomStatus, string>([
  ['PENDING', 'pending'],
  ['IN_GAME', 'in-game'],
  ['ENDED', 'ended'],
]);

export function useRoomRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useGetSession();

  useEffect(() => {
    if (session.data?.room?.id && session.data.room.status) {
      const roomRoute = MAP_ROOM_STATUS_TO_ROUTE.get(session.data.room.status);

      if (!pathname.includes(roomRoute!)) {
        router.replace(
          `/room/${session.data.room.id}/${roomRoute}` as RelativePathString,
        );
      }
    }
  }, [session.data?.room?.id, session.data?.room?.status, router, pathname]);
}
