import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/shared/components/Button';
import { Header } from '@/shared/components/Header';
import { AVATARS } from '@/shared/constants/avatars';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

import { useCreatePlayer } from './hooks/useCreatePlayer';
import {
  selectPlayer,
  selectUpdatePlayer,
  usePlayerStore,
} from './store/player';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Calculate grid dimensions
const PADDING = 20;
const GAP = 15;
const COLUMNS = 2;
const AVATAR_WIDTH =
  (SCREEN_WIDTH - PADDING * 2 - GAP * (COLUMNS - 1)) / COLUMNS;

export function ChooseAvatar() {
  const player = usePlayerStore(selectPlayer);
  const updatePlayer = usePlayerStore(selectUpdatePlayer);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    player?.avatar || null,
  );
  const createPlayer = useCreatePlayer();
  const { handleError } = useErrorHandler();

  const handleAvatarSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    updatePlayer({ avatar: avatarId });
  };

  const handleCreatePlayer = async () => {
    if (!player?.name || !player?.avatar) return;

    createPlayer.mutate(
      {
        name: player.name,
        avatar: player.avatar,
      },
      {
        onSuccess: () => router.push('/onboarding/choose-room'),
        onError: handleError,
      },
    );
  };

  return (
    <View style={styles.content}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Header title="Choisir un avatar" showBackButton />
        <View style={styles.view}>
          <View style={styles.avatarGrid}>
            {AVATARS.map((avatar) => (
              <Pressable
                key={avatar.id}
                onPress={() => handleAvatarSelect(avatar.id)}
                style={[
                  styles.avatarCard,
                  selectedAvatar === avatar.id && styles.avatarCardSelected,
                ]}
              >
                <View style={styles.avatarImageContainer}>
                  <Image source={avatar.source} style={styles.avatar} />
                </View>
                <Text
                  style={[
                    styles.avatarName,
                    selectedAvatar === avatar.id && styles.avatarNameSelected,
                  ]}
                >
                  {avatar.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          color="primary"
          onPress={handleCreatePlayer}
          text="Suivant"
          customStyle={{ marginBottom: insets.bottom }}
          disabled={createPlayer.isPending || !selectedAvatar}
          isLoading={createPlayer.isPending}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  view: {
    flex: 1,
    paddingHorizontal: PADDING,
    paddingVertical: 20,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    justifyContent: 'space-between',
  },
  avatarCard: {
    width: AVATAR_WIDTH,
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarCardSelected: {
    borderColor: COLORS.buttonPrimaryColor,
    backgroundColor: COLORS.buttonPrimaryColor + '20',
  },
  avatarImageContainer: {
    width: AVATAR_WIDTH - 32,
    height: AVATAR_WIDTH - 32,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    textAlign: 'center',
  },
  avatarNameSelected: {
    color: COLORS.buttonPrimaryColor,
  },
  buttonContainer: {
    padding: PADDING,
    paddingTop: 20,
    backgroundColor: COLORS.primaryBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorderColor,
    gap: 12,
  },
});
