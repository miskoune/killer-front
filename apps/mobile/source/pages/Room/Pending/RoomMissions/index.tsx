import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import * as React from 'react';
import { Text, ScrollView, View } from 'react-native';

import { useRoom } from '../../../../apis/room/queries';

import { RoomGuard } from '../../../../components/RoomGuard';
import { useTranslation } from '../../../../translations';
import { type TranslationKey } from '../../../../translations';
import { type RootStackParamList } from '../../../../types/navigation';

import { CreateMission } from './CreateMission';
import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'RoomMissions'>;

export function RoomMissions({ route }: Props): JSX.Element {
  const {
    params: { roomCode, routeName },
  } = route;

  const { t } = useTranslation();
  const { room } = useRoom(roomCode);

  return (
    <RoomGuard roomCode={roomCode} currentRouteName={routeName}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>
            {t('room.missions.count' as TranslationKey, {
              count: room?.missions.length,
            })}
          </Text>
          <LottieView
            source={require('../../../../assets/lotties/game-master.json')}
            autoPlay
            style={styles.lottie}
            loop
          />
          <CreateMission />
        </View>
      </ScrollView>
    </RoomGuard>
  );
}
