import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import EventSource from 'react-native-sse';

import { useGetRoom } from '@/features/room/hooks/useGetRoom';

import { ROOM_TOPIC } from '../constants/sse';
import { type Room } from '../types/room';

import { useGetSession } from './useGetSession';

export function useRoomEvents() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const session = useGetSession();
  const room = useGetRoom(roomId);

  useEffect(() => {
    const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomId}`);

    roomEventSource.addEventListener('message', (event) => {
      if (event.type === 'message' && event.data) {
        const roomInfos: Room = JSON.parse(event.data);

        // eslint-disable-next-line no-console
        console.log('roomInfos', roomInfos);

        const isPlayerInRoom = roomInfos.players.some(
          ({ id }) => id === session.data?.id,
        );

        if (isPlayerInRoom) {
          room.refetch().then(() => {
            session.refetch();
          });
        } else {
          session.refetch();
        }
      }
    });

    return () => roomEventSource.close();
  }, [roomId, session.data?.id, room.refetch, session.refetch]);
}
