import { setupIntl } from '@/translations';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Fragment, useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Setup the translations
setupIntl('fr-FR');

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Fragment>
      <Stack screenOptions={{ headerShown: false }} />
    </Fragment>
  );
}
