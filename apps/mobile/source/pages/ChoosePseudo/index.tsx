import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { createRef, useState } from 'react';
import { View, type TextInput, TouchableWithoutFeedback } from 'react-native';

import { useCreatePlayer } from '../../apis/player/mutations';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { getRandomAvatar } from '../../helpers/avatars';
import { type RootStackParamList } from '../../types/navigation';

import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'ChoosePseudo'>;

export function ChoosePseudo({ navigation, route }: Props): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const { createPlayer } = useCreatePlayer();
  const inputRef = createRef<TextInput>();

  const handleNextPage = async (): Promise<void> => {
    const { id: playerId } = await createPlayer.mutateAsync({
      name: pseudo,
      avatar: getRandomAvatar(),
    });

    navigation.navigate('ChooseAvatar', {
      playerId,
      shouldCreateRoom: route.params?.shouldCreateRoom ?? false,
    });
  };

  return (
    <View style={styles.content}>
      <Header shouldHandlePreviousPage={false} title="Choisir un pseudo" />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
        <View style={styles.view}>
          <LottieView
            source={require('../../assets/lotties/players.json')}
            autoPlay
            style={styles.lottie}
            loop
          />
          <Input
            innerRef={inputRef}
            label="Saisissez le pseudo de votre joueur"
            value={pseudo}
            setValue={setPseudo}
          />
          <Button
            disabled={!pseudo}
            color="primary"
            onPress={handleNextPage}
            text="Suivant"
            isAsyncAction
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
