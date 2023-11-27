import { useTranslation } from '@killerparty/intl';
import { useRoom, useSession, useUpdatePlayer } from '@killerparty/webservices';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import { Button } from '../../../components/Button';
import { CurrentAvatar } from '../../../components/CurrentAvatar';
import {
  type StackNavigation,
  type RootStackParamList,
} from '../../../types/navigation';

import { Ranking } from './Ranking';
import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'EndedRoom'>;

export function EndedRoomPage({ route }: Props): JSX.Element {
  const { roomCode } = route.params;
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();
  const { room } = useRoom(roomCode!);
  const { t } = useTranslation();
  const { replace } = useNavigation<StackNavigation>();

  const handleLeaveRoom = (): void => {
    updatePlayer.mutate(
      { id: session?.id, room: null },
      { onSuccess: () => replace('Home') },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('room.winner.name', { playerName: room?.winner?.name })}
      </Text>
      {room?.winner && <CurrentAvatar avatar={room.winner.avatar} />}
      <Ranking room={room} />
      <Button
        color="secondary"
        onPress={handleLeaveRoom}
        text={t('room.play.another.party.button')}
      />
    </View>
  );
}
