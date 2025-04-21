import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useRoom } from '../../../../apis/room/queries';
import { useSession } from '../../../../apis/player/queries';

import { type TranslationKey, useTranslation } from '../../../../translations';
import { type StackNavigation } from '../../../../types/navigation';

import styles from './styles/RoomMissions.module.css';

interface Props {
  roomCode: string;
}

export function RoomMissions({ roomCode }: Props): JSX.Element | null {
  const { room } = useRoom(roomCode);
  const { session } = useSession();
  const { t } = useTranslation();
  const { navigate } = useNavigation<StackNavigation>();

  const missions = room?.missions.length;

  const shouldDisplayRoomMissions =
    !room?.isGameMastered ||
    (room?.isGameMastered && session?.status === 'SPECTATING');

  return (
    <TouchableOpacity
      style={styles.missions}
      disabled={!shouldDisplayRoomMissions}
      onPress={() =>
        navigate('PendingRoom', {
          screen: 'RoomMissions',
          params: {
            roomCode,
            routeName: 'PendingRoom',
          },
        })
      }
    >
      <Text style={styles.text}>
        {t('room.missions.count' as TranslationKey, { count: missions })}
      </Text>
    </TouchableOpacity>
  );
}
