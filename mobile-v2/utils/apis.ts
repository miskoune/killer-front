import AsyncStorage from '@react-native-async-storage/async-storage';

import { t, type TranslationKey } from '@/translations';

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
  });

  const result = await response.json();

  if (
    response.status === 401 &&
    ['INVALID_TOKEN', 'EXPIRED_TOKEN', 'TOKEN_NOT_FOUND'].includes(
      result.message,
    )
  ) {
    await AsyncStorage.removeItem('token');

    const errorMessage = t(`errors.${result.message}` as TranslationKey);

    throw new RequestError({
      message: errorMessage,
      errorCode: result.message,
    });
  }

  if (response.status >= 400) {
    const errorMessage = t(`errors.${result?.detail}` as TranslationKey);

    throw new RequestError({
      message: errorMessage,
      errorCode: result?.detail,
    });
  }

  return result;
}
