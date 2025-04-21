import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomStatusBar(): JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ height: insets.top, backgroundColor: '#fdf7f2' }}>
      <StatusBar animated backgroundColor="#fdf7f2" />
    </View>
  );
}
