import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { type TranslationKey, t } from '@/translations';

import { RequestError } from './errors';

export async function request<T>({
  url,
  method,
  requestInit,
}: {
  url: string;
  method: string;
  requestInit?: RequestInit;
}): Promise<T> {
  const token = await AsyncStorage.getItem('token');

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: 'include',
    method,
    ...requestInit,
  }).catch((error) => {
    Toast.show({
      type: 'error',
      text2: t('errors.SERVER_ERROR'),
    });

    throw new Error(error.message);
  });

  // No content
  if (response.status === 204) {
    return Promise.resolve() as Promise<T>;
  }

  // Forbidden
  if (response.status === 403) {
    const errorMessage = t('errors.FORBIDDEN');

    Toast.show({
      type: 'error',
      text2: errorMessage,
    });

    throw new RequestError({
      message: errorMessage,
      errorCode: 'FORBIDDEN',
    });
  }

  // Not found
  if (response.status === 404) {
    const errorMessage = t('errors.NOT_FOUND');

    Toast.show({
      type: 'error',
      text2: errorMessage,
    });

    throw new RequestError({
      message: errorMessage,
      errorCode: 'NOT_FOUND',
    });
  }

  const result = await response.json();

  if (
    response.status === 401 &&
    ['INVALID_TOKEN', 'EXPIRED_TOKEN', 'TOKEN_NOT_FOUND'].includes(
      result.message,
    )
  ) {
    await AsyncStorage.removeItem('token');

    const errorMessage = t(`errors.${result.message}` as TranslationKey);

    Toast.show({
      type: 'error',
      text2: errorMessage,
    });

    throw new RequestError({
      message: errorMessage,
      errorCode: result.message,
    });
  }

  if (response.status >= 400) {
    const errorMessage = t(`errors.${result?.detail}` as TranslationKey);

    Toast.show({
      type: 'error',
      text2: errorMessage,
    });

    throw new RequestError({
      message: errorMessage,
      errorCode: result?.detail,
    });
  }

  if (result?.token) {
    await AsyncStorage.setItem('token', result.token);
  }

  return result;
}
