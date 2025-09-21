import { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  type ViewStyle,
} from 'react-native';

import { COLORS } from '@/constants/theme';

interface Props {
  onPress: () => void | Promise<void>;
  color: 'primary' | 'secondary';
  text: string;
  disabled?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

export function Button({
  onPress,
  color,
  text,
  disabled,
  customStyle,
  isLoading = false,
}: Props) {
  const focusAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange:
      color === 'primary'
        ? [COLORS.buttonPrimaryColor, COLORS.buttonPrimaryPressedColor]
        : [COLORS.buttonSecondaryColor, COLORS.buttonSecondaryPressedColor],
  });

  return (
    <Animated.View
      style={[
        styles.content,
        (disabled || isLoading) && styles.disabled,
        { backgroundColor },
        customStyle,
      ]}
    >
      <Pressable
        style={styles.button}
        onPress={onPress}
        disabled={disabled || isLoading}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Increase touch area
        pressRetentionOffset={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {isLoading ? (
          <Animated.View>
            <ActivityIndicator color={styles.text.color} />
          </Animated.View>
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    borderRadius: 10,
    shadowColor: 'hsl(210, 7%, 40%)',
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.buttonPrimaryTextColor,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
