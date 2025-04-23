import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

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

  const handlePress = async () => {
    if (isAsyncAction) {
      setLoading(true);
      return (onPress() as Promise<void>)?.finally(() => setLoading(false));
    }

    return onPress();
  };

  const handlePressIn = () => {
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
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
    padding: 15,
    borderRadius: 5,
    shadowColor: 'hsl(210, 7%, 40%)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'hsl(255, 100%, 100%)',
    fontSize: 16,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
