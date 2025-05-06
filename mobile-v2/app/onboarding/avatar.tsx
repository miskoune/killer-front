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
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { selectPlayer, selectUpdatePlayer } from '@/selectors/player';
import { usePlayerStore } from '@/store/player';

const AVATARS = [
  { id: 'pumpkin', source: require('@/assets/avatars/pumpkin.png') },
  { id: 'mummy', source: require('@/assets/avatars/mummy.png') },
  {
    id: 'frankeinstein',
    source: require('@/assets/avatars/frankeinstein.png'),
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Calculate the visible width for the ScrollView
const scrollViewVisibleWidth = SCREEN_WIDTH - 40; // 40 for container padding
// Calculate padding needed inside the ScrollView to center items
const SCROLL_OFFSET = scrollViewVisibleWidth;

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
              <ScrollView
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                  styles.avatarContainer,
                  { width: SCROLL_OFFSET * AVATARS.length },
                ]}
                snapToInterval={SCROLL_OFFSET}
                decelerationRate="fast"
                snapToAlignment="center"
              >
                {AVATARS.map((avatar, index) => (
                  <Pressable
                    key={avatar.id}
                    onPress={() => {
                      handleAvatarSelect(avatar.id, index);
                      scrollViewRef.current?.scrollTo({
                        x: index * SCROLL_OFFSET,
                        animated: true,
                      });
                    }}
                    style={[styles.avatarWrapper]}
                  >
                    <Image
                      source={avatar.source}
                      style={styles.avatar}
                      resizeMode="contain"
                    />
                  </Pressable>
                ))}
              </ScrollView>
            </View>
            <View style={styles.arrowContainer}>
              <Pressable
                onPress={scrollToPrevious}
                style={[
                  styles.arrowButton,
                  currentIndex === 0 && styles.arrowButtonDisabled,
                ]}
                disabled={currentIndex === 0}
              >
                <Ionicons
                  name="chevron-back"
                  size={32}
                  color={currentIndex === 0 ? '#DFD9FE' : '#A291FE'}
                />
              </Pressable>
              <Pressable
                onPress={scrollToNext}
                style={[
                  styles.arrowButton,
                  currentIndex === AVATARS.length - 1 &&
                    styles.arrowButtonDisabled,
                ]}
                disabled={currentIndex === AVATARS.length - 1}
              >
                <Ionicons
                  name="chevron-forward"
                  size={32}
                  color={
                    currentIndex === AVATARS.length - 1 ? '#DFD9FE' : '#A291FE'
                  }
                />
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={[styles.buttonContainer]}>
          <Button
            disabled={!player?.avatar}
            color="primary"
            onPress={() => router.push('/onboarding/resume')}
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
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: SCROLL_OFFSET,
    height: 300,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 4,
    elevation: 3,
  },

  avatar: {
    width: '100%',
    height: '100%',
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 10,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#DFD9FE',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  arrowButtonDisabled: {
    opacity: 0.3,
  },
});
