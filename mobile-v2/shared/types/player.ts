export type PlayerStatus = 'ALIVE' | 'KILLED' | 'SPECTATING';

export interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
  avatar: {
    id: string;
    name: string;
  };
  hasAtLeastOneMission: boolean;
}

export type TargetPlayer = Pick<Player, 'id' | 'name' | 'avatar'>;
