import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/shared/components/Button';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useUpdatePlayer } from '@/shared/hooks/useUpdatePlayer';
import { type Session } from '@/shared/types/session';

interface ConfirmKillButtonProps {
  session: Session;
}

export function ConfirmKillButton({ session }: ConfirmKillButtonProps) {
  const insets = useSafeAreaInsets();
  const updatePlayer = useUpdatePlayer();
  const { handleError } = useErrorHandler();

  const handleKillPlayer = () => {
    updatePlayer.mutate({ id: session.id }, { onError: handleError });
  };

  return (
    <View style={[styles.bottomActions, { paddingBottom: insets.bottom + 20 }]}>
      <Button
        color="primary"
        onPress={handleKillPlayer}
        text="Confirmer ma mort 💀"
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
