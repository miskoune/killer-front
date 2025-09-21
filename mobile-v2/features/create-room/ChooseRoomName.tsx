import { Image } from 'expo-image';
import { router } from 'expo-router';
import { createRef, useState } from 'react';
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

import { Button } from '@/shared/components/Button';
import { Header } from '@/shared/components/Header';
import { Input } from '@/shared/components/Input';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';

import { useCreateRoom } from './hooks/useCreateRoom';

export function ChooseRoomName() {
  const { data: session } = useGetSession();
  const [roomName, setRoomName] = useState(
    session?.name ? `Partie de ${session.name}` : '',
  );
  const { handleError } = useErrorHandler();
  const inputRef = createRef<TextInput>();
  const insets = useSafeAreaInsets();
  const createRoom = useCreateRoom();

  const handleCreateRoom = () => {
    createRoom.mutate(
      { isGameMastered: true },
      {
        onSuccess: ({ id }) => router.push(`/room/${id}/pending`),
        onError: handleError,
      },
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.content]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Header title="Choisir un nom de partie" showBackButton />
        <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
          <View style={styles.view}>
            <Image
              source={require('@/assets/images/room-name.png')}
              style={styles.image}
            />
            <Input
              label="Nom de la partie"
              value={roomName}
              setValue={(name) => setRoomName(name)}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={[styles.buttonContainer]}>
          <Button
            disabled={!roomName}
            color="primary"
            onPress={handleCreateRoom}
            text="Créer la partie"
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
    gap: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  inputContainer: {
    gap: 20,
  },
  buttonContainer: {
    padding: 20,
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
});
