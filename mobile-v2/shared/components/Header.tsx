import { useRouter } from 'expo-router';
import { type SVGProps } from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { COLORS } from '@/shared/constants/theme';

import BackIcon from '../assets/icons/back.svg';

interface Props {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: React.ComponentType<SVGProps<SVGElement>>;
    onPress: () => void;
    loading?: boolean;
  };
}

export function Header({
  title,
  showBackButton = false,
  onBackPress,
  rightAction,
}: Props) {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <Pressable
          onPress={handleBackPress}
          style={({ pressed }) => [
            styles.icon,
            styles.arrowIconContainer,
            pressed && styles.arrowIconPressedContainer,
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <BackIcon height={20} width={20} fill={COLORS.arrowColor} />
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.title}>{title}</Text>
      {rightAction ? (
        <Pressable
          onPress={rightAction.onPress}
          style={({ pressed }) => [
            styles.icon,
            styles.rightActionContainer,
            pressed && styles.rightActionPressed,
          ]}
          disabled={rightAction.loading}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {rightAction.loading ? (
            <ActivityIndicator size="small" color={COLORS.textSecondaryColor} />
          ) : (
            <rightAction.icon
              height={20}
              width={20}
              color={COLORS.arrowColor}
            />
          )}
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBackgroundColor,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.textPrimaryColor,
    fontSize: 24,
    marginVertical: 20,
    fontWeight: '600',
  },
  icon: {
    borderRadius: 10,
  },
  arrowIconContainer: {
    backgroundColor: COLORS.arrowButtonColor,
    padding: 8,
  },
  arrowIconPressedContainer: {
    backgroundColor: COLORS.arrowButtonPressedColor,
  },
  rightActionContainer: {
    backgroundColor: COLORS.arrowButtonColor,
    padding: 8,
  },
  rightActionPressed: {
    backgroundColor: COLORS.arrowButtonPressedColor,
  },
  placeholder: {
    width: 36, // Same width as the arrow icon container
    height: 36,
  },
});
