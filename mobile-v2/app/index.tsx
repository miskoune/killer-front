import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { FadeInView } from '@/components/FadeInView';
import { COLORS } from '@/constants/theme';
import { useGetSession } from '@/features/onboarding/queries';
import { useTranslation } from '@/translations';

export default function Index() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session } = useGetSession();

  useEffect(() => {
    if (session?.room?.id && session.room.status === 'PENDING') {
      router.push(`/room/${session.room.id}/pending`);
    }
  }, [session, router]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <FadeInView style={styles.fadeInView}>
          <View style={styles.howToPlayView}>
            {session?.avatar && <Avatar avatarId={session.avatar} />}
          </View>
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
              <Button
                color="primary"
                onPress={() => router.push('/create-room/room-name')}
                text={t('home.create.room.button')}
              />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
    paddingTop: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  fadeInView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  howToPlayView: {
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
  banner: {
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: 'bisque',
    shadowColor: 'hsl(210, 7%, 40%)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    borderRadius: 5,
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
    gap: 10,
  },
});
