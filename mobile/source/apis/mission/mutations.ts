import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMissionRequest, deleteMissionRequest } from './requests';
import {
  type CreateMissionMutation,
  type DeleteMissionMutation,
} from './types';

export function useCreateMission(): CreateMissionMutation {
  const queryClient = useQueryClient();

  const createMission = useMutation({
    mutationFn: createMissionRequest,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['session'] }),
        queryClient.invalidateQueries({ queryKey: ['room'] }),
      ]),
  });

  return { createMission };
}

export function useDeleteMission(): DeleteMissionMutation {
  const queryClient = useQueryClient();

  const deleteMission = useMutation({
    mutationFn: deleteMissionRequest,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['session'] }),
        queryClient.invalidateQueries({ queryKey: ['room'] }),
      ]),
  });

  return { deleteMission };
}
