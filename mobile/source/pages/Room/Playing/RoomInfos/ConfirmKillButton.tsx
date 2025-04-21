import { useSession } from '../../../../apis/player/queries';
import { useUpdatePlayer } from '../../../../apis/player/mutations';

import { View, Text } from 'react-native';

import { Button } from '../../../../components/Button';

import styles from './styles/ConfirmKillButton.module.css';
import { useTranslation } from '../../../../translations';

export function ConfirmKillButton(): JSX.Element {
  const { t } = useTranslation();
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();

  const handleKillPlayer = async (): Promise<void> => {
    await updatePlayer.mutateAsync({ id: session?.id, status: 'KILLED' });
  };

  return (
    <View>
      <Text style={styles.title}>{t('room.killed.message')}</Text>
      <Text style={styles.subtitle}>{t('room.killed.notify')}</Text>
      <Button
        color="secondary"
        onPress={handleKillPlayer}
        text={t('room.killed.button')}
      />
    </View>
  );
}
