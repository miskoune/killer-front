import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import EventSource from 'react-native-sse';

import LeaveIcon from '@/assets/icons/leave.svg';
import { FadeInView } from '@/shared/components/FadeInView';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { type Room } from '@/shared/types/room';
import { useTranslation } from '@/translations';

import { ROOM_TOPIC } from '../constants';
import { useGetRoom } from '../hooks/useGetRoom';
import { useLeaveRoom } from '../hooks/useLeaveRoom';

import { FooterActions } from './FooterActions';
import { GameStatus } from './GameStatus';
import { Players } from './Players';
import { RoomCode } from './RoomCode';
import { EmptyState } from './state/EmptyState';
import { ErrorState } from './state/ErrorState';
import { LoadingState } from './state/LoadingState';

export function PendingRoom() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const { handleError } = useErrorHandler();
  const session = useGetSession();
  const room = useGetRoom(roomId);
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
      onSuccess: () => router.replace('/'),
    });
  };

  const confirmLeaveRoom = () => {
    Alert.alert(
      t('alert.leave.warning.title'),
      t('alert.leave.warning.description'),
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: t('room.leave.confirm.button'),
          style: 'destructive',
          onPress: handleLeaveRoom,
        },
      ],
    );
  };

  if (room.isLoading) {
    return <LoadingState />;
  }

  if (room.error) {
    return (
      <ErrorState
        refresh={handleRefresh}
        refreshLoading={room.isPending}
        leaveRoomLoading={leaveRoom.isPending}
        leaveRoom={handleLeaveRoom}
      />
    );
  }

  if (!room.data) {
    return (
      <EmptyState
        refresh={handleRefresh}
        refreshLoading={room.isPending}
        leaveRoomLoading={leaveRoom.isPending}
        leaveRoom={handleLeaveRoom}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={room.data?.name.toUpperCase()}
        rightAction={{
          icon: LeaveIcon,
          onPress: confirmLeaveRoom,
          loading: leaveRoom.isPending,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={room.isPending}
            onRefresh={handleRefresh}
          />
        }
      >
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
