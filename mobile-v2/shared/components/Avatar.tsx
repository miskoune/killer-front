import { Image } from 'expo-image';
import React from 'react';
import {
  StyleSheet,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { AVATARS } from '@/shared/constants/avatars';
import { COLORS } from '@/shared/constants/theme';

interface AvatarProps {
  onPress?: () => void;
  size?: number;
  avatarId: string;
  style?: StyleProp<ViewStyle>;
}

export function Avatar({ onPress, size = 48, avatarId, style }: AvatarProps) {
  const avatarStyle = [
    styles.avatar,
    { width: size, height: size, borderRadius: size / 2 },
    style,
  ];

  const avatarData = AVATARS.find((avatar) => avatar.id === avatarId);

  if (!avatarData) {
    return null;
  }

  return (
    <Pressable onPress={onPress} style={avatarStyle}>
      <Image
        source={avatarData.source}
        style={{
          width: size,
          height: size,
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
