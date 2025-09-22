import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Avatar } from '@/shared/components/Avatar';
import { FadeInView } from '@/shared/components/FadeInView';
import { COLORS } from '@/shared/constants/theme';
import { type Mission } from '@/shared/types/mission';
import { type TargetPlayer } from '@/shared/types/player';
import { useTranslation } from '@/translations';

interface MissionViewProps {
  mission: Mission;
  targetPlayer: TargetPlayer;
}

export function MissionView({ mission, targetPlayer }: MissionViewProps) {
  const { t } = useTranslation();

  return (
    <FadeInView style={styles.container}>
      <View style={styles.missionContainer}>
        {/* Target Player Card */}
        <View style={styles.targetPlayerCard}>
          <Avatar avatarId={targetPlayer.avatar} size={80} />
          <View style={styles.targetPlayerInfo}>
            <Text style={styles.targetPlayerName}>{targetPlayer.name}</Text>
            <Text style={styles.headerSubtitle}>
              🎯 {t('room.target.to.kill', { pseudo: targetPlayer.name })}
            </Text>
          </View>
        </View>

        {/* Mission Card */}
        <View style={styles.missionCard}>
          <Text style={styles.missionTitle}>{t('room.target.mission')}</Text>
          <View style={styles.missionContentContainer}>
            <Text style={styles.missionEmoji}>🎭</Text>
            <Text style={styles.missionContent}>{mission.content}</Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>📋 Instructions</Text>
          <Text style={styles.instructionsText}>
            Pour éliminer votre cible, vous devez la faire exécuter la mission
            ci-dessus. Soyez discret et créatif !
          </Text>
        </View>

        {/* Warning */}
        <View style={styles.warningContainer}>
          <Text style={styles.warningEmoji}>⚠️</Text>
          <Text style={styles.warningText}>
            Attention ! Vous êtes aussi la cible de quelqu'un d'autre. Restez
            vigilant et méfiez-vous des autres joueurs !
          </Text>
        </View>
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  missionContainer: {
    flex: 1,
    gap: 20,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.buttonPrimaryColor,
    textAlign: 'center',
  },

  // Target Player Card
  targetPlayerCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: COLORS.buttonPrimaryColor,
  },
  targetPlayerInfo: {
    alignItems: 'center',
    flex: 1,
  },
  targetPlayerName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: COLORS.primaryBackgroundColor,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondaryColor,
  },

  // Mission Card
  missionCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 20,
    padding: 24,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
    marginBottom: 16,
    textAlign: 'center',
  },
  missionContentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.primaryBackgroundColor,
    borderRadius: 15,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.buttonPrimaryColor,
  },
  missionEmoji: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  missionContent: {
    fontSize: 18,
    color: COLORS.textPrimaryColor,
    lineHeight: 26,
    flex: 1,
    fontWeight: '500',
  },

  // Instructions
  instructionsContainer: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 15,
    padding: 20,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    lineHeight: 20,
  },

  // Warning
  warningContainer: {
    backgroundColor: '#2B1D1A',
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  warningEmoji: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 1,
  },
  warningText: {
    fontSize: 13,
    color: '#FFB3B3',
    lineHeight: 18,
    flex: 1,
    fontWeight: '500',
  },
});
