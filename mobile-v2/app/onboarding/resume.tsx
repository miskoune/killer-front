import { useRouter } from 'expo-router';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { AVATARS } from '@/features/onboarding/constants';
import { selectPlayer } from '@/selectors/player';
import { usePlayerStore } from '@/store/player';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Calculate the visible width for the ScrollView
const scrollViewVisibleWidth = SCREEN_WIDTH - 40; // 40 for container padding
// Calculate padding needed inside the ScrollView to center items
const SCROLL_OFFSET = scrollViewVisibleWidth;

export default function Resume() {
  const player = usePlayerStore(selectPlayer);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const playerAvatar = AVATARS.find((avatar) => avatar.id === player?.avatar);

  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
      <Header title="Récapitulatif" />
      <View style={styles.view}>
        <View style={styles.playerInfoContainer}>
          <Text style={styles.playerName}>{player?.name}</Text>
          <Text style={styles.playerSubtitle}>Votre profil est prêt</Text>
        </View>
        <View style={styles.avatarSliderContainer}>
          <View style={styles.avatarContainer}>
            {playerAvatar && (
              <Pressable style={styles.avatarWrapper}>
                <Image
                  source={playerAvatar.source}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          disabled={!player?.avatar}
          color="secondary"
          onPress={() => router.push('/')}
          text="Commencer à jouer"
          customStyle={{ marginBottom: insets.bottom }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
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
    opacity: 0.8,
  },
  playerInfoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  playerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  playerSubtitle: {
    fontSize: 18,
    color: 'black',
    opacity: 0.5,
  },
});
