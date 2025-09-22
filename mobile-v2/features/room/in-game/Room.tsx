import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';

import { FadeInView } from '@/shared/components/FadeInView';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';

import { useGetRoom } from '../hooks/useGetRoom';
import { useLeaveRoom } from '../hooks/useLeaveRoom';
import { ErrorState } from '../state/ErrorState';
import { LoadingState } from '../state/LoadingState';

import { ConfirmKill } from './ConfirmKill';
import SettingsIcon from './icons/settings.svg';
import { MissionView } from './MissionView';

export function InGameRoom() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const session = useGetSession();
  const room = useGetRoom(roomId);
  const leaveRoom = useLeaveRoom();
  const { handleError } = useErrorHandler();
  const router = useRouter();

  const handleRefresh = () => {
    session.refetch();
  };

  const handleLeaveRoom = () => {
    leaveRoom.mutate(session.data?.id, { onError: handleError });
  };

  const handleGoToSettings = () => {
    router.push(`/room/${roomId}/in-game/settings`);
  };

  if (room.isFetching) {
    return <LoadingState />;
  }

  if (room.error || !session.data?.target || !session.data.assignedMission) {
    return (
      <ErrorState
        refresh={handleRefresh}
        leaveRoom={handleLeaveRoom}
        refreshLoading={room.isFetching}
        leaveRoomLoading={false}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FadeInView style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={session.isFetching}
              onRefresh={session.refetch}
            />
          }
        >
          <Header
            title="Survivre ou mourir"
            rightAction={{
              icon: SettingsIcon,
              onPress: handleGoToSettings,
            }}
          />
          <MissionView
            mission={session.data.assignedMission}
            targetPlayer={session.data.target}
          />
        </ScrollView>
        <ConfirmKill session={session.data} />
      </FadeInView>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingText: {
    color: COLORS.textSecondaryColor,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: COLORS.textPrimaryColor,
    fontSize: 16,
    textAlign: 'center',
  },
});
