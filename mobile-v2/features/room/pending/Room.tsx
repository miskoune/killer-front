import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import EventSource from 'react-native-sse';

import { FadeInView } from '@/shared/components/FadeInView';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { type Room } from '@/shared/types/room';

import { ROOM_TOPIC } from '../constants';
import { useGetRoom } from '../hooks/useGetRoom';
import { useLeaveRoom } from '../hooks/useLeaveRoom';
import { ErrorState } from '../state/ErrorState';
import { LoadingState } from '../state/LoadingState';

import { FooterActions } from './FooterActions';
import { GameStatus } from './GameStatus';
import SettingsIcon from './icons/settings.svg';
import { Players } from './Players';
import { RoomCode } from './RoomCode';

export function PendingRoom() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const session = useGetSession();
  const room = useGetRoom(roomId);
  const { handleError } = useErrorHandler();
  const leaveRoom = useLeaveRoom();

  useEffect(
    function listenEvents() {
      const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomId}`);

      roomEventSource.addEventListener('message', (event) => {
        if (event.type === 'message' && event.data) {
          const roomInfos: Room = JSON.parse(event.data);

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
    },
    [roomId, session.data?.id, room.refetch, session.refetch],
  );

  const handleRefresh = () => {
    Promise.all([room.refetch(), session.refetch()]);
  };

  const handleLeaveRoom = () => {
    leaveRoom.mutate(session.data?.id, {
      onError: handleError,
      onSuccess: () => {
        router.replace('/');
      },
    });
  };

  if (room.isPending) {
    return <LoadingState />;
  }

  if (room.error) {
    return (
      <ErrorState
        refresh={handleRefresh}
        refreshLoading={room.isFetching}
        leaveRoomLoading={leaveRoom.isPending}
        leaveRoom={handleLeaveRoom}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={room.isFetching}
            onRefresh={handleRefresh}
          />
        }
      >
        <Header
          title={room.data?.name.toUpperCase()}
          rightAction={{
            icon: SettingsIcon,
            onPress: () => router.push(`/room/${roomId}/pending/settings`),
          }}
        />

        <FadeInView style={styles.content}>
          <RoomCode roomCode={room.data?.id} />
          <Players roomId={room.data?.id} />
          <GameStatus roomId={room.data?.id} />
        </FadeInView>
      </ScrollView>

      <FooterActions roomId={room.data?.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
