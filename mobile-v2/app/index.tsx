import { FadeInView } from '@/components/FadeInView';
import { Button } from '@/components/Button';
import { useTranslation } from '@/translations';
import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import InfosIcon from '@/assets/icons/infos.svg';
import KillerParty from '@/assets/images/killerparty.svg';

export default function Index(): JSX.Element {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FadeInView style={styles.fadeInView}>
        <View>
          <Pressable onPress={() => {}}>
            <InfosIcon height={14} width={14} />
            <Text>Régles du jeu</Text>
          </Pressable>
        </View>
        <View>
          <View>
            <KillerParty height={200} width={200} />
          </View>
          <View>
            <Text>KILLER PARTY</Text>
          </View>
          <Text>Ça vous tente un petit meurtre.. entre amis ?</Text>
        </View>
        <View>
          <Button
            color="primary"
            onPress={() => {}}
            text={t('home.create.room.button')}
          />
          <Button
            color="secondary"
            onPress={() => {}}
            text={t('home.join.room')}
          />
        </View>
      </FadeInView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fadeInView: { flex: 1 },
});
