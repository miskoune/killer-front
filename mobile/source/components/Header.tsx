import { useNavigation } from '@react-navigation/native';
import { Pressable, View, Text } from 'react-native';

import ArrowLeft from '../assets/icons/arrowLeft.svg';
import CloseIcon from '../assets/icons/close.svg';
import { type StackNavigation } from '../types/navigation';

import styles from './styles/Header.module.css';

interface Props {
  shouldHandlePreviousPage: boolean;
  title: string;
}

export function Header({
  shouldHandlePreviousPage,
  title,
}: Props): JSX.Element {
  const { goBack, popToTop } = useNavigation<StackNavigation>();

  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => {
          if (shouldHandlePreviousPage) goBack();
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
        onPress={() => popToTop()}
        style={({ pressed }) => [styles.icon, pressed && styles.iconPressed]}
      >
        <CloseIcon />
      </Pressable>
    </View>
  );
}
