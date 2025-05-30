import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Fragment } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InfosIcon from '@/assets/icons/infos.svg';
import { Button } from '@/components/Button';
import { FadeInView } from '@/components/FadeInView';
import { useGetSession } from '@/features/onboarding/queries';
import { useTranslation } from '@/translations';

export default function Index() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session } = useGetSession();

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.fadeInView}>
        <View style={styles.howToPlayView}>
          <Pressable
            onPress={() => router.push('/rules')}
            style={({ pressed }) => [
              styles.howToPlay,
              pressed && styles.howToPlayPressed,
            ]}
          >
            <InfosIcon
              height={14}
              width={14}
              color={styles.howToPlayText.color}
            />
            <Text style={styles.howToPlayText}>Règles du jeu</Text>
          </Pressable>
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
    paddingTop: 20,
  },
  fadeInView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  howToPlayView: {
    alignItems: 'flex-end',
  },
  howToPlay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: 'hsl(210, 7%, 20%)',
    shadowColor: 'hsl(210, 7%, 40%)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  howToPlayPressed: {
    backgroundColor: 'hsl(210, 7%, 40%)',
  },
  howToPlayText: {
    marginLeft: 5,
    textAlign: 'center',
    fontSize: 12,
    color: 'hsl(255, 100%, 100%)',
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
