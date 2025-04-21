import { type Method } from '@/constants/enums';
import { type ErrorCode } from '@/constants/errors';

export interface RequestParams {
  url: string;
  method: Method;
  requestInit?: RequestInit;
}

export interface RequestErrorParams {
  errorCode: ErrorCode;
  message: string;
}
