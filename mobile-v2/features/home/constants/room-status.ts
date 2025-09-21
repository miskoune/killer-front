import { type RoomStatus } from '@/shared/types/room';

type RoomRoute = 'pending' | 'in-game' | 'ended';

export const MAP_ROOM_STATUS_TO_ROUTE = new Map<RoomStatus, RoomRoute>([
  ['PENDING', 'pending'],
  ['IN_GAME', 'in-game'],
  ['ENDED', 'ended'],
]);
