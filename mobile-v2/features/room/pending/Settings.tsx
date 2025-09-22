import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';

import CloseIcon from '@/shared/assets/icons/close.svg';
import { Avatar } from '@/shared/components/Avatar';
import { Button } from '@/shared/components/Button';
import { FadeInView } from '@/shared/components/FadeInView';
import { Header } from '@/shared/components/Header';
import { Input } from '@/shared/components/Input';
import { AVATARS } from '@/shared/constants/avatars';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { useUpdatePlayer } from '@/shared/hooks/useUpdatePlayer';
import { type Player } from '@/shared/types/player';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';
import { useKickPlayer } from '../hooks/useKickPlayer';
import { useLeaveRoom } from '../hooks/useLeaveRoom';

export function PendingRoomSettings() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const { handleError } = useErrorHandler();
  const session = useGetSession();
  const room = useGetRoom(roomId);
  const leaveRoom = useLeaveRoom();
  const updatePlayer = useUpdatePlayer();
  const kickPlayer = useKickPlayer();

  const [playerName, setPlayerName] = useState(session.data?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(
    session.data?.avatar || '',
  );
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleUpdateName = () => {
    if (playerName.trim() && playerName !== session.data?.name) {
      updatePlayer.mutate(
        { id: session.data?.id, name: playerName.trim() },
        { onError: handleError },
      );
    }
  };

  const handleUpdateAvatar = (avatarId: string) => {
    if (avatarId !== session.data?.avatar) {
      setSelectedAvatar(avatarId);
      updatePlayer.mutate(
        { id: session.data?.id, avatar: avatarId },
        { onError: handleError },
      );
    }
  };

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

  const handleClose = () => {
    setPlayerName(session.data?.name || '');
    router.back();
  };

  const handleKickPlayer = (playerId: number, playerNameToKick: string) => {
    Alert.alert(
      'Exclure le joueur',
      `Êtes-vous sûr de vouloir exclure ${playerNameToKick} de la partie ? Cette action est irréversible.`,
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
      (player: Player) => player.id !== session.data?.id,
    ) || [];

  return (
    <>
      <View style={styles.container}>
        <Header title="Paramètres" showBackButton onBackPress={handleClose} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <FadeInView style={styles.content}>
            <Text style={styles.sectionTitle}>👤 Vos informations</Text>
            <View style={styles.playerCard}>
              <View style={styles.playerInfo}>
                <TouchableOpacity
                  onPress={() => setShowAvatarModal(true)}
                  style={styles.avatarContainer}
                >
                  {session.data?.avatar && (
                    <Avatar
                      size={100}
                      avatarId={selectedAvatar || session.data.avatar}
                    />
                  )}
                  <Text style={styles.editAvatarText}>
                    Modifier votre avatar
                  </Text>
                </TouchableOpacity>

                <View style={styles.nameEditContainer}>
                  <Input
                    value={playerName}
                    setValue={setPlayerName}
                    label=""
                    autoFocus={false}
                  />
                  <View style={styles.nameEditButtons}>
                    <Button
                      color="primary"
                      text="Sauvegarder"
                      onPress={handleUpdateName}
                      isLoading={updatePlayer.isPending}
                      customStyle={styles.smallButton}
                      disabled={
                        updatePlayer.isPending ||
                        playerName.trim() === session.data?.name
                      }
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Admin Section - Kick Players */}
            {isAdmin && kickablePlayer.length > 0 && (
              <View style={styles.adminSection}>
                <Text style={styles.sectionTitle}>👑 Administration</Text>

                <View style={styles.adminCard}>
                  <View style={styles.adminHeader}>
                    <Text style={styles.adminTitle}>Gestion des joueurs</Text>
                  </View>

                  <Text style={styles.adminDescription}>
                    Excluez les joueurs indésirables de la partie.
                  </Text>

                  <View style={styles.playersSection}>
                    {kickablePlayer.map((player: Player) => (
                      <View key={player.id} style={styles.playerKickCard}>
                        <Avatar avatarId={player.avatar} size={50} />
                        <View style={styles.playerInfoToKick}>
                          <Text style={styles.playerNameToKick}>
                            {player.name}
                          </Text>
                          <Text style={styles.playerStatus}>
                            {player.hasAtLeastOneMission
                              ? 'Mission ajoutée'
                              : 'Pas de mission'}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.kickButton}
                          onPress={() =>
                            handleKickPlayer(player.id, player.name)
                          }
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

      {/* Avatar Selection Modal */}
      <Modal
        visible={showAvatarModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAvatarModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choisir un avatar</Text>
              <TouchableOpacity
                onPress={() => setShowAvatarModal(false)}
                style={styles.modalCloseButton}
              >
                <CloseIcon
                  width={24}
                  height={24}
                  color={COLORS.textPrimaryColor}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={styles.avatarGrid}
              showsVerticalScrollIndicator={false}
            >
              {AVATARS.map((avatar) => (
                <View
                  key={avatar.id}
                  style={[
                    styles.avatarOption,
                    selectedAvatar === avatar.id && styles.selectedAvatarOption,
                  ]}
                >
                  <Avatar
                    size={80}
                    avatarId={avatar.id}
                    onPress={() => handleUpdateAvatar(avatar.id)}
                  />
                  {selectedAvatar === avatar.id && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
  },
  closeButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
  },

  playerCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playerInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  editAvatarText: {
    fontSize: 20,
    color: COLORS.buttonPrimaryColor,
    fontWeight: '600',
  },
  nameDisplayContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  nameEditContainer: {
    width: '100%',
    marginBottom: 16,
  },
  nameEditButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  smallButton: {
    flex: 1,
    marginTop: 10,
    padding: 15,
  },
  playerName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
    marginBottom: 4,
  },
  editNameButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  editNameText: {
    fontSize: 14,
    color: COLORS.buttonPrimaryColor,
    fontWeight: '600',
  },
  playerStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondaryColor,
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

  // Admin Section
  adminSection: {
    marginTop: 10,
  },
  adminCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
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
  playerKickCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBackgroundColor,
    borderRadius: 15,
    padding: 15,
    gap: 12,
  },
  playerInfoToKick: {
    flex: 1,
    gap: 4,
  },
  playerNameToKick: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.primaryBackgroundColor,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
  },
  modalCloseButton: {
    padding: 8,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarOption: {
    width: '30%',
    aspectRatio: 1,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBackgroundColor,
    position: 'relative',
  },
  selectedAvatarOption: {
    borderWidth: 3,
    borderColor: COLORS.buttonPrimaryColor,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: COLORS.buttonPrimaryColor,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
