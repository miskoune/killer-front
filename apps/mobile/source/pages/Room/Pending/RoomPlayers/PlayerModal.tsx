import { useNavigation } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

import { useSession } from '../../../../apis/player/queries';
import { useUpdatePlayer } from '../../../../apis/player/mutations';

import { Button } from '../../../../components/Button';
import { Header } from '../../../../components/Header';
import { Player } from '../../../../components/Player';
import {
  type StackNavigation,
  type RootStackParamList,
} from '../../../../types/navigation';

import styles from './styles/PlayerModal.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerModal'>;

export function PlayerModal({ route }: Props): JSX.Element {
  const { updatePlayer } = useUpdatePlayer();
  const { popToTop } = useNavigation<StackNavigation>();
  const { session } = useSession();
  const { player } = route.params;

  const handleKillPlayer = async (playerId: number): Promise<void> => {
    await updatePlayer.mutateAsync({ id: playerId, status: 'KILLED' });

    popToTop();
  };

  const handleKickPlayer = async (playerId: number): Promise<void> => {
    await updatePlayer.mutateAsync({ id: playerId, room: null });

    popToTop();
  };

  return (
    <>
      <Header shouldHandlePreviousPage={false} title="Informations du joueur" />
      <View style={styles.content}>
        <LottieView
          source={require('../../../../assets/lotties/free-for-all.json')}
          autoPlay
          style={styles.lottie}
          loop
        />
        <View style={styles.playerInfos}>
          <Player player={player} />
          <View>
            {session?.status === 'SPECTATING' && player.status === 'ALIVE' && (
              <Button
                color="secondary"
                text="Provoquer la mort de ce joueur"
                onPress={() => handleKillPlayer(player.id)}
                isAsyncAction
              />
            )}
            <Button
              color="primary"
              text="Expulser ce joueur de la partie"
              onPress={() => handleKickPlayer(player.id)}
              isAsyncAction
            />
          </View>
        </View>
      </View>
    </>
  );
}
