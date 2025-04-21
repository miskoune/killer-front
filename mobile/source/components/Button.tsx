import { useRef, useState } from 'react';
import { ActivityIndicator, Animated, Pressable, Text } from 'react-native';

import styles from './styles/Button.module.css';

interface Props {
  onPress: () => void | Promise<void>;
  color: 'primary' | 'secondary';
  text: string;
  disabled?: boolean;
  isAsyncAction?: boolean;
}

export function Button({
  onPress,
  color,
  text,
  disabled,
  isAsyncAction,
}: Props): JSX.Element {
  const [isLoading, setLoading] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const handlePress = async (): Promise<void> => {
    if (isAsyncAction) {
      setLoading(true);
      return (onPress() as Promise<void>)?.finally(() => setLoading(false));
    }

    return onPress();
  };

  const handlePressIn = (): void => {
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = (): void => {
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange:
      color === 'primary' ? ['#474D52', '#2F3337'] : ['#6C7294', '#575B75'],
  });

  return (
    <Animated.View
      style={[
        styles.content,
        (disabled || isLoading) && styles.disabled,
        { backgroundColor },
      ]}
    >
      <Pressable
        style={styles.button}
        onPress={handlePress}
        disabled={disabled || isLoading}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {isLoading ? (
          <Animated.View>
            <ActivityIndicator />
          </Animated.View>
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
