import { toast } from 'sonner';

import { ErrorCode } from '@/constants/errors';
import { type TranslationKey, t } from '@/translations';

import { RequestError } from './errors';
import { type RequestParams } from './types';

const {
  SERVER_ERROR,
  FORBIDDEN,
  NOT_FOUND,
  INVALID_TOKEN,
  EXPIRED_TOKEN,
  TOKEN_NOT_FOUND,
} = ErrorCode;

export async function request<T>({
  url,
  method,
  requestInit,
}: RequestParams): Promise<T> {
  const token = localStorage.getItem('token');

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
    toast.error(t(`errors.${SERVER_ERROR}`));

    throw new Error(error.message);
  });

  // No content
  if (response.status === 204) {
    return Promise.resolve() as Promise<T>;
  }

  // Forbidden
  if (response.status === 403) {
    const errorMessage = t(`errors.${FORBIDDEN}`);

    toast.error(errorMessage);

    throw new RequestError({
      message: errorMessage,
      errorCode: FORBIDDEN,
    });
  }

  // Not found
  if (response.status === 404) {
    const errorMessage = t(`errors.${NOT_FOUND}`);

    toast.error(errorMessage);

    throw new RequestError({
      message: errorMessage,
      errorCode: NOT_FOUND,
    });
  }

  const result = await response.json();

  if (
    response.status === 401 &&
    [INVALID_TOKEN, EXPIRED_TOKEN, TOKEN_NOT_FOUND].includes(result.message)
  ) {
    localStorage.removeItem('token');

    const errorMessage = t(`errors.${result.message}` as TranslationKey);

    toast.error(errorMessage);

    throw new RequestError({
      message: errorMessage,
      errorCode: result.message,
    });
  }

  if (response.status >= 400) {
    const errorMessage = t(`errors.${result?.detail}` as TranslationKey);

    toast.error(errorMessage);

    throw new RequestError({
      message: errorMessage,
      errorCode: result?.detail,
    });
  }

  if (result?.token) {
    localStorage.setItem('token', result.token);
  }

  return result;
}
