import { useSession, useUpdatePlayer } from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import * as React from 'react';
import { type TextInput, View, ScrollView } from 'react-native';

import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Player } from '../../../../components/Player';
import { RoomGuard } from '../../../../components/RoomGuard';
import { useTranslation } from '../../../../translations';
import { type RootStackParamList } from '../../../../types/navigation';

import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'RoomSettings'>;

export function RoomSettings({ route }: Props): JSX.Element {
  const [pseudo, setPseudo] = React.useState('');
  const inputRef = React.useRef<TextInput>(null);
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();
  const { t } = useTranslation();

  const {
    params: { roomCode, routeName },
  } = route;

  const handleLeaveRoom = (): void => {
    updatePlayer.mutate({ id: session?.id, room: null });
  };

  const handleUpdatePseudo = async (): Promise<void> => {
    await updatePlayer.mutateAsync({
      id: session?.id,

      name: pseudo,
    });
  };

  const isPendingRoom = routeName === 'PendingRoom';

  return (
    <RoomGuard roomCode={roomCode} currentRouteName={routeName}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <LottieView
            source={require('../../../../assets/lotties/free-for-all.json')}
            autoPlay
            style={styles.lottie}
            loop
          />
          {session && (
            <Player
              player={{
                id: session.id,
                name: session.name,
                avatar: session.avatar,
                roomCode,
                hasAtLeastOneMission: Boolean(session.authoredMissions.length),
                status: session.status,
              }}
            />
          )}

          {isPendingRoom && (
            <Input
              innerRef={inputRef}
              label="Modifier le pseudo de votre joueur"
              value={pseudo}
              setValue={setPseudo}
            />
          )}
          <>
            {isPendingRoom && (
              <Button
                disabled={!pseudo}
                color="secondary"
                onPress={handleUpdatePseudo}
                text="Mettre à jour mon pseudo"
                isAsyncAction
              />
            )}
            <Button
              color="primary"
              onPress={handleLeaveRoom}
              text={t('room.leave.current.room')}
              isAsyncAction
            />
          </>
        </ScrollView>
      </View>
    </RoomGuard>
  );
}
