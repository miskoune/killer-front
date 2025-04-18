import * as React from 'react';
import { Text, Pressable, Share, View } from 'react-native';

import ShareIcon from '../../../../assets/icons/share.svg';
import { useTranslation } from '../../../../translations';

import styles from './styles/ShareRoomLink.module.css';

interface Props {
  roomCode: string;
}

export function ShareRoomLink({ roomCode }: Props): JSX.Element {
  const { t } = useTranslation();

  const shareRoomLink = async (): Promise<void> => {
    await Share.share({
      message: t('room.share.link.message'),
      url: `https://killerparty.app/join/${roomCode}`,
    });
  };

  return (
    <View style={styles.content}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={shareRoomLink}
      >
        <ShareIcon height={14} width={14} />
        <Text style={styles.text}>Inviter des joueurs à la partie</Text>
      </Pressable>
    </View>
  );
}
