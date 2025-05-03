import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createRef, useState, useRef } from 'react';
import {
  View,
  type TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { selectPlayer, selectUpdatePlayer } from '@/selectors/player';
import { usePlayerStore } from '@/store/player';

const AVATARS = [
  { id: 'pumpkin', source: require('@/assets/avatars/pumpkin.png') },
  { id: 'mummy', source: require('@/assets/avatars/mummy.png') },
];

const AVATAR_WIDTH = 200;
const AVATAR_SPACING = 20;
const SCROLL_OFFSET = AVATAR_WIDTH + AVATAR_SPACING;

export default function Avatar() {
  const player = usePlayerStore(selectPlayer);
  const updatePlayer = usePlayerStore(selectUpdatePlayer);
  const inputRef = createRef<TextInput>();
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAvatarSelect = (avatarId: string, index: number) => {
    setCurrentIndex(index);
    updatePlayer({ avatar: avatarId });
  };

  const scrollToNext = () => {
    if (currentIndex < AVATARS.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCROLL_OFFSET,
        animated: true,
      });
      handleAvatarSelect(AVATARS[nextIndex].id, nextIndex);
    }
  };

  const scrollToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      scrollViewRef.current?.scrollTo({
        x: prevIndex * SCROLL_OFFSET,
        animated: true,
      });
      handleAvatarSelect(AVATARS[prevIndex].id, prevIndex);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.content]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
        <Header title="Choisir un avatar" />
        <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
          <View style={[styles.view]}>
            <View style={styles.avatarSliderContainer}>
              <Pressable
                onPress={scrollToPrevious}
                style={[
                  styles.arrowButton,
                  currentIndex === 0 && styles.arrowButtonDisabled,
                ]}
                disabled={currentIndex === 0}
              >
                <Ionicons name="chevron-back" size={24} color="#DFD9FE" />
              </Pressable>

              <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.avatarContainer}
                snapToInterval={SCROLL_OFFSET}
                decelerationRate="fast"
              >
                {AVATARS.map((avatar, index) => (
                  <Pressable
                    key={avatar.id}
                    onPress={() => handleAvatarSelect(avatar.id, index)}
                    style={[
                      styles.avatarWrapper,
                      player?.avatar === avatar.id && styles.selectedAvatar,
                    ]}
                  >
                    <Image
                      source={avatar.source}
                      style={styles.avatar}
                      resizeMode="contain"
                    />
                  </Pressable>
                ))}
              </ScrollView>

              <Pressable
                onPress={scrollToNext}
                style={[
                  styles.arrowButton,
                  currentIndex === AVATARS.length - 1 &&
                    styles.arrowButtonDisabled,
                ]}
                disabled={currentIndex === AVATARS.length - 1}
              >
                <Ionicons name="chevron-forward" size={24} color="#DFD9FE" />
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={[styles.buttonContainer]}>
          <Button
            disabled={!player?.avatar}
            color="primary"
            onPress={() => router.push('/onboarding/create-room')}
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
    backgroundColor: '#F9F9F9',
  },
  view: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 0.2,
    borderTopColor: '#DFD9FE',
  },
  avatarSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    padding: 20,
    gap: 20,
  },
  avatarWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedAvatar: {
    borderWidth: 3,
    borderColor: '#DFD9FE',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#DFD9FE',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  arrowButtonDisabled: {
    opacity: 0.5,
  },
});
