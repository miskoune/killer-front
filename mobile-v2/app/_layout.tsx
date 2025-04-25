import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';

import { setupIntl } from '@/translations';
import { Providers } from '@/utils/providers';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Setup the translations
setupIntl('fr-FR');

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Providers>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="rules" options={{ presentation: 'modal' }} />
        <Stack.Screen name="pseudo" options={{ presentation: 'modal' }} />
      </Stack>
    </Providers>
  );
}
