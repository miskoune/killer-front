import { router, useRouter } from 'expo-router';
import { createRef, useState } from 'react';
import {
  View,
  type TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { useCreateRoom } from '@/requests/mutations';

export default function RoomName() {
  const [roomName, setRoomName] = useState('');
  const inputRef = createRef<TextInput>();

  const insets = useSafeAreaInsets();
  const { mutateAsync: createRoom } = useCreateRoom();

  const handleRoomName = async () => {
    try {
      const room = await createRoom({ isGameMastered: true });

      router.push(`/room/${room.id}/pending`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.content]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Header title="Choisir un nom pour la partie" />
        <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
          <View style={styles.view}>
            <Image
              source={require('@/assets/images/pseudo.png')}
              style={styles.lottie}
              resizeMode="contain"
            />
            <Input
              innerRef={inputRef}
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
            onPress={handleRoomName}
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
    borderTopWidth: 0.2,
    borderTopColor: '#DFD9FE',
  },
  lottie: {
    width: 220,
    height: 220,
    marginTop: -20,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
