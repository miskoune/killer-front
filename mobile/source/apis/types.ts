/**
 * Method is a type that represents the HTTP method.
 */
export type Method = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Room is a type that represents the room state.
 */
export type RoomStatus = 'PENDING' | 'IN_GAME' | 'ENDED';

/**
 * ErrorCode is a type that represents the error code.
 */
export type ErrorCode =
  | 'SERVER_ERROR'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INVALID_TOKEN'
  | 'EXPIRED_TOKEN'
  | 'TOKEN_NOT_FOUND'
  | 'ALREADY_EXIST'
  | 'MISSION_TOO_SHORT_CONTENT';

/**
 * PlayerStatus is a type that represents the player status.
 *
 */
export type PlayerStatus = 'ALIVE' | 'KILLED' | 'SPECTATING';
