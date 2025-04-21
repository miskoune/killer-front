import { type ErrorCode } from '@/constants/errors';

import { type RequestErrorParams } from './types';

export class RequestError extends Error {
  readonly errorCode: ErrorCode;

  constructor({ errorCode, message }: RequestErrorParams) {
    super(message);

    this.errorCode = errorCode;
  }
}
