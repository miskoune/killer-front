import { type PropsWithChildren, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface Props extends PropsWithChildren {
  style: Record<string, unknown>;
}

export function FadeInView({ style, children }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
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
