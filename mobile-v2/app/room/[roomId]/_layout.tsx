import { Stack } from 'expo-router';

import { useRoomRedirect } from '@/shared/hooks/useRoomRedirect';

export default function RoomLayout() {
  useRoomRedirect();

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
