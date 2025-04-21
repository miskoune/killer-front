import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import { RoomGuard } from '../../../../components/RoomGuard';
import { type RootStackParamList } from '../../../../types/navigation';

import { PlayerList } from './PlayerList';

type Props = NativeStackScreenProps<RootStackParamList, 'RoomPlayers'>;

export function RoomPlayers({ route }: Props): JSX.Element {
  const {
    params: { roomCode, routeName },
  } = route;

  return (
    <RoomGuard roomCode={roomCode} currentRouteName={routeName}>
      <PlayerList roomCode={roomCode} />
    </RoomGuard>
  );
}
