import { useRouter } from 'expo-router';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import ArrowLeft from '../assets/icons/arrowLeft.svg';
import CloseIcon from '../assets/icons/close.svg';

interface Props {
  shouldHandlePreviousPage: boolean;
  title: string;
}

export function Header({
  shouldHandlePreviousPage,
  title,
}: Props): JSX.Element {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => {
          if (shouldHandlePreviousPage) router.back();
        }}
        style={({ pressed }) => [
          styles.icon,
          pressed && styles.iconPressed,
          !shouldHandlePreviousPage && styles.deactivateIcon,
        ]}
      >
        <ArrowLeft />
      </Pressable>

      <Text style={styles.title}>{title}</Text>
      <Pressable
        onPress={() => router.dismiss()}
        style={({ pressed }) => [styles.icon, pressed && styles.iconPressed]}
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
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  icon: {
    borderRadius: 10,
  },
  iconPressed: {
    backgroundColor: 'hsl(210deg 7% 80%)',
  },
  deactivateIcon: {
    opacity: 0,
  },
});
