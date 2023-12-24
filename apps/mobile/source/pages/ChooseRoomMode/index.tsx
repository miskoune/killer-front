import { useTranslation } from '@killerparty/intl';
import { useCreateRoom } from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { View, Text, ScrollView } from 'react-native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { type RootStackParamList } from '../../types/navigation';

import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseRoomMode'>;

export function ChooseRoomMode({ navigation }: Props): JSX.Element {
  const { createRoom } = useCreateRoom();
  const { t } = useTranslation();

  const handleNextPage = async (): Promise<void> => {
    const { id } = await createRoom.mutateAsync();

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
              onPress={handleNextPage}
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
              onPress={handleNextPage}
              text={t('create.room.free.for.all.mode.confirm.button')}
              isAsyncAction
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
