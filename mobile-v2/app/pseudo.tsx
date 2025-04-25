import LottieView from 'lottie-react-native';
import { createRef } from 'react';
import {
  View,
  type TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { selectPlayer, selectUpdatePlayer } from '@/selectors/player';
import { usePlayerStore } from '@/store/player';

export default function Pseudo() {
  const player = usePlayerStore(selectPlayer);
  const updatePlayer = usePlayerStore(selectUpdatePlayer);
  const inputRef = createRef<TextInput>();

  const handleNextPage = async (): Promise<void> => {
    /* const { id: playerId } = await createPlayer({
      name: pseudo,
      avatar: 'pirate',
    }); */
    /*  navigation.navigate('ChooseAvatar', {
      playerId,
      shouldCreateRoom: route.params?.shouldCreateRoom ?? false,
    }); */
  };

  return (
    <KeyboardAvoidingView
      style={styles.content}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
        <Header shouldHandlePreviousPage={false} title="Choisir un pseudo" />
        <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
          <View style={styles.view}>
            <LottieView
              source={require('@/assets/lotties/players.json')}
              autoPlay
              style={styles.lottie}
              loop
            />
            <Input
              innerRef={inputRef}
              label="Pseudo"
              value={player?.name ?? ''}
              setValue={(name) => updatePlayer({ name })}
            />
            <Button
              disabled={!player?.name}
              color="primary"
              onPress={handleNextPage}
              text="Suivant"
              isAsyncAction
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  view: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    marginBottom: 40,
  },
  scrollViewContentKeyboardShown: {
    marginBottom: 100,
  },
  lottie: {
    marginTop: 20,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
