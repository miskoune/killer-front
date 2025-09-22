import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/shared/components/Button';
import { COLORS } from '@/shared/constants/theme';
import { useTranslation } from '@/translations';

interface FooterActionsProps {
  roomId: string;
}

export function FooterActions({ roomId }: FooterActionsProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bottomActions, { paddingBottom: insets.bottom }]}>
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
