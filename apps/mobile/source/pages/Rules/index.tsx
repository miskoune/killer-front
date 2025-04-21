import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';

import CloseIcon from '../../assets/icons/close.svg';
import { useTranslation } from '../../translations';
import { type RootStackParamList } from '../../types/navigation';

import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'Rules'>;

export function Rules({ navigation }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.howToPlay}>Comment jouer à Killer Party</Text>
        <Pressable
          onPress={() => navigation.popToTop()}
          style={({ pressed }) => [
            styles.closeIcon,
            pressed && styles.closeIconPressed,
          ]}
        >
          <CloseIcon />
        </Pressable>
      </View>
      <View style={styles.content}>
        <View style={styles.step}>
          <View>
            <Text style={styles.title}>{t('home.first.rule.title')}</Text>
            <Text style={styles.text}>{t('home.first.rule.text')}</Text>
          </View>
        </View>
        <View style={styles.step}>
          <View>
            <Text style={styles.title}>{t('home.second.rule.title')}</Text>
            <Text style={styles.text}>{t('home.second.rule.text')}</Text>
          </View>
        </View>
        <View style={styles.step}>
          <View>
            <Text style={styles.title}>{t('home.third.rule.title')}</Text>
            <Text style={styles.text}>{t('home.third.rule.text')}</Text>
          </View>
        </View>
      </View>
    </>
  );
}
