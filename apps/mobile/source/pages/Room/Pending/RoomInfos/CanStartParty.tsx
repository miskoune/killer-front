import { useRoom } from '@killerparty/webservices';
import React from 'react';
import { View, Text } from 'react-native';

import Checked from '../../../../assets/icons/checked.svg';
import Unchecked from '../../../../assets/icons/unchecked.svg';
import { useTranslation } from '../../../../translations';

import styles from './styles/CanStartParty.module.css';

interface Props {
  roomCode: string;
}

export function CanStartParty({ roomCode }: Props): JSX.Element {
  const { room } = useRoom(roomCode);
  const { t } = useTranslation();

  const allPlayersHasProposedMission = room?.players.every(
    ({ hasAtLeastOneMission }) => hasAtLeastOneMission,
  );

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{t('room.start.party.conditions')}</Text>
      <View
        style={[styles.condition, room?.hasEnoughPlayers && styles.checked]}
      >
        {room?.hasEnoughPlayers ? (
          <Checked style={styles.icon} />
        ) : (
          <Unchecked style={styles.icon} />
        )}
        <Text
          style={[
            room?.hasEnoughPlayers
              ? styles.conditionChecked
              : styles.conditionUnchecked,
          ]}
        >
          {room?.isGameMastered
            ? t('room.start.party.three.players.with.game.master.condition')
            : t('room.start.party.three.players.condition')}
        </Text>
      </View>
      <View
        style={[styles.condition, room?.hasEnoughMissions && styles.checked]}
      >
        {room?.hasEnoughMissions ? (
          <Checked style={styles.icon} />
        ) : (
          <Unchecked style={styles.icon} />
        )}
        <Text
          style={[
            room?.hasEnoughMissions
              ? styles.conditionChecked
              : styles.conditionUnchecked,
          ]}
        >
          {t('room.start.party.same.missions.as.players.condition')}
        </Text>
      </View>
      {!room?.isGameMastered && (
        <View
          style={[
            styles.condition,
            allPlayersHasProposedMission && styles.checked,
          ]}
        >
          {allPlayersHasProposedMission ? (
            <Checked style={styles.icon} />
          ) : (
            <Unchecked style={styles.icon} />
          )}
          <Text
            style={[
              allPlayersHasProposedMission
                ? styles.conditionChecked
                : styles.conditionUnchecked,
            ]}
          >
            {t('room.start.party.each.player.has.mission.condition')}
          </Text>
        </View>
      )}
    </View>
  );
}
