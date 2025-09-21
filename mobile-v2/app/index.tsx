import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, usePathname } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';

import DeletePlayerIcon from '@/assets/icons/x.svg';
import { Button } from '@/components/Button';
import { FadeInView } from '@/components/FadeInView';
import { COLORS } from '@/constants/theme';
import { selectClearPlayer } from '@/selectors/player';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { usePlayerStore } from '@/store/player';
import { useTranslation } from '@/translations';

export default function Index() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useGetSession();
  const clearPlayer = usePlayerStore(selectClearPlayer);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Only redirect if we're actually on the index page
    if (
      pathname === '/' &&
      session?.room?.id &&
      session.room.status === 'PENDING'
    ) {
      router.replace(`/room/${session.room.id}/pending`);
    }
  }, [session, router, pathname]);

  const handleDeletePlayer = async () => {
    await AsyncStorage.removeItem('token');
    queryClient.setQueriesData({ queryKey: ['session'] }, null);
    clearPlayer();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <FadeInView style={styles.fadeInView}>
          {__DEV__ && (
            <View style={styles.deletePlayer}>
              <Pressable
                onPress={handleDeletePlayer}
                style={({ pressed }) => [
                  styles.icon,
                  styles.arrowIconContainer,
                  pressed && styles.arrowIconPressedContainer,
                ]}
              >
                <DeletePlayerIcon
                  height={20}
                  width={20}
                  color={COLORS.arrowColor}
                />
              </Pressable>
            </View>
          )}
          <View style={styles.header}>
            <Text style={styles.title}>KILLER PARTY</Text>

            <LottieView
              source={require('@/assets/lotties/players.json')}
              autoPlay
              style={styles.image}
              loop
            />
          </View>
          <View style={styles.actions}>
            {session?.name ? (
              <>
                <Button
                  color="primary"
                  onPress={() => router.push('/create-room')}
                  text={t('home.create.room.button')}
                />
                <Button
                  color="secondary"
                  onPress={() => router.push('/join-room/room-code')}
                  text={t('home.join.room')}
                />
              </>
            ) : (
              <Button
                color="primary"
                onPress={() => router.push('/onboarding/choose-pseudo')}
                text="Commencer à jouer"
              />
            )}
          </View>
        </FadeInView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  scrollViewContent: {
    flex: 1,
  },
  fadeInView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  deletePlayer: {
    alignItems: 'flex-end',
    marginRight: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 400,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: COLORS.textSecondaryColor,
    marginTop: 5,
    fontSize: 18,
    fontWeight: '400',
  },
  actions: {
    margin: 20,
    marginBottom: 40,
    gap: 10,
  },
  icon: {
    borderRadius: 10,
  },
  arrowIconContainer: {
    backgroundColor: COLORS.arrowButtonColor,
    padding: 8,
  },
  arrowIconPressedContainer: {
    backgroundColor: COLORS.arrowButtonPressedColor,
  },
});
