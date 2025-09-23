import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/shared/components/Button';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useTranslation } from '@/translations';

import { useCreateRoom } from './hooks/useCreateRoom';

export function CreateRoom() {
  const { t } = useTranslation();
  const [isGameMastered, setIsGameMastered] = useState(false);
  const { handleError } = useErrorHandler();
  const insets = useSafeAreaInsets();
  const createRoom = useCreateRoom();

  const handleCreateRoom = () => {
    createRoom.mutate(
      { isGameMastered },
      {
        onSuccess: ({ id }) => router.push(`/room/${id}/pending`),
        onError: handleError,
      },
    );
  };

  return (
    <View style={[styles.content]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Header title={t('home.create.room.choose.mode')} showBackButton />

        <View style={styles.view}>
          {/* Mode selector */}
          <View style={styles.modeSection}>
            {/* Free for all mode */}
            <TouchableOpacity
              style={[
                styles.modeCard,
                !isGameMastered && styles.modeCardSelected,
              ]}
              onPress={() => setIsGameMastered(false)}
            >
              <Image
                source={require('./images/free-for-all.png')}
                style={styles.image}
              />
              <View style={styles.modeCardHeader}>
                <View
                  style={[
                    styles.radioButton,
                    !isGameMastered && styles.radioButtonSelected,
                  ]}
                >
                  {!isGameMastered && <View style={styles.radioButtonInner} />}
                </View>

                <Text
                  style={[
                    styles.modeCardTitle,
                    !isGameMastered && styles.modeCardTitleSelected,
                  ]}
                >
                  {t('create.room.free.for.all.mode.title')}
                </Text>
              </View>
              <Text
                style={[
                  styles.modeCardDescription,
                  !isGameMastered && styles.modeCardDescriptionSelected,
                ]}
              >
                {t('create.room.free.for.all.mode.description')}
              </Text>
            </TouchableOpacity>

            {/* Game master mode */}
            <TouchableOpacity
              style={[
                styles.modeCard,
                isGameMastered && styles.modeCardSelected,
              ]}
              onPress={() => setIsGameMastered(true)}
            >
              <Image
                source={require('./images/game-master.png')}
                style={styles.image}
              />
              <View style={styles.modeCardHeader}>
                <View
                  style={[
                    styles.radioButton,
                    isGameMastered && styles.radioButtonSelected,
                  ]}
                >
                  {isGameMastered && <View style={styles.radioButtonInner} />}
                </View>
                <Text
                  style={[
                    styles.modeCardTitle,
                    isGameMastered && styles.modeCardTitleSelected,
                  ]}
                >
                  {t('create.room.game.master.mode.title')}
                </Text>
              </View>
              <Text
                style={[
                  styles.modeCardDescription,
                  isGameMastered && styles.modeCardDescriptionSelected,
                ]}
              >
                {t('create.room.game.master.mode.description')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.buttonContainer]}>
        <Button
          disabled={createRoom.isPending}
          color="primary"
          onPress={handleCreateRoom}
          text="Créer la partie"
          customStyle={{ marginBottom: insets.bottom }}
          isLoading={createRoom.isPending}
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
  view: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 0,
    backgroundColor: COLORS.primaryBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorderColor,
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  modeSection: {
    gap: 5,
  },
  modeSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    marginBottom: 8,
  },
  modeCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.inputBorderColor,
    padding: 16,
    marginBottom: 8,
  },
  modeCardSelected: {
    borderColor: COLORS.buttonPrimaryColor,
    backgroundColor: COLORS.buttonPrimaryColor + '20',
  },
  modeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.inputBorderColor,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: COLORS.buttonPrimaryColor,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.buttonPrimaryColor,
  },
  modeCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondaryColor,
    flex: 1,
  },
  modeCardTitleSelected: {
    color: COLORS.buttonPrimaryColor,
  },
  modeCardDescription: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    lineHeight: 20,
  },
  modeCardDescriptionSelected: {
    color: COLORS.textPrimaryColor,
  },
});
