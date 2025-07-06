import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventSource from 'react-native-sse';

import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { FadeInView } from '@/components/FadeInView';
import { Header } from '@/components/Header';
import { ROOM_TOPIC } from '@/constants/sse';
import { COLORS } from '@/constants/theme';
import { useGetSession } from '@/features/onboarding/queries';
import { useGetRoom } from '@/features/room/queries';
import { type Room, type Player } from '@/requests/types';
import { useTranslation } from '@/translations';

export default function PendingRoom() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { data: session, refetch: refetchSession } = useGetSession();
  const {
    data: room,
    isLoading,
    error,
    refetch: refetchRoom,
  } = useGetRoom(roomId);

  /**
   * Listen to SSE events emits in the Room page.
   */
  useEffect(
    function listenEvents() {
      const roomEventSource = new EventSource(`${ROOM_TOPIC}/${roomId}`);

      roomEventSource.addEventListener('message', (event) => {
        if (event.type === 'message' && event.data) {
          const roomInfos: Room = JSON.parse(event.data);

          const isPlayerInRoom = roomInfos.players.some(
            ({ id }) => id === session?.id,
          );

          if (isPlayerInRoom) {
            refetchRoom().then(() => {
              refetchSession();
            });
          } else {
            refetchSession();
          }
        }
      });

      return () => roomEventSource.close();
    },
    [roomId, session?.id, refetchRoom, refetchSession],
  );

  // Handle error state
  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Erreur" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Impossible de charger la partie. Veuillez réessayer.
          </Text>
        </View>
      </View>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="Chargement..." />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.buttonPrimaryColor} />
          <Text style={styles.loadingText}>Chargement de la partie...</Text>
        </View>
      </View>
    );
  }

  // Handle no room data
  if (!room) {
    return (
      <View style={styles.container}>
        <Header title="Partie introuvable" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Cette partie n&apos;existe pas.</Text>
        </View>
      </View>
    );
  }
  const isAdmin = session?.id === room.admin.id;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.roomName}>{room.name.toUpperCase()}</Text>

        <FadeInView style={styles.content}>
          {/* Room Info Section */}
          <View style={styles.roomInfoContainer}>
            <Text style={styles.roomCode}>
              {t('room.join.room.code', { roomCode: room.id })}
            </Text>

            {/* Player count info */}
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>
                {room.players.length === 1
                  ? t('room.players.count_one', { count: room.players.length })
                  : t('room.players.count_other', {
                      count: room.players.length,
                    })}
              </Text>
              <Text style={styles.statsText}>
                {room.missions.length === 1
                  ? t('room.missions.count_one', {
                      count: room.missions.length,
                    })
                  : t('room.missions.count_other', {
                      count: room.missions.length,
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
              {room.players.map((player: Player) => (
                <View key={player.id} style={styles.playerCard}>
                  <Avatar avatarId={player.avatar} size={60} />
                  <View style={styles.playerInfo}>
                    <View style={styles.playerNameContainer}>
                      <Text style={styles.playerName}>{player.name}</Text>
                      {player.id === room.admin.id && (
                        <Text style={styles.adminBadge}>Admin</Text>
                      )}
                      {player.id === session?.id && (
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
                  {room.isGameMastered
                    ? t(
                        'room.start.party.three.players.with.game.master.condition',
                      )
                    : t('room.start.party.three.players.condition')}
                </Text>
                <Text
                  style={[
                    styles.conditionStatus,
                    room.hasEnoughPlayers && styles.conditionMet,
                  ]}
                >
                  {room.hasEnoughPlayers ? '✓' : '✗'}
                </Text>
              </View>

              <View style={styles.conditionItem}>
                <Text style={styles.conditionText}>
                  {room.isGameMastered
                    ? t('room.start.party.same.missions.as.players.condition')
                    : t('room.start.party.each.player.has.mission.condition')}
                </Text>
                <Text
                  style={[
                    styles.conditionStatus,
                    room.hasEnoughMissions && styles.conditionMet,
                  ]}
                >
                  {room.hasEnoughMissions ? '✓' : '✗'}
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
        {isAdmin && (
          <Button
            color="primary"
            onPress={() => {
              // TODO: Implement start game functionality
              console.log('Start game');
            }}
            text={t('room.start.party.button')}
            disabled={!room.hasEnoughPlayers || !room.hasEnoughMissions}
          />
        )}

        <Button
          color="secondary"
          onPress={() => {
            // TODO: Implement manage missions functionality
            console.log('Manage missions');
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

  roomName: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    textAlign: 'center',
    marginVertical: 20,
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
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    textAlign: 'center',
    marginBottom: 10,
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
