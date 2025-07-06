import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

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

  /*   if (__DEV__) {
    AsyncStorage.clear().then(() => {
      console.log('AsyncStorage cleared on startup (dev only)');
    });
  } */

  return (
    <Providers>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 100,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="rules"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="onboarding" />
      </Stack>
      <StatusBar style="light" />
    </Providers>
  );
}
