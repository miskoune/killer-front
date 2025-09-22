import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/shared/components/Button';
import { COLORS } from '@/shared/constants/theme';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { useUpdatePlayer } from '@/shared/hooks/useUpdatePlayer';
import { type Session } from '@/shared/types/session';

interface ConfirmKillProps {
  session: Session;
}

export function ConfirmKill({ session }: ConfirmKillProps) {
  const insets = useSafeAreaInsets();
  const updatePlayer = useUpdatePlayer();
  const { handleError } = useErrorHandler();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleShowConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleKillPlayer = () => {
    updatePlayer.mutate(
      { id: session.id, status: 'KILLED' },
      { onError: handleError, onSuccess: () => setShowConfirmModal(false) },
    );
  };

  const handleCancelKill = () => {
    setShowConfirmModal(false);
  };

  return (
    <View style={[styles.bottomActions, { paddingBottom: insets.bottom + 20 }]}>
      <Button
        color="primary"
        onPress={handleShowConfirmModal}
        text="Confirmer ma mort 💀"
      />

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelKill}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Êtes-vous sûr ?</Text>
            <Text style={styles.modalMessage}>
              Voulez-vous vraiment confirmer votre mort ? Cette action est
              irréversible.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelKill}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleKillPlayer}
              >
                <Text style={styles.confirmButtonText}>Confirmer 💀</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomActions: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.primaryBackgroundColor,
    borderTopWidth: 1,
    borderTopColor: COLORS.inputBorderColor,
    gap: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.primaryBackgroundColor,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimaryColor,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: COLORS.textPrimaryColor,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.inputBorderColor,
  },
  confirmButton: {
    backgroundColor: '#DC2626',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimaryColor,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
