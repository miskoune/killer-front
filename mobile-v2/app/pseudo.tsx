import LottieView from 'lottie-react-native';
import { createRef, useState } from 'react';
import {
  View,
  type TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { useCreatePlayer } from '@/requests/mutations';

export default function Pseudo() {
  const [pseudo, setPseudo] = useState('');
  const { mutateAsync: createPlayer } = useCreatePlayer();
  const inputRef = createRef<TextInput>();

  const handleNextPage = async (): Promise<void> => {
    const { id: playerId } = await createPlayer({
      name: pseudo,
      avatar: 'avenger',
    });

    /*  navigation.navigate('ChooseAvatar', {
      playerId,
      shouldCreateRoom: route.params?.shouldCreateRoom ?? false,
    }); */
  };

  return (
    <View style={styles.content}>
      <Header shouldHandlePreviousPage={false} title="Choisir un pseudo" />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
        <View style={styles.view}>
          <LottieView
            source={require('../assets/lotties/players.json')}
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

const styles = StyleSheet.create({
  view: {
    margin: 20,
    display: 'flex',
    flex: 1,
  },
  content: {
    marginTop: 40,
    flex: 1,
  },
  lottie: {
    width: 300,
    height: 300,
    margin: 0,
    marginTop: -20,
  },
});
