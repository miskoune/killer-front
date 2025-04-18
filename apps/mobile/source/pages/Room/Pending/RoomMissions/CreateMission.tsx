import { useCreateMission } from '@killerparty/webservices';
import * as React from 'react';
import { View } from 'react-native';

import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { useTranslation } from '../../../../translations';

import { PlayerMissions } from './PlayerMissions';
import styles from './styles/CreateMission.module.css';

export function CreateMission(): JSX.Element {
  const [mission, setMission] = React.useState('');
  const { t } = useTranslation();
  const { createMission } = useCreateMission();

  const handleCreateMission = async (): Promise<void> => {
    await createMission.mutateAsync(mission);

    setMission('');
  };

  return (
    <View style={styles.content}>
      <Input
        label="Ajouter une mission à la partie"
        value={mission}
        setValue={setMission}
      />
      <Button
        color="primary"
        disabled={!mission}
        onPress={handleCreateMission}
        text={t('room.create.new.mission.button')}
        isAsyncAction
      />
      <PlayerMissions />
    </View>
  );
}
