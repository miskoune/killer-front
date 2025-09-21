import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
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

import { COLORS } from '@/constants/theme';
import { selectPlayer, selectUpdatePlayer } from '@/selectors/player';
import { Button } from '@/shared/components/Button';
import { Header } from '@/shared/components/Header';
import { Input } from '@/shared/components/Input';
import { usePlayerStore } from '@/store/player';

export function ChoosePseudo() {
  const player = usePlayerStore(selectPlayer);
  const updatePlayer = usePlayerStore(selectUpdatePlayer);
  const inputRef = createRef<TextInput>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={[styles.content]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
        <Header title="Choisir un pseudo" showBackButton />
        <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
          <View style={[styles.view]}>
            <Image
              source={require('@/assets/images/pseudo.png')}
              style={styles.lottie}
            />
            <Input
              label="Pseudo"
              value={player?.name ?? ''}
              setValue={(name) => updatePlayer({ name })}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={[styles.buttonContainer]}>
          <Button
            disabled={!player?.name}
            color="primary"
            onPress={() => router.push('/onboarding/choose-avatar')}
            text="Suivant"
            customStyle={{ marginBottom: insets.bottom }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
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
    padding: 20,
    paddingBottom: 20,
  },
  lottie: {
    width: 220,
    height: 220,
    marginTop: -20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
