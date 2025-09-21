import { type Mission } from './mission';
import { type TargetPlayer, type PlayerStatus } from './player';
import { type Room } from './room';

export interface Session {
  avatar: string;
  id: number;
  name: string;
  room: Room | null;
  status: PlayerStatus;
  token: string;
  authoredMissions?: Mission[];
  target?: TargetPlayer;
  assignedMission?: Mission;
}
