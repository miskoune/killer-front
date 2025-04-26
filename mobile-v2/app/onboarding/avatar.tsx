import { StyleSheet, View, Text } from 'react-native';

import { Header } from '@/components/Header';

export default function Avatar() {
  return (
    <View style={styles.container}>
      <Header title="Choisir un avatar" />
      <Text>Avatar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
