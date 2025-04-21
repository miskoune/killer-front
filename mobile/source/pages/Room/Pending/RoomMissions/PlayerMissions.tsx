import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useSession } from '../../../../apis/player/queries';
import { useDeleteMission } from '../../../../apis/mission/mutations';

import Delete from '../../../../assets/icons/close-small.svg';

import styles from './styles/PlayerMissions.module.css';

export function PlayerMissions(): JSX.Element {
  const [isLoading, setLoading] = useState(false);
  const [missionIdToDelete, setMissionIdToDelete] = useState<number | null>(
    null,
  );
  const { session } = useSession();
  const { deleteMission } = useDeleteMission();

  const handleDeleteMission = async (missionId: number): Promise<void> => {
    setLoading(true);
    setMissionIdToDelete(missionId);

    await deleteMission.mutateAsync(missionId).finally(() => {
      setLoading(false);
      setMissionIdToDelete(null);
    });
  };

  return (
    <View style={styles.cards}>
      {session?.authoredMissions?.map(({ id, content }) => (
        <TouchableOpacity
          key={`${id}-${content}`}
          onPress={() => handleDeleteMission(id)}
        >
          <View style={styles.card}>
            {isLoading && missionIdToDelete === id ? (
              <View style={styles.loading}>
                <ActivityIndicator size={14} color="white" />
                <Text style={styles.text}>{content}</Text>
              </View>
            ) : (
              <Text style={styles.text}>{content}</Text>
            )}
            <Delete
              height={16}
              width={16}
              fill="white"
              className={styles.deleteMission}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
