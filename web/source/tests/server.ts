import { setupServer } from 'msw/node';

import { createMission, deleteMission } from './mocks/services/mission';
import {
  createPlayer,
  getPlayerSession,
  updatePlayer,
} from './mocks/services/player';
import {
  createRoom,
  deleteRoom,
  getPlayersRoom,
  getRoomSession,
  startParty,
} from './mocks/services/room';
import { noRoomSession } from './mocks/sessions';

export const server = setupServer(
  /**
   * Mission handlers.
   */
  createMission(),
  deleteMission(':missionId'),

  /**
   * Player handlers.
   */
  createPlayer(),
  updatePlayer(':playerId'),
  getPlayerSession(noRoomSession),

  /**
   * Room handlers.
   */
  createRoom(),
  deleteRoom(':roomCode'),
  getPlayersRoom(':roomCode'),
  getRoomSession(':roomCode'),
  startParty(':roomCode'),
);
