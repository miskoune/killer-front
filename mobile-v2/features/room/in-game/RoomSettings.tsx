import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';

import { Avatar } from '@/shared/components/Avatar';
import { Button } from '@/shared/components/Button';
import { FadeInView } from '@/shared/components/FadeInView';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';
import { useLeaveRoom } from '../hooks/useLeaveRoom';

export function RoomSettings() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const { handleError } = useErrorHandler();
  const session = useGetSession();
  const room = useGetRoom(roomId);
  const leaveRoom = useLeaveRoom();

  const handleLeaveRoom = () => {
    leaveRoom.mutate(session.data?.id, {
      onError: handleError,
      onSuccess: () => {
        router.replace('/');
      },
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

  const handleGoBack = () => {
    router.back();
  };

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

          {/* Player Information */}
          <View style={styles.playerSection}>
            <Text style={styles.sectionTitle}>👤 Vos informations</Text>
            <View style={styles.playerCard}>
              <View style={styles.playerInfo}>
                {session.data?.avatar && (
                  <Avatar size={60} avatarId={session.data?.avatar} />
                )}
                <Text style={styles.playerName}>{session.data?.name}</Text>
                <Text style={styles.playerStatus}>
                  {session.data?.status === 'ALIVE'
                    ? '💚 Vivant'
                    : session.data?.status === 'KILLED'
                      ? '💀 Éliminé'
                      : '👁️ Spectateur'}
                </Text>
              </View>
            </View>
          </View>

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

  // Player Section
  playerSection: {},
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
  playerName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
    marginBottom: 8,
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
