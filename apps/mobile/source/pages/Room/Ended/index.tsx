import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { useRoom } from '../../../apis/room/queries';
import { useUpdatePlayer } from '../../../apis/player/mutations';

import { Button } from '../../../components/Button';
import { CurrentAvatar } from '../../../components/CurrentAvatar';
import { RoomGuard } from '../../../components/RoomGuard';
import { useTranslation } from '../../../translations';
import { type RootStackParamList } from '../../../types/navigation';

import { Ranking } from './Ranking';
import styles from './styles/index.module.css';
import { useSession } from '../../../apis/player/queries';

type Props = NativeStackScreenProps<RootStackParamList, 'EndedRoom'>;

export function EndedRoomPage({ route }: Props): JSX.Element {
  const {
    name: routeName,
    params: { roomCode },
  } = route;
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();
  const { room } = useRoom(roomCode!);
  const { t } = useTranslation();

  const handleLeaveRoom = async (): Promise<void> => {
    await updatePlayer.mutateAsync({ id: session?.id, room: null });
  };

  return (
    <RoomGuard roomCode={roomCode} currentRouteName={routeName}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>
            {t('room.winner.name', { playerName: room?.winner?.name })}
          </Text>
          {room?.winner && <CurrentAvatar avatar={room.winner.avatar} />}
          <Ranking room={room} />
          <Button
            color="primary"
            onPress={handleLeaveRoom}
            text={t('room.play.another.party.button')}
            isAsyncAction
          />
        </View>
      </ScrollView>
    </RoomGuard>
  );
}
