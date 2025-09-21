import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/shared/components/Button';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';

import { useStartRoom } from './hooks/useStartRoom';

interface FooterActionsProps {
  roomId: string;
}

export function FooterActions({ roomId }: FooterActionsProps) {
  const { t } = useTranslation();
  const session = useGetSession();
  const room = useGetRoom(roomId);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const startRoom = useStartRoom();
  const { handleError } = useErrorHandler();

  const handleStartRoom = () => {
    startRoom.mutate(roomId, { onError: handleError });
  };

  return (
    <View style={[styles.bottomActions, { paddingBottom: insets.bottom + 20 }]}>
      {session.data?.id === room.data?.admin.id && (
        <Button
          color="primary"
          onPress={handleStartRoom}
          text={t('room.start.party.button')}
          disabled={
            !room.data?.hasEnoughPlayers || !room.data?.hasEnoughMissions
          }
        />
      )}

      <Button
        color="secondary"
        onPress={() => {
          router.push(`/room/${roomId}/pending/missions`);
        }}
        text={t('room.manage.missions')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomActions: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.primaryBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorderColor,
    gap: 12,
  },
});
