import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { COLORS } from '@/constants/theme';
import { AVATARS } from '@/features/onboarding/constants';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useCreatePlayer } from '@/requests/mutations';
import { selectPlayer, selectUpdatePlayer } from '@/selectors/player';
import { usePlayerStore } from '@/store/player';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Calculate the visible width for the ScrollView
const scrollViewVisibleWidth = SCREEN_WIDTH - 40; // 40 for container padding
// Calculate padding needed inside the ScrollView to center items
const SCROLL_OFFSET = scrollViewVisibleWidth;

export default function Avatar() {
  const player = usePlayerStore(selectPlayer);
  const updatePlayer = usePlayerStore(selectUpdatePlayer);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { mutateAsync: createPlayer } = useCreatePlayer();
  const { handleError } = useErrorHandler();

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

  const handleCreatePlayer = async () => {
    if (!player?.name || !player?.avatar) return;

    try {
      await createPlayer({
        name: player.name,
        avatar: player.avatar,
      });

      router.push('/onboarding/resume');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <View style={styles.content}>
      <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
        <Header title="Choisir un avatar" />
        <View style={[styles.view]}>
          <View style={styles.avatarSliderContainer}>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={[
                styles.avatarContainer,
                { width: SCROLL_OFFSET * AVATARS.length },
              ]}
              snapToInterval={SCROLL_OFFSET}
              decelerationRate="fast"
              snapToAlignment="center"
              scrollEnabled={false}
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
                  <Image source={avatar.source} style={styles.avatar} />
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
                size={22}
                color={
                  currentIndex === 0
                    ? COLORS.arrowColorInactive
                    : COLORS.arrowColor
                }
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
                size={22}
                color={
                  currentIndex === AVATARS.length - 1
                    ? COLORS.arrowColorInactive
                    : COLORS.arrowColor
                }
              />
            </Pressable>
          </View>
        </View>

        <View style={[styles.buttonContainer]}>
          <Button
            disabled={!player?.avatar}
            color="primary"
            onPress={handleCreatePlayer}
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 20,
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
    borderRadius: 10,
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
    backgroundColor: COLORS.secondaryBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButtonDisabled: {
    opacity: 0.5,
  },
});
