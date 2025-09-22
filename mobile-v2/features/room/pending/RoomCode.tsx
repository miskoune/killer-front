import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/shared/constants/theme';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';

interface RoomCodeProps {
  roomCode: string;
}

export function RoomCode({ roomCode }: RoomCodeProps) {
  const { t } = useTranslation();
  const room = useGetRoom(roomCode);

  const getPlayerCount = () => {
    if (room.data?.players.length === 1) {
      return t('room.players.count_one', {
        count: room.data?.players.length,
      });
    }

    return t('room.players.count_other', {
      count: room.data?.players.length,
    });
  };

  const getMissionCount = () => {
    if (room.data?.missions.length === 1) {
      return t('room.missions.count_one', {
        count: room.data?.missions.length,
      });
    }
    return t('room.missions.count_other', {
      count: room.data?.missions.length,
    });
  };

  return (
    <View style={styles.playersSection}>
      <View style={styles.roomInfoContainer}>
        <Text style={styles.roomCode}>
          {t('room.join.room.code', { roomCode: room.data?.id })}
        </Text>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{getPlayerCount()}</Text>
          <Text style={styles.statsText}>{getMissionCount()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
