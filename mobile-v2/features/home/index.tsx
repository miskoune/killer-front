import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SettingsIcon from '@/shared/assets/icons/settings.svg';
import { Button } from '@/shared/components/Button';
import { FadeInView } from '@/shared/components/FadeInView';
import { COLORS } from '@/shared/constants/theme';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { useTranslation } from '@/translations';

export function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const session = useGetSession();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={session.isFetching}
            onRefresh={session.refetch}
          />
        }
      >
        <FadeInView style={styles.fadeInView}>
          <View style={styles.deletePlayer}>
            <Pressable
              onPress={() => router.push('/settings')}
              style={({ pressed }) => [
                !session?.data?.name && styles.hideIcon,
                styles.icon,
                styles.iconContainer,
                pressed && styles.iconPressedContainer,
              ]}
            >
              <SettingsIcon height={20} width={20} color={COLORS.arrowColor} />
            </Pressable>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>KILLER PARTY</Text>

            <LottieView
              source={require('./lotties/home.json')}
              autoPlay
              style={styles.image}
              loop
            />
          </View>
          <View style={[styles.actions, { marginBottom: insets.bottom }]}>
            {session?.data?.name ? (
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
                onPress={() => router.push('/onboarding/choose-avatar')}
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
    padding: 20,
    paddingBottom: 0,
    backgroundColor: COLORS.primaryBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorderColor,
    gap: 15,
  },
  icon: {
    borderRadius: 10,
  },
  iconContainer: {
    backgroundColor: COLORS.arrowButtonColor,
    padding: 8,
  },
  iconPressedContainer: {
    backgroundColor: COLORS.arrowButtonPressedColor,
  },
  hideIcon: {
    opacity: 0,
  },
});
