import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
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

import { useUpdatePlayer } from './hooks/useUpdatePlayer';

export function JoinRoom() {
  const [roomCode, setRoomCode] = useState('');
  const { handleError } = useErrorHandler();
  const insets = useSafeAreaInsets();
  const updatePlayer = useUpdatePlayer();
  const { data: session } = useGetSession();

  const handleRoomName = () => {
    updatePlayer.mutate(
      { id: session?.id, room: roomCode },
      {
        onSuccess: ({ room }) => router.push(`/room/${room?.id}/pending`),
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
        <Header title="Rejoindre une partie" showBackButton />
        <TouchableWithoutFeedback>
          <View style={styles.view}>
            <Image
              source={require('./images/room-code.png')}
              style={styles.image}
            />
            <Input
              label="Code de la partie"
              value={roomCode}
              setValue={(name) => setRoomCode(name)}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={[styles.buttonContainer]}>
          <Button
            disabled={!roomCode || updatePlayer.isPending}
            color="primary"
            onPress={handleRoomName}
            text="Rejoindre la partie"
            customStyle={{ marginBottom: insets.bottom }}
            isLoading={updatePlayer.isPending}
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
