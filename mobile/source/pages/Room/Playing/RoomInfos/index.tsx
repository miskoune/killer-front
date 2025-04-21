import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';

import { useSession } from '../../../../apis/player/queries';

import { CurrentAvatar } from '../../../../components/CurrentAvatar';
import { RoomGuard } from '../../../../components/RoomGuard';
import { type RootStackParamList } from '../../../../types/navigation';

import { ConfirmKillButton } from './ConfirmKillButton';
import styles from './styles/index.module.css';
import { TargetMission } from './TargetMission';

type Props = NativeStackScreenProps<RootStackParamList, 'PlayingRoomInfos'>;

export function PlayingRoomInfos({ route }: Props): JSX.Element {
  const {
    params: { roomCode, routeName },
  } = route;

  const { session } = useSession();

  return (
    <RoomGuard roomCode={roomCode} currentRouteName={routeName}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Votre cible est..</Text>
          <View style={styles.target}>
            <Text style={styles.targetName}>{session?.target?.name}</Text>
          </View>
          <CurrentAvatar avatar={session?.target?.avatar} />
          <TargetMission />
          {session?.status === 'ALIVE' && <ConfirmKillButton />}
        </View>
      </ScrollView>
    </RoomGuard>
  );
}
