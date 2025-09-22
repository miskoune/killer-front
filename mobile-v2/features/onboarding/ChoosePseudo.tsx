import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { createRef } from 'react';
import {
  View,
  type TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/shared/components/Button';
import { Header } from '@/shared/components/Header';
import { Input } from '@/shared/components/Input';
import { COLORS } from '@/shared/constants/theme';

import {
  usePlayerStore,
  selectPlayer,
  selectUpdatePlayer,
} from './store/player';

export function ChoosePseudo() {
  const player = usePlayerStore(selectPlayer);
  const updatePlayer = usePlayerStore(selectUpdatePlayer);
  const inputRef = createRef<TextInput>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.content]}>
      <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
        <Header title="Choisir un pseudo" showBackButton />
        <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
          <View style={[styles.view]}>
            <Image
              source={require('./images/pseudo.png')}
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
    </View>
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
    paddingBottom: 0,
    backgroundColor: COLORS.primaryBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorderColor,
  },
  lottie: {
    width: 220,
    height: 220,
    marginTop: -20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
