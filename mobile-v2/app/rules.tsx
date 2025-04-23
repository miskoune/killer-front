import { useRouter } from 'expo-router';
import { Pressable, Text, View, StyleSheet } from 'react-native';

import CloseIcon from '@/assets/icons/close.svg';
import { useTranslation } from '@/translations';

export default function Rules() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.howToPlay}>Comment jouer à Killer Party</Text>
        <Pressable
          onPress={() => router.back()}
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
            <Text style={styles.subtitle}>{t('home.first.rule.title')}</Text>
            <Text style={styles.text}>{t('home.first.rule.text')}</Text>
          </View>
        </View>
        <View style={styles.step}>
          <View>
            <Text style={styles.subtitle}>{t('home.second.rule.title')}</Text>
            <Text style={styles.text}>{t('home.second.rule.text')}</Text>
          </View>
        </View>
        <View style={styles.step}>
          <View>
            <Text style={styles.subtitle}>{t('home.third.rule.title')}</Text>
            <Text style={styles.text}>{t('home.third.rule.text')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    margin: 10,
    marginLeft: 20,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    margin: 0,
    marginHorizontal: 20,
  },
  closeIcon: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  closeIconPressed: {
    backgroundColor: 'hsl(210, 7%, 80%)',
  },
  howToPlay: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  step: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
    color: 'hsl(210, 7%, 40%)',
  },
});
