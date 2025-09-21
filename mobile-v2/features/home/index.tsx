import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';

import { Button } from '@/shared/components/Button';
import { FadeInView } from '@/shared/components/FadeInView';
import { COLORS } from '@/shared/constants/theme';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { useTranslation } from '@/translations';

import CloseIcon from './icons/close.svg';

export function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session } = useGetSession();
  const queryClient = useQueryClient();

  const handleDeletePlayer = async () => {
    await AsyncStorage.removeItem('token');
    queryClient.setQueriesData({ queryKey: ['session'] }, null);
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
                <CloseIcon height={20} width={20} color={COLORS.arrowColor} />
              </Pressable>
            </View>
          )}
          <View style={styles.header}>
            <Text style={styles.title}>KILLER PARTY</Text>

            <LottieView
              source={require('./lotties/home.json')}
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
                  onPress={() => router.push('/join-room')}
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
