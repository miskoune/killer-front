import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/theme';
import { setupIntl } from '@/translations';
import { Providers } from '@/utils/providers';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Setup the translations
setupIntl('fr-FR');

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Providers>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primaryBackgroundColor,
          paddingTop: insets.top,
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 100,
            gestureEnabled: false,
          }}
        />
      </View>
      <StatusBar style="light" />
    </Providers>
  );
}
