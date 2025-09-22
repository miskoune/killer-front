import { StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/shared/components/Avatar';
import { COLORS } from '@/shared/constants/theme';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { type Player } from '@/shared/types/player';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';

interface PlayersProps {
  roomId: string;
}

export function Players({ roomId }: PlayersProps) {
  const { t } = useTranslation();
  const room = useGetRoom(roomId);
  const session = useGetSession();

  const hasPlayersAtLeastOneMission = (hasAtLeastOneMission: boolean) => {
    if (hasAtLeastOneMission) {
      return t('room.missions.authored.count_one');
    }

    return t('room.missions.authored.count_zero');
  };

  return (
    <View style={styles.playersSection}>
      <Text style={styles.sectionTitle}>{t('room.players.list')}</Text>
      <Text style={styles.sectionDescription}>
        {t('room.players.list.description')}
      </Text>

      <View style={styles.playersContainer}>
        {room.data?.players.map((player: Player) => (
          <View key={player.id} style={styles.playerCard}>
            <Avatar avatarId={player.avatar} size={100} />
            <View style={styles.playerInfo}>
              <View style={styles.playerNameContainer}>
                <Text style={styles.playerName}>{player.name}</Text>
                {player.id === room.data?.admin.id && (
                  <Text style={styles.adminBadge}>Admin</Text>
                )}
                {player.id === session.data?.id && (
                  <Text style={styles.youBadge}>Vous</Text>
                )}
              </View>
              <Text style={styles.playerStatus}>
                {hasPlayersAtLeastOneMission(player.hasAtLeastOneMission)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playersSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    marginBottom: 15,
  },
  playersContainer: {
    gap: 12,
  },
  playerCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  playerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
  },
  adminBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.buttonPrimaryColor,
    backgroundColor: COLORS.primaryBackgroundColor,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  youBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    backgroundColor: COLORS.buttonSecondaryColor,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  playerStatus: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
  },
});
