import { type ErrorCode } from '@/types/errors';

interface RequestErrorParams {
  errorCode: ErrorCode;
  message: string;
}

export class RequestError extends Error {
  readonly errorCode: ErrorCode;

  constructor({ errorCode, message }: RequestErrorParams) {
    super(message);

    this.errorCode = errorCode;
  }
}
