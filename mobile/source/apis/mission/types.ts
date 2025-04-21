import { type UseMutationResult } from '@tanstack/react-query';

export interface Mission {
  id: number;
  content: string;
}

export interface CreateMissionMutation {
  createMission: UseMutationResult<void, unknown, string, unknown>;
}

export interface DeleteMissionMutation {
  deleteMission: UseMutationResult<void, unknown, number, unknown>;
}
