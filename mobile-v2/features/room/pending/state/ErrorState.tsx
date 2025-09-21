import { Image } from 'expo-image';
import {
  StyleSheet,
  Text,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';

import { Button } from '@/shared/components/Button';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';

interface ErrorStateProps {
  refresh: () => void;
  leaveRoom: () => void;
  refreshLoading: boolean;
  leaveRoomLoading: boolean;
}

export function ErrorState({
  refresh,
  leaveRoom,
  refreshLoading,
  leaveRoomLoading,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={refresh} />
        }
      >
        <Header title="Partie indisponible" />
        <View style={styles.errorContainer}>
          <Image
            source={require('./images/room-error.png')}
            style={styles.image}
          />
          <Text style={styles.errorText}>
            Impossible de charger la partie. Veuillez réessayer.
          </Text>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginHorizontal: 20,
    gap: 20,
    textAlign: 'center',
  },
  errorText: {
    color: COLORS.textPrimaryColor,
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
});
