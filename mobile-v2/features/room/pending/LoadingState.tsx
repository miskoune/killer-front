import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';

export function LoadingState() {
  return (
    <View style={styles.container}>
      <Header title="Chargement..." />
      <View style={styles.content}>
        <ActivityIndicator size="large" color={COLORS.buttonPrimaryColor} />
        <Text style={styles.text}>Chargement de la partie...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    color: COLORS.textSecondaryColor,
    fontSize: 16,
  },
});
