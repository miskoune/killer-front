import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OnboardingLayout() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F9F9F9',
        paddingTop: insets.top,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 100,
        }}
      />
    </View>
  );
}
