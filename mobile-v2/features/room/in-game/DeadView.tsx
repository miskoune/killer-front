import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/shared/components/Button';
import { FadeInView } from '@/shared/components/FadeInView';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';
import { useLeaveRoom } from '../hooks/useLeaveRoom';

export function DeadView() {
  const insets = useSafeAreaInsets();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { t } = useTranslation();
  const { handleError } = useErrorHandler();
  const session = useGetSession();
  const room = useGetRoom(roomId);
  const leaveRoom = useLeaveRoom();

  const handleLeaveRoom = () => {
    leaveRoom.mutate(session.data?.id, { onError: handleError });
  };

  const confirmLeaveRoom = () => {
    Alert.alert(
      t('alert.leave.warning.title'),
      t('alert.leave.warning.description'),
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: t('room.leave.confirm.button'),
          style: 'destructive',
          onPress: handleLeaveRoom,
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <FadeInView style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <Header title="Fin de partie pour vous !" />

          <View style={styles.mainContent}>
            <Image source={require('./images/dead.png')} style={styles.image} />

            <Text style={styles.description}>
              {t('room.player.killed.title')}
            </Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>ℹ️ Que faire maintenant ?</Text>
              <Text style={styles.infoText}>
                • Vous pouvez rester pour voir la fin de la partie{'\n'}• Ou
                quitter définitivement cette partie{'\n'}• Malheureusement, vous
                ne pourrez plus revenir si vous quittez.
              </Text>
            </View>

            {room.data?.status === 'ENDED' && (
              <View style={styles.gameEndedBox}>
                <Text style={styles.gameEndedText}>
                  🎉 La partie est terminée ! Consultez les résultats.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={[styles.bottomActions, { paddingBottom: insets.bottom }]}>
          <Button
            color="primary"
            onPress={confirmLeaveRoom}
            text={t('room.leave.confirm.button')}
            isLoading={leaveRoom.isPending}
          />
        </View>
      </FadeInView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skullContainer: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: COLORS.errorColor,
  },
  skullEmoji: {
    fontSize: 64,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimaryColor,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondaryColor,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  infoBox: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimaryColor,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    lineHeight: 20,
  },
  gameEndedBox: {
    backgroundColor: COLORS.buttonPrimaryColor,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  gameEndedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.buttonPrimaryTextColor,
    textAlign: 'center',
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.primaryBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorderColor,
    gap: 12,
  },
  leaveButton: {
    backgroundColor: COLORS.errorColor,
  },
  image: {
    width: 300,
    height: 300,
  },
});
