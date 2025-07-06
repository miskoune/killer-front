import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { COLORS } from '@/constants/theme';
import { AVATARS } from '@/features/onboarding/constants';

interface AvatarProps {
  onPress?: () => void;
  size?: number;
  avatarId: string;
}

export function Avatar({ onPress, size = 48, avatarId }: AvatarProps) {
  const avatarStyle = [
    styles.avatar,
    { width: size, height: size, borderRadius: size / 2 },
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
