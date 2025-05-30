import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';

import { AVATARS } from '@/features/onboarding/constants';

interface AvatarProps {
  onPress?: () => void;
  size?: number;
  avatarId: string;
}

export function Avatar({ onPress, size = 40, avatarId }: AvatarProps) {
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
            width: size * 0.95,
            height: size * 0.95,
            borderRadius: (size * 0.95) / 2,
          }}
          resizeMode="cover"
        />
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  avatarPressed: {
    backgroundColor: '#575B75',
    shadowOpacity: 0.3,
  },
  icon: {
    color: '#ffffff',
  },
});
