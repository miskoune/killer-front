import { Alert, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/shared/components/Button';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';

import { useStartRoom } from './hooks/useStartRoom';

interface GameStatusProps {
  roomId: string;
}

export function GameStatus({ roomId }: GameStatusProps) {
  const { t } = useTranslation();
  const room = useGetRoom(roomId);
  const startRoom = useStartRoom();
  const { handleError } = useErrorHandler();
  const session = useGetSession();

  const handleStartRoom = () => {
    if (session.data?.id !== room.data?.admin.id) {
      return Alert.alert(
        'Impossible de lancer la partie',
        "Seul l'administrateur peut lancer la partie.",
      );
    }
    startRoom.mutate(roomId, { onError: handleError });
  };

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

  const roomHasEnoughMissions = () => {
    if (room.data?.isGameMastered) {
      return room.data?.hasEnoughMissions;
    }

    return room.data?.hasEnoughMissions && room.data?.allPlayersAddedMissions;
  };

  return (
    <View style={styles.gameStatusSection}>
      <View style={styles.conditionsContainer}>
        <Text style={styles.sectionTitle}>
          {t('room.start.party.conditions')}
        </Text>
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
              roomHasEnoughMissions() && styles.conditionMet,
            ]}
          >
            {roomHasEnoughMissions() ? '✓' : '✗'}
          </Text>
        </View>
        <Button
          color="primary"
          onPress={handleStartRoom}
          text="Lancer la partie"
          disabled={
            !roomHasEnoughMissions() ||
            !room.data?.hasEnoughPlayers ||
            startRoom.isPending
          }
          isLoading={startRoom.isPending}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameStatusSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    marginBottom: 15,
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
    color: COLORS.errorColor,
  },
  conditionMet: {
    color: COLORS.buttonPrimaryColor,
  },
});
