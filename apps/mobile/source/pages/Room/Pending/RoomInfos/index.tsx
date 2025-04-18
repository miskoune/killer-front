import { useSession } from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import InfosIcon from '../../../../assets/icons/infos.svg';
import KillerParty from '../../../../assets/images/killerparty.svg';
import { Player } from '../../../../components/Player';
import { RoomGuard } from '../../../../components/RoomGuard';
import { useTranslation } from '../../../../translations';
import { type RootStackParamList } from '../../../../types/navigation';

import { CanStartParty } from './CanStartParty';
import { RoomMissions } from './RoomMissions';
import { StartPartyButton } from './StartPartyButton';
import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'RoomInfos'>;

export function RoomInfos({ route, navigation }: Props): JSX.Element | null {
  const { t } = useTranslation();
  const { session } = useSession();

  const {
    params: { roomCode, routeName },
  } = route;

  return (
    <RoomGuard roomCode={roomCode} currentRouteName={routeName}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.howToPlayView}>
            <Pressable
              style={({ pressed }) => [
                styles.howToPlay,
                pressed && styles.howToPlayPressed,
              ]}
              onPress={() => navigation.navigate('Rules')}
            >
              <InfosIcon height={14} width={14} />
              <Text style={styles.howToPlayText}>Régles du jeu</Text>
            </Pressable>
          </View>
          <KillerParty height={200} width={200} style={styles.image} />
          <Text style={styles.title}>{t('room.welcome.title')}</Text>
          <Text style={styles.joinRoomCode} selectable>
            {t('room.join.room.code', { roomCode })}
          </Text>
          <StartPartyButton roomCode={roomCode} />
          <CanStartParty roomCode={roomCode} />
          <RoomMissions roomCode={roomCode} />
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
        </View>
      </ScrollView>
    </RoomGuard>
  );
}
