import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, Pressable } from 'react-native';

import InfosIcon from '../../assets/icons/infos.svg';
import KillerParty from '../../assets/images/killerparty.svg';
import { Button } from '../../components/Button';
import { FadeInView } from '../../components/FadeInView';
import { useTranslation } from '../../translations';
import { type StackNavigation } from '../../types/navigation';

import styles from './styles/index.module.css';

export function HomePage(): JSX.Element {
  const { navigate } = useNavigation<StackNavigation>();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FadeInView style={styles.fadeInView}>
        <View style={styles.howToPlayView}>
          <Pressable
            style={({ pressed }) => [
              styles.howToPlay,
              pressed && styles.howToPlayPressed,
            ]}
            onPress={() => navigate('Rules')}
          >
            <InfosIcon height={14} width={14} />
            <Text style={styles.howToPlayText}>Régles du jeu</Text>
          </Pressable>
        </View>
        <View style={styles.header}>
          <View style={styles.image}>
            <KillerParty height={200} width={200} />
          </View>
          <View style={styles.banner}>
            <Text style={styles.title}>KILLER PARTY</Text>
          </View>
          <Text style={styles.headline}>
            Ça vous tente un petit meurtre.. entre amis ?
          </Text>
        </View>
        <View style={styles.actions}>
          <Button
            color="primary"
            onPress={() => navigate('ChoosePseudo', { shouldCreateRoom: true })}
            text={t('home.create.room.button')}
          />
          <Button
            color="secondary"
            onPress={() => navigate('ChoosePseudo')}
            text={t('home.join.room')}
          />
        </View>
      </FadeInView>
    </View>
  );
}
