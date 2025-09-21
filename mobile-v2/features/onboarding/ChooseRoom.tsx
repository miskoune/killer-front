import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

import { COLORS } from '@/constants/theme';
import { selectPlayer } from '@/selectors/player';
import { Button } from '@/shared/components/Button';
import { Header } from '@/shared/components/Header';
import { AVATARS } from '@/shared/constants/avatars';
import { usePlayerStore } from '@/store/player';
import { useTranslation } from '@/translations';

export function ChooseRoom() {
  const { t } = useTranslation();
  const player = usePlayerStore(selectPlayer);
  const router = useRouter();

  const playerAvatar = AVATARS.find((avatar) => avatar.id === player?.avatar);

  return (
    <View style={styles.content}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Commencer à jouer" />
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
            color="primary"
            onPress={() => router.push('/create-room')}
            text={t('home.create.room.button')}
          />
          <Button
            color="secondary"
            onPress={() => router.push('/join-room')}
            text={t('home.join.room')}
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
    paddingBottom: 40,
    gap: 15,
  },
  avatar: {
    width: 300,
    height: 300,
    borderRadius: 50,
  },
  playerInfoContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
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
