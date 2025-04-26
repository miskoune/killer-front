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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={[styles.content]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
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
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={[styles.buttonContainer]}>
        <Button
          disabled={!player?.name}
          color="primary"
          onPress={() => router.push('/onboarding/avatar')}
          text="Suivant"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  view: {
    display: 'flex',
    flex: 1,

    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  inputContainer: {
    gap: 20,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: '#DFD9FE',
  },
  lottie: {
    marginTop: 20,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
