import { useRouter } from 'expo-router';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import ArrowLeft from '../assets/icons/arrowLeft.svg';
import CloseIcon from '../assets/icons/close.svg';

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
          styles.iconBackground,
          pressed && styles.iconPressed,
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <ArrowLeft />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable
        onPress={() => router.dismiss()}
        style={({ pressed }) => [
          styles.icon,
          styles.crossOut,
          pressed && styles.iconPressed,
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
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  icon: {
    borderRadius: 10,
  },
  crossOut: {
    opacity: 0,
  },
  iconBackground: {
    backgroundColor: '#E8E4FE',
    opacity: 0.6,
    padding: 10,
  },
  iconPressed: {
    backgroundColor: '#DCD9E2',
    opacity: 1,
  },
  deactivateIcon: {
    opacity: 0,
  },
});
