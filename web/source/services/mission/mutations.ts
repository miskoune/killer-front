import { useMutation } from '@tanstack/react-query';

import { createMissionRequest, deleteMissionRequest } from './requests';
import {
  type CreateMissionMutation,
  type DeleteMissionMutation,
} from './types';

export function useCreateMission(): CreateMissionMutation {
  const createMission = useMutation({
    mutationFn: createMissionRequest,
  });

  return { createMission };
}

export function useDeleteMission(): DeleteMissionMutation {
  const deleteMission = useMutation({
    mutationFn: deleteMissionRequest,
  });

  return { deleteMission };
}
