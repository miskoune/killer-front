import { useRouter } from 'expo-router';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import ArrowLeft from '@/assets/icons/arrowLeft.svg';
import CloseIcon from '@/assets/icons/close.svg';
import { COLORS } from '@/constants/theme';

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.icon,
          styles.arrowIconContainer,
          pressed && styles.arrowIconPressedContainer,
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <ArrowLeft height={26} width={26} fill={COLORS.arrowColor} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable
        onPress={() => router.dismiss()}
        style={({ pressed }) => [
          styles.icon,
          styles.crossOut,
          pressed && styles.crossOutPressed,
        ]}
      >
        <CloseIcon />
      </Pressable>
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
  crossOut: {
    opacity: 0,
  },
  arrowIconContainer: {
    backgroundColor: COLORS.arrowButtonColor,
    padding: 8,
  },
  arrowIconPressedContainer: {
    backgroundColor: COLORS.arrowButtonPressedColor,
  },
  crossOutPressed: {
    opacity: 0,
  },
});
