import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MISSION_ENDPOINT } from '@/shared/constants/endpoints';
import { request } from '@/shared/utils/request';

export function useDeleteMission() {
  const queryClient = useQueryClient();

  const mutationFn = (missionId: number) => {
    return request<void>({
      url: `${MISSION_ENDPOINT}/${missionId}`,
      method: 'DELETE',
    });
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['room'] });
    queryClient.invalidateQueries({ queryKey: ['session'] });
  };

  return useMutation({
    mutationFn,
    onSuccess,
  });
}
