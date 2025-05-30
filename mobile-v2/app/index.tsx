import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Fragment } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { FadeInView } from '@/components/FadeInView';
import { useGetSession } from '@/features/onboarding/queries';
import { useTranslation } from '@/translations';

export default function Index() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session } = useGetSession();

  console.log({ session });

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.fadeInView}>
        <View style={styles.howToPlayView}>
          {session?.avatar && <Avatar avatarId={session.avatar} />}
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>KILLER PARTY</Text>
          <Text style={styles.headline}>{t('home.title')}</Text>
          <LottieView
            source={require('@/assets/lotties/players.json')}
            autoPlay
            style={styles.image}
            loop
          />
        </View>
        <View style={styles.actions}>
          {session?.name ? (
            <Fragment>
              <Button
                color="primary"
                onPress={() => router.push('/create-room/room-name')}
                text={t('home.create.room.button')}
              />
              <Button
                color="secondary"
                onPress={() => router.push('/onboarding/pseudo')}
                text={t('home.join.room')}
              />
            </Fragment>
          ) : (
            <Button
              color="secondary"
              onPress={() => router.push('/onboarding/pseudo')}
              text="Commencer à jouer"
            />
          )}
        </View>
      </FadeInView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
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
    width: 300,
    height: 300,
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
    color: 'hsl(210, 7%, 30%)',
    textAlign: 'center',
    marginTop: 10,
  },
  headline: {
    textAlign: 'center',
    color: 'hsl(210, 7%, 40%)',
    marginTop: 5,
    fontSize: 16,
    fontWeight: '300',
  },
  actions: {
    margin: 20,
    gap: 10,
  },
});
