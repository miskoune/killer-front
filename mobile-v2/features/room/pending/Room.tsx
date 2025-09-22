import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';

import SettingsIcon from '@/shared/assets/icons/settings.svg';
import { FadeInView } from '@/shared/components/FadeInView';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';

import { useGetRoom } from '../hooks/useGetRoom';
import { useLeaveRoom } from '../hooks/useLeaveRoom';
import { ErrorState } from '../state/ErrorState';
import { LoadingState } from '../state/LoadingState';

import { FooterActions } from './FooterActions';
import { Players } from './Players';
import { RoomCode } from './RoomCode';

export function PendingRoom() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const session = useGetSession();
  const room = useGetRoom(roomId);
  const { handleError } = useErrorHandler();
  const leaveRoom = useLeaveRoom();

  const handleRefresh = () => {
    Promise.all([room.refetch(), session.refetch()]);
  };

  const handleLeaveRoom = () => {
    leaveRoom.mutate(session.data?.id, { onError: handleError });
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
            refreshing={room.isPending}
            onRefresh={handleRefresh}
          />
        }
      >
        <Header
          title="En attente des joueurs"
          rightAction={{
            icon: SettingsIcon,
            onPress: () => router.push(`/room/${roomId}/pending/settings`),
          }}
        />

        <FadeInView style={styles.content}>
          <RoomCode roomCode={room.data?.id} />
          <Players roomId={room.data?.id} />
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
    marginTop: -20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
