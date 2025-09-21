import {
  type RelativePathString,
  Stack,
  usePathname,
  useRouter,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MAP_ROOM_STATUS_TO_ROUTE } from '@/features/home/constants/room-status';
import { COLORS } from '@/shared/constants/theme';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { Providers } from '@/shared/utils/providers';
import { setupIntl } from '@/translations';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Setup the translations
setupIntl('fr-FR');

function AppLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const session = useGetSession();

  useEffect(() => {
    if (session?.data?.room?.id) {
      // eslint-disable-next-line no-console
      console.log('redirecting to room', { session: session.data.room.status });

      const route = MAP_ROOM_STATUS_TO_ROUTE.get(session.data.room.status);

      if (route) {
        router.replace(
          `/room/${session.data.room.id}/${route}` as RelativePathString,
        );
      }
    }
  }, [session, router, pathname]);

  return (
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
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Providers>
      <AppLayout />
      <StatusBar style="light" />
    </Providers>
  );
}
