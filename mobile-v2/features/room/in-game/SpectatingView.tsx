import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';

import { Avatar } from '@/shared/components/Avatar';
import { FadeInView } from '@/shared/components/FadeInView';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { type Player } from '@/shared/types/player';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';

import SettingsIcon from './icons/settings.svg';

export function SpectatingView() {
  const { t } = useTranslation();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const session = useGetSession();
  const room = useGetRoom(roomId);

  const handleRefresh = () => {
    session.refetch();
    room.refetch();
  };

  const getPlayersAlive = () => {
    return (
      room.data?.players.filter((player) => player.status === 'ALIVE') || []
    );
  };

  const getPlayersKilled = () => {
    return (
      room.data?.players.filter((player) => player.status === 'KILLED') || []
    );
  };

  const getPlayerStatusColor = (status: string) => {
    switch (status) {
      case 'ALIVE':
        return '#4CAF50'; // Vert pour vivant
      case 'KILLED':
        return '#FF6B6B'; // Rouge pour mort
      case 'SPECTATING':
        return COLORS.textSecondaryColor; // Gris pour spectateur
      default:
        return COLORS.textSecondaryColor;
    }
  };

  const getPlayerStatusEmoji = (status: string) => {
    switch (status) {
      case 'ALIVE':
        return '💚';
      case 'KILLED':
        return '💀';
      case 'SPECTATING':
        return '👁️';
      default:
        return '❓';
    }
  };

  const getPlayerStatusText = (status: string) => {
    switch (status) {
      case 'ALIVE':
        return 'Vivant';
      case 'KILLED':
        return 'Éliminé';
      case 'SPECTATING':
        return 'Spectateur';
      default:
        return 'Inconnu';
    }
  };

  const alivePlayers = getPlayersAlive();
  const killedPlayers = getPlayersKilled();

  return (
    <View style={styles.container}>
      <FadeInView style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={session.isFetching || room.isFetching}
              onRefresh={handleRefresh}
            />
          }
        >
          <Header
            title="Mode Spectateur"
            rightAction={{
              icon: SettingsIcon,
              onPress: () => router.push(`/room/${roomId}/in-game/settings`),
            }}
          />

          {/* Game Master Info */}
          <View style={styles.gameMasterCard}>
            <Image
              source={require('./images/admin.png')}
              style={styles.image}
            />
            <Text style={styles.gameMasterTitle}>
              {t('room.game.master.title')}
            </Text>
            <Text style={styles.gameMasterDescription}>
              En tant que maître de jeu, vous pouvez observer le déroulement de
              la partie en temps réel. Les joueurs ne savent pas que vous les
              observez.
            </Text>
          </View>

          {/* End Game Condition */}
          <View style={styles.endGameCard}>
            <Text style={styles.endGameTitle}>🏆 Condition de victoire</Text>
            <Text style={styles.endGameDescription}>
              La partie se termine quand il ne reste qu'un seul joueur vivant,
              qui sera déclaré vainqueur.
            </Text>
          </View>

          {/* Game Stats */}
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>📊 Statistiques de la partie</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{alivePlayers.length}</Text>
                <Text style={styles.statLabel}>Joueurs vivants</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{killedPlayers.length}</Text>
                <Text style={styles.statLabel}>Joueurs morts</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {room.data?.missions.length || 0}
                </Text>
                <Text style={styles.statLabel}>Missions total</Text>
              </View>
            </View>
          </View>

          {/* Alive Players */}
          {alivePlayers.length > 0 && (
            <View style={styles.playersSection}>
              <Text style={styles.sectionTitle}>
                💚 Joueurs encore en vie ({alivePlayers.length})
              </Text>
              <Text style={styles.sectionDescription}>
                Ces joueurs sont encore dans la partie et tentent de survivre
              </Text>
              <View style={styles.playersContainer}>
                {alivePlayers.map((player: Player) => (
                  <View key={player.id} style={styles.playerCard}>
                    <Avatar avatarId={player.avatar} size={70} />
                    <View style={styles.playerInfo}>
                      <View style={styles.playerNameContainer}>
                        <Text style={styles.playerName}>{player.name}</Text>
                        {player.id === room.data?.admin.id && (
                          <Text style={styles.adminBadge}>Admin</Text>
                        )}
                      </View>
                      <View style={styles.playerStatusContainer}>
                        <Text style={styles.playerStatusEmoji}>
                          {getPlayerStatusEmoji(player.status)}
                        </Text>
                        <Text
                          style={[
                            styles.playerStatus,
                            { color: getPlayerStatusColor(player.status) },
                          ]}
                        >
                          {getPlayerStatusText(player.status)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Killed Players */}
          {killedPlayers.length > 0 && (
            <View style={styles.playersSection}>
              <Text style={styles.sectionTitle}>
                💀 Joueurs éliminés ({killedPlayers.length})
              </Text>
              <Text style={styles.sectionDescription}>
                Ces joueurs ont été éliminés et ne peuvent plus jouer
              </Text>
              <View style={styles.playersContainer}>
                {killedPlayers.map((player: Player) => (
                  <View
                    key={player.id}
                    style={[styles.playerCard, styles.killedPlayerCard]}
                  >
                    <Avatar
                      avatarId={player.avatar}
                      size={70}
                      style={styles.killedAvatar}
                    />
                    <View style={styles.playerInfo}>
                      <View style={styles.playerNameContainer}>
                        <Text
                          style={[styles.playerName, styles.killedPlayerName]}
                        >
                          {player.name}
                        </Text>
                        {player.id === room.data?.admin.id && (
                          <Text style={styles.adminBadge}>Admin</Text>
                        )}
                      </View>
                      <View style={styles.playerStatusContainer}>
                        <Text style={styles.playerStatusEmoji}>
                          {getPlayerStatusEmoji(player.status)}
                        </Text>
                        <Text
                          style={[
                            styles.playerStatus,
                            { color: getPlayerStatusColor(player.status) },
                          ]}
                        >
                          {getPlayerStatusText(player.status)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </FadeInView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  gameMasterCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    margin: 20,
  },
  gameMasterTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
    marginBottom: 8,
    textAlign: 'center',
  },
  gameMasterDescription: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    lineHeight: 20,
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
    marginBottom: 15,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.buttonPrimaryColor,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondaryColor,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.inputBorderColor,
    marginHorizontal: 10,
  },
  playersSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
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
  killedPlayerCard: {
    opacity: 0.7,
    backgroundColor: '#2A2A2A',
  },
  killedAvatar: {
    opacity: 0.6,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  playerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
  },
  killedPlayerName: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondaryColor,
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
  playerStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  playerStatusEmoji: {
    fontSize: 14,
  },
  playerStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  endGameCard: {
    backgroundColor: '#1E3A2E',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  endGameTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
  },
  endGameDescription: {
    fontSize: 14,
    color: COLORS.textSecondaryColor,
    lineHeight: 20,
  },
});
