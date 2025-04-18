import { type Dispatch, type SetStateAction } from 'react';
import { View } from 'react-native';

import { avatarsList, getRandomAvatar } from '../helpers/avatars';
import { useTranslation } from '../translations';

import { Button } from './Button';
import styles from './styles/CurrentAvatar.module.css';

interface Props {
  avatar?: string;
  updateAvatarCallback?: Dispatch<SetStateAction<string>>;
  height?: number;
  width?: number;
}

export function CurrentAvatar({
  avatar,
  updateAvatarCallback,
  height,
  width,
}: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <View style={styles.content}>
      <View style={styles.avatar}>
        {
          avatarsList({ height: height ?? 250, width: width ?? 250 })[
            avatar ?? getRandomAvatar()
          ]
        }
      </View>
      {updateAvatarCallback && (
        <Button
          color="secondary"
          onPress={() => updateAvatarCallback(getRandomAvatar())}
          text={t('avatar.refresh.title')}
        />
      )}
    </View>
  );
}
