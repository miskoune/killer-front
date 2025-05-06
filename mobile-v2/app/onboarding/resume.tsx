import { View, Text, StyleSheet } from 'react-native';

import { Header } from '@/components/Header';
import { selectPlayer } from '@/selectors/player';
import { usePlayerStore } from '@/store/player';

export default function Resume() {
  const player = usePlayerStore(selectPlayer);

  return (
    <View>
      <Header title="Récapitulatif" />
      <View style={styles.content}>
        <Text>Pseudo</Text>
        <Text>{player?.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
