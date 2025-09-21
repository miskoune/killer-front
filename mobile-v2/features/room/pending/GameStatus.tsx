import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/shared/constants/theme';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';

interface GameStatusProps {
  roomId: string;
}

export function GameStatus({ roomId }: GameStatusProps) {
  const { t } = useTranslation();
  const room = useGetRoom(roomId);

  const getPlayersConditionText = () => {
    if (room.data?.isGameMastered) {
      return t('room.start.party.three.players.with.game.master.condition');
    }
    return t('room.start.party.three.players.condition');
  };

  const getMissionsConditionText = () => {
    if (room.data?.isGameMastered) {
      return t('room.start.party.same.missions.as.players.condition');
    }

    return t('room.start.party.each.player.has.mission.condition');
  };

  return (
    <View style={styles.gameStatusSection}>
      <Text style={styles.sectionTitle}>
        {t('room.start.party.conditions')}
      </Text>

      <View style={styles.conditionsContainer}>
        <View style={styles.conditionItem}>
          <Text style={styles.conditionText}>{getPlayersConditionText()}</Text>
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
          <Text style={styles.conditionText}>{getMissionsConditionText()}</Text>
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
  );
}

const styles = StyleSheet.create({
  gameStatusSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    marginBottom: 8,
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
});
