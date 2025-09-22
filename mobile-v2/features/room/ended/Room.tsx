import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/shared/components/Avatar';
import { Button } from '@/shared/components/Button';
import { FadeInView } from '@/shared/components/FadeInView';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { type Player } from '@/shared/types/player';

import { useGetRoom } from '../hooks/useGetRoom';
import { useLeaveRoom } from '../hooks/useLeaveRoom';
import { ErrorState } from '../state/ErrorState';
import { LoadingState } from '../state/LoadingState';

export function EndedRoom() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const session = useGetSession();
  const room = useGetRoom(roomId);
  const leaveRoom = useLeaveRoom();
  const { handleError } = useErrorHandler();
  const insets = useSafeAreaInsets();
  const handleRefresh = () => {
    Promise.all([room.refetch(), session.refetch()]);
  };

  const getPlayerStatusText = (status: Player['status']) => {
    switch (status) {
      case 'ALIVE':
        return 'Vivant';
      case 'KILLED':
        return 'Éliminé';
      case 'SPECTATING':
        return 'Spectateur';
      default:
        return status;
    }
  };

  const getPlayerStatusColor = (status: Player['status']) => {
    switch (status) {
      case 'ALIVE':
        return COLORS.buttonPrimaryColor;
      case 'KILLED':
        return COLORS.errorColor;
      case 'SPECTATING':
        return COLORS.textSecondaryColor;
      default:
        return COLORS.textSecondaryColor;
    }
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
        leaveRoom={() => router.push('/')}
        leaveRoomLoading={false}
      />
    );
  }

  const sortedPlayers = room.data.players.sort((a, b) => {
    if (a.id === room.data.winner?.id) return -1;
    if (b.id === room.data.winner?.id) return 1;
    return 0;
  });

  return (
    <View style={styles.container}>
      <FadeInView style={styles.content}>
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
          {/* Winner Section */}
          {room.data?.winner && (
            <View style={styles.winnerSection}>
              <Text style={styles.winnerTitle}>🏆 Vainqueur</Text>
              <View style={styles.winnerCard}>
                <Avatar avatarId={room.data.winner.avatar} size={100} />
                <View style={styles.winnerInfo}>
                  <Text style={styles.winnerName}>{room.data.winner.name}</Text>
                  <Text style={styles.winnerSubtitle}>Félicitations !</Text>
                </View>
              </View>
            </View>
          )}

          {/* Game Summary */}
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>Résumé de la partie</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryNumber}>
                  {room.data?.players.length}
                </Text>
                <Text style={styles.summaryLabel}>Joueurs</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryNumber}>
                  {room.data?.missions.length}
                </Text>
                <Text style={styles.summaryLabel}>Missions</Text>
              </View>
            </View>
          </View>

          {/* Players Final Status */}
          <View style={styles.playersSection}>
            <Text style={styles.sectionTitle}>Classement final</Text>
            <View style={styles.playersContainer}>
              {sortedPlayers.map((player: Player, index: number) => (
                <View key={player.id} style={styles.playerCard}>
                  <View style={styles.playerRank}>
                    <Text style={styles.rankNumber}>{index + 1}</Text>
                  </View>
                  <Avatar avatarId={player.avatar} size={60} />
                  <View style={styles.playerInfo}>
                    <View style={styles.playerNameContainer}>
                      <Text style={styles.playerName}>{player.name}</Text>
                      {player.id === room.data?.winner?.id && (
                        <Text style={styles.winnerBadge}>👑</Text>
                      )}
                      {player.id === session.data?.id && (
                        <Text style={styles.youBadge}>Vous</Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.playerStatus,
                        { color: getPlayerStatusColor(player.status) },
                      ]}
                    >
                      {getPlayerStatusText(player.status)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Actions */}
        </ScrollView>
        <View style={[styles.actionsSection, { paddingBottom: insets.bottom }]}>
          <Button
            color="primary"
            text="Nouvelle partie"
            onPress={handleLeaveRoom}
            isLoading={leaveRoom.isPending}
          />
        </View>
      </FadeInView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },

  // Winner Section
  winnerSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  winnerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
    marginBottom: 20,
    textAlign: 'center',
  },
  winnerCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.buttonPrimaryColor,
  },
  winnerInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  winnerName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
    marginBottom: 4,
  },
  winnerSubtitle: {
    fontSize: 16,
    color: COLORS.buttonPrimaryColor,
    fontWeight: '600',
  },

  // Summary Section
  summarySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.buttonPrimaryColor,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    fontWeight: '500',
  },

  // Players Section
  playersSection: {
    marginBottom: 30,
  },
  playersContainer: {
    gap: 12,
  },
  playerCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerRank: {
    backgroundColor: COLORS.primaryBackgroundColor,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
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
  winnerBadge: {
    fontSize: 20,
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
    fontWeight: '500',
  },

  // Missions Section
  missionsSection: {
    marginBottom: 30,
  },
  missionsContainer: {
    gap: 12,
  },
  missionCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  missionNumber: {
    backgroundColor: COLORS.primaryBackgroundColor,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  missionNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.buttonPrimaryColor,
  },
  missionContent: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimaryColor,
    lineHeight: 22,
  },

  // Actions Section
  actionsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.primaryBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorderColor,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.buttonPrimaryColor,
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  primaryButtonPressed: {
    backgroundColor: COLORS.buttonPrimaryPressedColor,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.buttonPrimaryTextColor,
  },
});
