import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/shared/constants/theme';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';

import { GameStatus } from './GameStatus';

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

  const handleRoomCodePress = async () => {
    await Clipboard.setStringAsync(roomCode);
    Alert.alert(
      'Code copié!',
      `Le code "${roomCode}" a été copié dans le presse-papier.`,
    );
  };

  return (
    <View style={styles.playersSection}>
      <View style={styles.roomInfoContainer}>
        <Image
          source={require('./images/room-pending.png')}
          style={styles.image}
        />
        <Pressable
          style={({ pressed }) => [
            styles.roomCode,
            pressed && styles.roomCodePressed,
          ]}
          onPress={handleRoomCodePress}
        >
          <Text style={styles.roomCode}>
            {t('room.join.room.code', { roomCode })}
          </Text>
        </Pressable>
        <GameStatus roomId={roomCode} />

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
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    marginBottom: 15,
  },
  roomInfoContainer: {
    marginBottom: 20,
  },
  roomCode: {
    fontSize: 16,
    color: COLORS.textPrimaryColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  roomCodePressed: {
    opacity: 0.5,
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
