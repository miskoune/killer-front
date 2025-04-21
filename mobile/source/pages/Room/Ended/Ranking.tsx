import React from 'react';
import { View, Text, Image } from 'react-native';

import { Room } from '../../../apis/room/types';
import { avatarsList } from '../../../helpers/avatars';
import { useTranslation } from '../../../translations';

import styles from './styles/Ranking.module.css';

interface Props {
  room: Room | undefined;
}

export function Ranking({ room }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.rankingTextContent}>
        <Text style={styles.rankingDescription}>
          {t('room.ended.ranking.description')}
        </Text>
      </View>
      <View style={styles.rankingPlayerContent}>
        {room?.players.map(({ name, avatar }) => (
          <View key={name} style={styles.rankingPlayer}>
            <View style={styles.rankingAvatar}>
              {avatarsList({ height: 50, width: 50 })[avatar]}
            </View>
            <Text>{name}</Text>
            <Image
              source={{ uri: 'work-in-progress' }}
              style={styles.rankingIcon}
            />
          </View>
        ))}
      </View>
    </>
  );
}
