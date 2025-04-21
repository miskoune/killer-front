import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { useCreateRoom } from '../../apis/room/mutations';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { useTranslation } from '../../translations';
import { type RootStackParamList } from '../../types/navigation';

import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseRoomMode'>;

export function ChooseRoomMode({ navigation }: Props): JSX.Element {
  const { createRoom } = useCreateRoom();
  const { t } = useTranslation();

  const handleNextPage = async ({ isGameMastered = false }): Promise<void> => {
    const { id } = await createRoom.mutateAsync({ isGameMastered });

    return navigation.reset({
      routes: [{ name: 'PendingRoom', params: { roomCode: id } }],
    });
  };

  return (
    <View style={styles.content}>
      <Header
        shouldHandlePreviousPage
        title={t('home.create.room.choose.mode')}
      />
      <ScrollView>
        <View style={styles.view}>
          <View>
            <LottieView
              source={require('../../assets/lotties/game-master.json')}
              autoPlay
              style={styles.lottie}
              loop
            />
            <Text style={styles.modeTitle}>
              {t('create.room.game.master.mode.title')}
            </Text>
            <Text style={styles.modeDescription}>
              {t('create.room.game.master.mode.description')}
            </Text>
            <Button
              color="primary"
              onPress={() => handleNextPage({ isGameMastered: true })}
              text={t('create.room.game.master.mode.confirm.button')}
              isAsyncAction
            />
          </View>
          <View>
            <LottieView
              source={require('../../assets/lotties/free-for-all.json')}
              autoPlay
              style={styles.lottie}
              loop
            />
            <Text style={styles.modeTitle}>
              {t('create.room.free.for.all.mode.title')}
            </Text>
            <Text style={styles.modeDescription}>
              {t('create.room.free.for.all.mode.description')}
            </Text>
            <Button
              color="secondary"
              onPress={() => handleNextPage({ isGameMastered: false })}
              text={t('create.room.free.for.all.mode.confirm.button')}
              isAsyncAction
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
