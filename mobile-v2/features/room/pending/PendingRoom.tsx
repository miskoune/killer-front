import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventSource from 'react-native-sse';

import LeaveIcon from '@/assets/icons/leave.svg';
import { Avatar } from '@/shared/components/Avatar';
import { Button } from '@/shared/components/Button';
import { FadeInView } from '@/shared/components/FadeInView';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { type Player } from '@/shared/types/player';
import { type Room } from '@/shared/types/room';
import { useTranslation } from '@/translations';

import { ROOM_TOPIC } from '../constants';
import { useGetRoom } from '../hooks/useGetRoom';
import { useLeaveRoom } from '../hooks/useLeaveRoom';

import { EmptyState } from './state/EmptyState';
import { ErrorState } from './state/ErrorState';
import { LoadingState } from './state/LoadingState';

export function PendingRoom() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
          {/* Room Info Section */}
          <View style={styles.roomInfoContainer}>
            <Text style={styles.roomCode}>
              {t('room.join.room.code', { roomCode: room.data?.id })}
            </Text>

            {/* Player count info */}
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>
                {room.data?.players.length === 1
                  ? t('room.players.count_one', {
                      count: room.data?.players.length,
                    })
                  : t('room.players.count_other', {
                      count: room.data?.players.length,
                    })}
              </Text>
              <Text style={styles.statsText}>
                {room.data?.missions.length === 1
                  ? t('room.missions.count_one', {
                      count: room.data?.missions.length,
                    })
                  : t('room.missions.count_other', {
                      count: room.data?.missions.length,
                    })}
              </Text>
            </View>
          </View>

          {/* Players List Section */}
          <View style={styles.playersSection}>
            <Text style={styles.sectionTitle}>{t('room.players.list')}</Text>
            <Text style={styles.sectionDescription}>
              {t('room.players.list.description')}
            </Text>

            <View style={styles.playersContainer}>
              {room.data?.players.map((player: Player) => (
                <View key={player.id} style={styles.playerCard}>
                  <Avatar avatarId={player.avatar} size={60} />
                  <View style={styles.playerInfo}>
                    <View style={styles.playerNameContainer}>
                      <Text style={styles.playerName}>{player.name}</Text>
                      {player.id === room.data?.admin.id && (
                        <Text style={styles.adminBadge}>Admin</Text>
                      )}
                      {player.id === session.data?.id && (
                        <Text style={styles.youBadge}>Vous</Text>
                      )}
                    </View>
                    <Text style={styles.playerStatus}>
                      {player.hasAtLeastOneMission
                        ? t('room.missions.authored.count_one')
                        : t('room.missions.authored.count_zero')}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Game Status Section */}
          <View style={styles.gameStatusSection}>
            <Text style={styles.sectionTitle}>
              {t('room.start.party.conditions')}
            </Text>

            <View style={styles.conditionsContainer}>
              <View style={styles.conditionItem}>
                <Text style={styles.conditionText}>
                  {room.data?.isGameMastered
                    ? t(
                        'room.start.party.three.players.with.game.master.condition',
                      )
                    : t('room.start.party.three.players.condition')}
                </Text>
                <Text
                  style={[
                    styles.conditionStatus,
                    room.data?.hasEnoughPlayers && styles.conditionMet,
                  ]}
                >
                  {room.data?.hasEnoughPlayers ? '✓' : '✗'}
                </Text>
              </View>

              <View style={styles.conditionItem}>
                <Text style={styles.conditionText}>
                  {room.data?.isGameMastered
                    ? t('room.start.party.same.missions.as.players.condition')
                    : t('room.start.party.each.player.has.mission.condition')}
                </Text>
                <Text
                  style={[
                    styles.conditionStatus,
                    room.data?.hasEnoughMissions && styles.conditionMet,
                  ]}
                >
                  {room.data?.hasEnoughMissions ? '✓' : '✗'}
                </Text>
              </View>
            </View>
          </View>
        </FadeInView>
      </ScrollView>

      {/* Bottom Actions */}
      <View
        style={[styles.bottomActions, { paddingBottom: insets.bottom + 20 }]}
      >
        {session.data?.id === room.data?.admin.id && (
          <Button
            color="primary"
            onPress={() => {}}
            text={t('room.start.party.button')}
            disabled={
              !room.data?.hasEnoughPlayers || !room.data?.hasEnoughMissions
            }
          />
        )}

        <Button
          color="secondary"
          onPress={() => {
            router.push(`/room/${roomId}/pending/missions`);
          }}
          text={t('room.manage.missions')}
        />
      </View>
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
  // Room Info Styles
  roomInfoContainer: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  roomCode: {
    fontSize: 16,
    color: COLORS.textSecondaryColor,
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorderColor,
    paddingTop: 15,
  },
  statsText: {
    fontSize: 16,
    color: COLORS.textPrimaryColor,
    fontWeight: '500',
  },

  // Players Section Styles
  playersSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    marginBottom: 15,
  },
  playersContainer: {
    gap: 12,
  },
  playerCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  playerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
  },
  adminBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.buttonPrimaryColor,
    backgroundColor: COLORS.primaryBackgroundColor,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  youBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    backgroundColor: COLORS.buttonSecondaryColor,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  playerStatus: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
  },

  // Game Status Section Styles
  gameStatusSection: {
    marginBottom: 20,
  },
  conditionsContainer: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 15,
    padding: 15,
    gap: 12,
  },
  conditionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conditionText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    marginRight: 10,
  },
  conditionStatus: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondaryColor,
  },
  conditionMet: {
    color: COLORS.buttonPrimaryColor,
  },

  // Bottom Actions Styles
  bottomActions: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.primaryBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorderColor,
    gap: 12,
  },
});
