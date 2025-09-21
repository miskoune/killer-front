import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';

import { useGetRoom } from '../hooks/useGetRoom';
import { useLeaveRoom } from '../hooks/useLeaveRoom';

export function RoomError() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const session = useGetSession();
  const room = useGetRoom(roomId);
  const leaveRoom = useLeaveRoom();
  const { handleError } = useErrorHandler();
  const router = useRouter();

  const handleLeaveRoom = () => {
    leaveRoom.mutate(session.data?.id, {
      onError: handleError,
      onSuccess: () => router.replace('/'),
    });
  };

  const handleRefresh = () => {
    Promise.all([session.refetch(), room.refetch()]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={session.isPending || room.isPending}
            onRefresh={handleRefresh}
          />
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
            onPress={handleLeaveRoom}
            text="Créer ou rejoindre une autre partie"
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
