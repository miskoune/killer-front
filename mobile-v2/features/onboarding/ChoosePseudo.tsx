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

import { Avatar } from '@/shared/components/Avatar';
import { Button } from '@/shared/components/Button';
import { Header } from '@/shared/components/Header';
import { Input } from '@/shared/components/Input';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

import { useCreatePlayer } from './hooks/useCreatePlayer';
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
  const createPlayer = useCreatePlayer();
  const { handleError } = useErrorHandler();

  const handleCreatePlayer = () => {
    if (!player?.name || !player?.avatar) return;

    createPlayer.mutate(
      { name: player.name, avatar: player.avatar },
      {
        onSuccess: () => router.push('/onboarding/choose-room'),
        onError: handleError,
      },
    );
  };

  return (
    <View style={[styles.content]}>
      <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
        <Header title="Choisir un pseudo" showBackButton />
        <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
          <View style={[styles.view]}>
            <Avatar
              style={styles.avatar}
              avatarId={player?.avatar ?? ''}
              size={220}
            />
            <Input
              label="Pseudo"
              value={player?.name ?? ''}
              setValue={(name) => updatePlayer({ name })}
              autoFocus={false}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={[styles.buttonContainer]}>
          <Button
            disabled={!player?.name || createPlayer.isPending}
            color="primary"
            onPress={handleCreatePlayer}
            text="Suivant"
            customStyle={{ marginBottom: insets.bottom }}
            isLoading={createPlayer.isPending}
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
  avatar: {
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
});
