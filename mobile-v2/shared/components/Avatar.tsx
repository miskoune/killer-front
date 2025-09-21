import { Image } from 'expo-image';
import React from 'react';
import {
  StyleSheet,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { COLORS } from '@/constants/theme';
import { AVATARS } from '@/shared/constants/avatars';

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
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [avatarStyle, pressed && styles.avatarPressed]}
    >
      {
        <Image
          source={avatarData.source}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  avatarPressed: {
    backgroundColor: COLORS.arrowButtonPressedColor,
  },
});
