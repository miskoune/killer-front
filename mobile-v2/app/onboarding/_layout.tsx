import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 100,
        contentStyle: {
          backgroundColor: '#fff',
          paddingHorizontal: 20,
        },
      }}
    />
  );
}
