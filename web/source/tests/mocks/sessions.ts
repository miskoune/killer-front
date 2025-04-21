import { type Session } from '@/services/player/types';
import { RoomStatus } from '@/services/room/constants';

import { fakeMissionOne, fakeMissionThree, fakeMissionTwo } from './missions';
import { fakePlayerOne, fakePlayerThree, fakePlayerTwo } from './players';
import { roomCode } from './rooms';

export const noRoomSession: Session = {
  ...fakePlayerOne,
  room: null,
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
};

export const pendingRoomSession: Session = {
  ...fakePlayerOne,
  room: {
    id: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.PENDING,
    missions: [],
    winner: null,
    hasEnoughMissions: false,
    hasEnoughPlayers: true,
    isGameMastered: false,
  },
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
};

export const playingRoomSession: Session = {
  ...fakePlayerTwo,
  room: {
    id: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.IN_GAME,
    missions: [fakeMissionOne, fakeMissionTwo, fakeMissionThree],
    winner: null,
    hasEnoughMissions: true,
    hasEnoughPlayers: true,
    isGameMastered: false,
  },
  target: fakePlayerThree,
  killer: null,
  assignedMission: fakeMissionTwo,
  authoredMissions: [fakeMissionOne],
};

export const endedRoomSession: Session = {
  ...fakePlayerThree,
  room: {
    id: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.ENDED,
    missions: [],
    winner: null,
    hasEnoughMissions: true,
    hasEnoughPlayers: true,
    isGameMastered: false,
  },
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
};

export const adminSession: Session = {
  ...fakePlayerOne,
  room: {
    id: roomCode,
    name: "TRINITY's room",
    status: RoomStatus.PENDING,
    missions: [],
    winner: null,
    hasEnoughMissions: false,
    hasEnoughPlayers: false,
    isGameMastered: false,
  },
  target: null,
  killer: null,
  assignedMission: null,
  authoredMissions: [],
};
