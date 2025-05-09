import * as React from 'react';
import { Animated, TextInput, View } from 'react-native';

import styles from './styles/Input.module.css';

interface Props {
  value: string;
  setValue: (value: string) => void;
  label: string;
  innerRef?: React.RefObject<TextInput | null>;
}

export function Input({
  value,
  setValue,
  label,
  innerRef,
}: Props): JSX.Element {
  const focusAnim = React.useRef(new Animated.Value(0)).current;
  const [isFocused, setFocused] = React.useState(false);

  React.useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused, value]);

  return (
    <View style={styles.content}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        }}
      >
        <Animated.Text
          style={{
            ...styles.label,
            fontSize: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 14],
            }),
            color: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['#8A8EA8', '#C5C7D5'],
            }),
          }}
        >
          {label}
        </Animated.Text>
      </Animated.View>
      <TextInput
        ref={innerRef}
        style={{
          ...styles.input,
          borderBottomColor: isFocused || value ? '#8A8EA8' : '#C5C7D5',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={setValue}
        value={value}
        clearButtonMode="always"
        enterKeyHint="done"
        keyboardAppearance="dark"
        autoCorrect={false}
        spellCheck={false}
      />
    </View>
  );
}
