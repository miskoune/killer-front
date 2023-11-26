import { setupIntl } from '@killerparty/intl';
import {
  WebServicesProvider,
  getSessionRequest,
  type Session,
} from '@killerparty/webservices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';

import { Routes } from './routes';

import 'intl-pluralrules';

setupIntl('fr-FR');

SplashScreen.preventAutoHideAsync();

export function App(): JSX.Element | null {
  const [appIsReady, setAppIsReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSessionIfTokenAvailable(): Promise<void> {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        const userSession = await getSessionRequest();

        setSession(userSession);
        setAppIsReady(true);
      } else {
        setAppIsReady(true);
      }
    }

    fetchSessionIfTokenAvailable();
  }, [setAppIsReady]);

  const onLayoutRootView = useCallback(async () => {
    // This is a workaround to wait for all SVGs to be loaded before hiding the splash screen.
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <NavigationContainer onReady={onLayoutRootView}>
        <WebServicesProvider>
          <Routes session={session} />
        </WebServicesProvider>
      </NavigationContainer>
      <StatusBar />
    </>
  );
}
