import * as React from 'react';
import { Animated, TextInput, StyleSheet, Pressable } from 'react-native';

import { COLORS } from '@/constants/theme';

interface Props {
  value: string;
  setValue: (value: string) => void;
  label: string;
  innerRef?: React.RefObject<TextInput>;
}

export function Input({ value, setValue, label, innerRef }: Props) {
  const focusAnim = React.useRef(new Animated.Value(0)).current;
  const [isFocused, setFocused] = React.useState(false);
  const textInputRef = React.useRef<TextInput>(null);

  const handleFocus = () => {
    setFocused(true);

    // Ensure the input is focused with a slight delay to make sure the animation has started
    setTimeout(() => {
      if (innerRef?.current) {
        innerRef.current.focus();
      } else if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, 50);
  };

  React.useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused, value]);

  return (
    <Pressable style={styles.content} onPress={handleFocus}>
      <Animated.View
        style={[
          styles.labelContainer,
          {
            transform: [
              {
                translateY: focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 5],
                }),
              },
            ],
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.label,
            {
              fontSize: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 12],
              }),
            },
            isFocused && { visibility: 'hidden' },
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
      <TextInput
        ref={textInputRef}
        style={[
          styles.input,
          (isFocused || value) && {
            borderColor: COLORS.inputBorderColor,
            borderWidth: 0.5,
          },
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={setValue}
        value={value}
        enterKeyHint="done"
        keyboardAppearance="light"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    position: 'relative',
  },
  labelContainer: {
    left: 20,
    zIndex: 1,
    position: 'absolute',
  },
  label: {
    fontSize: 18,
    color: COLORS.textSecondaryColor,
    fontWeight: '300',
    opacity: 0.5,
    backgroundColor: 'transparent',
  },
  input: {
    color: COLORS.textPrimaryColor,
    backgroundColor: COLORS.inputBackgroundColor,
    borderRadius: 10,
    fontSize: 18,
    padding: 16,
  },
});
