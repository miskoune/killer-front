import { View, Text, StyleSheet } from 'react-native';

export function DeadView() {
  return (
    <View style={styles.container}>
      <Text>Vous êtes mort</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
