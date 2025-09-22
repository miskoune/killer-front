import { Stack } from 'expo-router';

import { useRoomEvents } from '@/shared/hooks/useRoomEvents';
import { useRoomRedirect } from '@/shared/hooks/useRoomRedirect';

export default function RoomLayout() {
  useRoomRedirect();
  useRoomEvents();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 100,
        gestureEnabled: false,
      }}
    />
  );
}
