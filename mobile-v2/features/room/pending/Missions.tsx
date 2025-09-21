import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Button } from '@/shared/components/Button';
import { FadeInView } from '@/shared/components/FadeInView';
import { Header } from '@/shared/components/Header';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useGetSession } from '@/shared/hooks/useGetSession';
import { useTranslation } from '@/translations';

import { useGetRoom } from '../hooks/useGetRoom';

import { useCreateMission } from './hooks/useCreateMission';
import { useDeleteMission } from './hooks/useDeleteMission';

export function Missions() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const [newMissionContent, setNewMissionContent] = useState('');
  const [deletingMissionId, setDeletingMissionId] = useState<number | null>(
    null,
  );
  const textInputRef = useRef<TextInput>(null);
  const { data: room, isLoading, error } = useGetRoom(roomId);
  const { data: session } = useGetSession();
  const { handleError } = useErrorHandler();
  const createMission = useCreateMission();
  const deleteMission = useDeleteMission();

  useEffect(function autoFocus() {
    textInputRef.current?.focus();
  }, []);

  const handleCreateMission = () => {
    if (!newMissionContent.trim()) {
      return Alert.alert('Erreur', 'Veuillez saisir le contenu de la mission');
    }

    createMission.mutate(
      { content: newMissionContent.trim() },
      {
        onError: handleError,
        onSuccess: () => setNewMissionContent(''),
      },
    );
  };

  const handleDeleteMission = (missionId: number) => {
    setDeletingMissionId(missionId);

    deleteMission.mutate(missionId, {
      onError: handleError,
      onSettled: () => setDeletingMissionId(null),
    });
  };

  // Handle error state
  if (error) {
    return (
      <View style={styles.container}>
        <Header
          title="Erreur"
          showBackButton
          onBackPress={() => router.back()}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Impossible de charger les missions. Veuillez réessayer.
          </Text>
        </View>
      </View>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header
          title="Chargement..."
          showBackButton
          onBackPress={() => router.back()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.buttonPrimaryColor} />
          <Text style={styles.loadingText}>Chargement des missions...</Text>
        </View>
      </View>
    );
  }

  // Handle no room data
  if (!room) {
    return (
      <View style={styles.container}>
        <Header
          title="Partie introuvable"
          showBackButton
          onBackPress={() => router.back()}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Cette partie n&apos;existe pas.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={t('room.manage.missions')}
        showBackButton
        onBackPress={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <FadeInView style={styles.content}>
          {/* Create New Mission Section */}
          <View style={styles.createMissionSection}>
            <Text style={styles.sectionTitle}>
              {t('room.create.new.mission.label')}
            </Text>
            <Text style={styles.sectionDescription}>
              {t('room.missions.description')}
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                ref={textInputRef}
                style={styles.textInput}
                value={newMissionContent}
                onChangeText={setNewMissionContent}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                maxLength={500}
              />
              <Text style={styles.characterCount}>
                {newMissionContent.length}/500
              </Text>
            </View>

            <Button
              color="primary"
              onPress={handleCreateMission}
              text={t('room.create.new.mission.button')}
              disabled={!newMissionContent.trim() || createMission.isPending}
              isLoading={createMission.isPending}
            />
          </View>

          {/* Missions List Section */}
          <View style={styles.missionsListSection}>
            <Text style={styles.sectionTitle}>
              {session?.authoredMissions?.length === 1
                ? t('room.missions.count_one', {
                    count: session?.authoredMissions?.length,
                  })
                : t('room.missions.count_other', {
                    count: session?.authoredMissions?.length,
                  })}
            </Text>

            {session?.authoredMissions?.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>
                  {t('room.missions.empty')}
                </Text>
              </View>
            ) : (
              <View style={styles.missionsContainer}>
                {session?.authoredMissions?.map((mission) => (
                  <View key={mission.id} style={styles.missionCard}>
                    <View style={styles.missionContent}>
                      <Text style={styles.missionText}>{mission.content}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteMission(mission.id)}
                      disabled={deletingMissionId === mission.id}
                    >
                      {deletingMissionId === mission.id ? (
                        <ActivityIndicator
                          size="small"
                          color={COLORS.textSecondaryColor}
                        />
                      ) : (
                        <Text style={styles.deleteButtonText}>✕</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </FadeInView>
      </ScrollView>
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
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingText: {
    color: COLORS.textSecondaryColor,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: COLORS.textPrimaryColor,
    fontSize: 16,
    textAlign: 'center',
  },

  // Create Mission Section
  createMissionSection: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
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
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: COLORS.primaryBackgroundColor,
    borderWidth: 1,
    borderColor: COLORS.inputBorderColor,
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: COLORS.textPrimaryColor,
    minHeight: 80,
  },
  characterCount: {
    fontSize: 12,
    color: COLORS.textSecondaryColor,
    textAlign: 'right',
    marginTop: 5,
  },

  // Missions List Section
  missionsListSection: {
    marginBottom: 20,
  },
  emptyStateContainer: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textSecondaryColor,
    textAlign: 'center',
  },
  missionsContainer: {
    gap: 12,
  },
  missionCard: {
    backgroundColor: COLORS.secondaryBackgroundColor,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  missionContent: {
    flex: 1,
    marginRight: 10,
  },
  missionText: {
    fontSize: 16,
    color: COLORS.textPrimaryColor,
    lineHeight: 22,
  },
  deleteButton: {
    backgroundColor: COLORS.primaryBackgroundColor,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.inputBorderColor,
  },
  deleteButtonText: {
    fontSize: 18,
    color: COLORS.textSecondaryColor,
    fontWeight: '600',
  },
});
