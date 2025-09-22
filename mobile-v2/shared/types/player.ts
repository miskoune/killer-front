export type PlayerStatus = 'ALIVE' | 'KILLED' | 'SPECTATING';

export interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
  avatar: string;
  hasAtLeastOneMission: boolean;
}

export type TargetPlayer = Pick<Player, 'id' | 'name' | 'avatar'>;
