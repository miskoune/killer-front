import { Image } from 'expo-image';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button } from '@/shared/components/Button';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';

interface EmptyStateProps {
  refresh: () => void;
  leaveRoom: () => void;
  refreshLoading: boolean;
  leaveRoomLoading: boolean;
}

export function EmptyState({
  refresh,
  leaveRoom,
  refreshLoading,
  leaveRoomLoading,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={refresh} />
        }
      >
        <Header title="Partie introuvable" />
        <View style={styles.content}>
          <Image
            source={require('./images/room-error.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Cette partie n&apos;existe pas.</Text>
          <Button
            color="primary"
            onPress={leaveRoom}
            text="Créer ou rejoindre une autre partie"
            disabled={leaveRoomLoading}
            isLoading={leaveRoomLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginHorizontal: 20,
    gap: 20,
    textAlign: 'center',
  },
  text: {
    color: COLORS.textPrimaryColor,
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
});
