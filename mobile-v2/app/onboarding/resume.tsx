import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { COLORS } from '@/constants/theme';
import { AVATARS } from '@/features/onboarding/constants';
import { selectPlayer } from '@/selectors/player';
import { usePlayerStore } from '@/store/player';

export default function Resume() {
  const player = usePlayerStore(selectPlayer);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const playerAvatar = AVATARS.find((avatar) => avatar.id === player?.avatar);

  console.log(playerAvatar);

  return (
    <View style={styles.content}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Récapitulatif" />
        <View style={styles.view}>
          <View style={styles.playerInfoContainer}>
            {playerAvatar && (
              <Image source={playerAvatar.source} style={styles.avatar} />
            )}
            <Text style={styles.playerName}>{player?.name}</Text>
            <Text style={styles.playerSubtitle}>Votre profil est prêt !</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            disabled={!player?.avatar}
            color="primary"
            onPress={() => router.push('/')}
            text="Commencer à jouer"
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  playerInfoContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: COLORS.secondaryBackgroundColor,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  playerName: {
    fontSize: 24,
    color: COLORS.textPrimaryColor,
    marginBottom: 8,
  },
  playerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondaryColor,
  },
});
