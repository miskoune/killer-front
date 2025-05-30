import { Alert } from 'react-native';

export function useErrorHandler() {
  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      return Alert.alert('Erreur', error.message);
    }

    return Alert.alert('Erreur', 'Une erreur est survenue');
  };

  return { handleError };
}
