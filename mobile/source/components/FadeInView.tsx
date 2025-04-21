import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface Props {
  style: Record<string, unknown>;
  children: JSX.Element | JSX.Element[];
}

export function FadeInView({ style, children }: Props): JSX.Element {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
}
