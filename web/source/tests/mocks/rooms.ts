import { ROOM_TOPIC } from '@/constants/endpoints';
import { RoomStatus } from '@/services/room/constants';
import { type Room } from '@/services/room/types';

import { fakeMissionOne, fakeMissionThree, fakeMissionTwo } from './missions';
import { fakePlayerOne, fakePlayerThree, fakePlayerTwo } from './players';

export const roomCode = 'SOSPC';

export const roomEventSource = `${ROOM_TOPIC}/${roomCode}`;

export const pendingRoom: Room = {
  id: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [fakePlayerOne],
  missions: [],
  admin: fakePlayerOne,
  winner: null,
  hasEnoughMissions: false,
  hasEnoughPlayers: false,
  isGameMastered: false,
};

export const pendingRoomWithMissions: Room = {
  id: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [fakePlayerOne],
  missions: [fakeMissionOne, fakeMissionTwo, fakeMissionThree],
  admin: fakePlayerOne,
  winner: null,
  hasEnoughMissions: true,
  hasEnoughPlayers: false,
  isGameMastered: false,
};

export const pendingRoomWithMultiplePlayers: Room = {
  id: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [fakePlayerOne, fakePlayerTwo, fakePlayerThree],
  missions: [],
  admin: fakePlayerOne,
  winner: null,
  hasEnoughMissions: false,
  hasEnoughPlayers: true,
  isGameMastered: false,
};

export const playingRoom: Room = {
  id: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.IN_GAME,
  players: [fakePlayerOne],
  missions: [fakeMissionOne, fakeMissionTwo, fakeMissionThree],
  admin: fakePlayerOne,
  winner: null,
  hasEnoughMissions: true,
  hasEnoughPlayers: false,
  isGameMastered: false,
};

export const endedRoom: Room = {
  id: roomCode,
  name: "TRINITY's room",
  status: RoomStatus.ENDED,
  players: [fakePlayerOne],
  missions: [],
  admin: fakePlayerOne,
  winner: fakePlayerOne,
  hasEnoughMissions: false,
  hasEnoughPlayers: false,
  isGameMastered: false,
};
