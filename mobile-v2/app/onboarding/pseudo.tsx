import { useKeyboard } from '@react-native-community/hooks';
import { useRouter } from 'expo-router';
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
  const router = useRouter();
  const { keyboardShown } = useKeyboard();

  return (
    <KeyboardAvoidingView
      style={[styles.content]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
        <Header title="Choisir un pseudo" />
        <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
          <View style={[styles.view]}>
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
              onPress={() => router.push('/onboarding/avatar')}
              text="Suivant"
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
    paddingTop: 0,
  },
  inputContainer: {
    gap: 20,
  },
  lottie: {
    marginTop: 20,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
