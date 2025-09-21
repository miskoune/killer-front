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

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { COLORS } from '@/constants/theme';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useCreateRoom } from '@/requests/mutations';

export default function RoomCode() {
  const [roomName, setRoomName] = useState('');
  const { handleError } = useErrorHandler();
  const insets = useSafeAreaInsets();
  const { mutateAsync: createRoom } = useCreateRoom();

  const handleRoomName = async () => {
    try {
      const room = await createRoom({ isGameMastered: true });

      router.push(`/room/${room.id}/pending`);
    } catch (error) {
      handleError(error);
    }
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
              source={require('@/assets/images/room-name.png')}
              style={styles.image}
            />
            <Input
              label="Code de la partie"
              value={roomName}
              setValue={(name) => setRoomName(name)}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={[styles.buttonContainer]}>
          <Button
            disabled={!roomName}
            color="primary"
            onPress={handleRoomName}
            text="Rejoindre la partie"
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
