import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#fff', paddingTop: 20 }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 100,
            gestureEnabled: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="rules" options={{ presentation: 'modal' }} />
          <Stack.Screen name="onboarding" />
        </Stack>
      </SafeAreaView>
      <StatusBar style="dark" />
    </Providers>
  );
}
