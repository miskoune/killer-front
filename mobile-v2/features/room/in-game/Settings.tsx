import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { Avatar } from '@/shared/components/Avatar';
import { Button } from '@/shared/components/Button';
import { FadeInView } from '@/shared/components/FadeInView';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { type Player } from '@/shared/types/player';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';
import { useKickPlayer } from '../hooks/useKickPlayer';
import { useLeaveRoom } from '../hooks/useLeaveRoom';

export function Settings() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const { handleError } = useErrorHandler();
  const session = useGetSession();
  const room = useGetRoom(roomId);
  const leaveRoom = useLeaveRoom();
  const kickPlayer = useKickPlayer();

  const handleLeaveRoom = () => {
    leaveRoom.mutate(session.data?.id, { onError: handleError });
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

  const handleGoBack = () => {
    router.back();
  };

  const handleKickPlayer = (playerId: number, playerName: string) => {
    Alert.alert(
      'Exclure le joueur',
      `Êtes-vous sûr de vouloir exclure ${playerName} de la partie ? Cette action est irréversible.`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Exclure',
          style: 'destructive',
          onPress: () => {
            kickPlayer.mutate(playerId, { onError: handleError });
          },
        },
      ],
    );
  };

  // Vérifier si l'utilisateur actuel est l'admin
  const isAdmin = session.data?.id === room.data?.admin.id;

  // Filtrer les joueurs (exclure l'admin lui-même)
  const kickablePlayer =
    room.data?.players.filter(
      (player: Player) =>
        player.id !== session.data?.id && player.status === 'ALIVE',
    ) || [];

  return (
    <View style={styles.container}>
      <Header title="Paramètres" showBackButton onBackPress={handleGoBack} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <FadeInView style={styles.content}>
          {/* Room Information */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>
              📋 Informations de la partie
            </Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nom de la partie :</Text>
                <Text style={styles.infoValue}>{room.data?.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Code de la partie :</Text>
                <Text style={styles.infoValue}>{room.data?.id}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Statut :</Text>
                <Text style={[styles.infoValue, styles.statusValue]}>
                  {room.data?.status === 'IN_GAME'
                    ? '🎮 En cours'
                    : '⏳ En attente'}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Joueurs :</Text>
                <Text style={styles.infoValue}>
                  {room.data?.players.length}
                </Text>
              </View>
            </View>
          </View>

          {/* Admin Section - Kick AFK Players */}
          {isAdmin && kickablePlayer.length > 0 && (
            <View style={styles.adminSection}>
              <Text style={styles.sectionTitle}>👑 Administration</Text>
              <View style={styles.adminCard}>
                <View style={styles.adminHeader}>
                  <Text style={styles.adminTitle}>Gestion des joueurs AFK</Text>
                </View>

                <Text style={styles.adminDescription}>
                  Excluez les joueurs inactifs qui ne participent plus à la
                  partie.
                </Text>

                <View style={styles.playersSection}>
                  {kickablePlayer.map((player: Player) => (
                    <View key={player.id} style={styles.playerCard}>
                      <Avatar avatarId={player.avatar} size={50} />
                      <View style={styles.playerInfo}>
                        <Text style={styles.playerName}>{player.name}</Text>
                        <Text style={styles.playerStatus}>
                          {player.status === 'ALIVE'
                            ? '🟢 En vie'
                            : '🔴 Éliminé'}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.kickButton}
                        onPress={() => handleKickPlayer(player.id, player.name)}
                        disabled={kickPlayer.isPending}
                      >
                        <Text style={styles.kickButtonText}>
                          {kickPlayer.isPending ? 'Exclusion...' : 'Exclure'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Danger Zone */}
          <View style={styles.dangerSection}>
            <Text style={styles.dangerTitle}>⚠️ Zone de danger</Text>
            <Text style={styles.dangerDescription}>
              Attention ! Cette action est irréversible. Une fois que vous
              quittez la partie, vous ne pourrez plus y revenir.
            </Text>

            <View style={styles.dangerActions}>
              <Button
                color="secondary"
                text={t('room.leave.current.room')}
                onPress={confirmLeaveRoom}
                isLoading={leaveRoom.isPending}
                customStyle={styles.leaveButton}
              />
            </View>
          </View>
        </FadeInView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
  },

  // Info Section
  infoSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorderColor,
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.textSecondaryColor,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.textPrimaryColor,
    fontWeight: '600',
  },
  statusValue: {
    color: COLORS.buttonPrimaryColor,
  },

  // Admin Section
  adminSection: {
    marginTop: 10,
  },
  adminCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: COLORS.buttonPrimaryColor,
  },
  adminHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.buttonPrimaryColor,
  },
  adminDescription: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    marginBottom: 16,
    lineHeight: 20,
  },
  toggleButton: {
    backgroundColor: COLORS.buttonPrimaryColor,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  playersSection: {
    gap: 10,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBackgroundColor,
    borderRadius: 15,
    padding: 15,
    gap: 12,
  },
  playerInfo: {
    flex: 1,
    gap: 4,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
  },
  playerStatus: {
    fontSize: 12,
    color: COLORS.textSecondaryColor,
  },
  kickButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  kickButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    fontStyle: 'italic',
  },

  // Danger Section
  dangerSection: {
    backgroundColor: '#2B1D1A',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dangerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B6B',
    marginBottom: 12,
    textAlign: 'center',
  },
  dangerDescription: {
    fontSize: 14,
    color: '#FFB3B3',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  dangerActions: {
    alignItems: 'center',
  },
  leaveButton: {
    backgroundColor: '#FF6B6B',
    width: '100%',
  },

  // Additional Section
  additionalSection: {},
  comingSoonText: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    textAlign: 'center',
    fontStyle: 'italic',
    backgroundColor: COLORS.secondaryBackgroundColor,
    padding: 20,
    borderRadius: 15,
  },
});
