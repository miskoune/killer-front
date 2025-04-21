import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { createRef, useState } from 'react';
import { View, type TextInput, TouchableWithoutFeedback } from 'react-native';

import { useUpdatePlayer } from '../../apis/player/mutations';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { type RootStackParamList } from '../../types/navigation';

import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseRoom'>;

export function ChooseRoom({ navigation, route }: Props): JSX.Element {
  const [roomCode, setRoomCode] = useState('');
  const { updatePlayer } = useUpdatePlayer();
  const inputRef = createRef<TextInput>();

  const handleNextPage = async (): Promise<void> => {
    await updatePlayer.mutateAsync({
      id: route.params.playerId,
      room: roomCode,
    });

    navigation.reset({
      routes: [{ name: 'PendingRoom', params: { roomCode } }],
    });
  };

  return (
    <View style={styles.content}>
      <Header shouldHandlePreviousPage title="Rejoindre une partie" />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
        <View style={styles.view}>
          <LottieView
            source={require('../../assets/lotties/home.json')}
            autoPlay
            style={styles.lottie}
            loop
          />
          <Input
            innerRef={inputRef}
            label="Saisissez le code de la partie à rejoindre"
            value={roomCode}
            setValue={setRoomCode}
          />
          <Button
            disabled={!roomCode}
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
