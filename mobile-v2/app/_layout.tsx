import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '@/shared/constants/theme';
import { Providers } from '@/shared/utils/providers';
import { setupIntl } from '@/translations';

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
