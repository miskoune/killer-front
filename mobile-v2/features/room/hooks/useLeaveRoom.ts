import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PLAYER_ENDPOINT } from '@/shared/constants/endpoints';
import { request } from '@/shared/utils/apis';

export function useLeaveRoom() {
  const queryClient = useQueryClient();

  const mutationFn = (playerId: number) => {
    return request<void>({
      url: `${PLAYER_ENDPOINT}/${playerId}`,
      method: 'PATCH',
      requestInit: { body: JSON.stringify({ room: null }) },
    });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ['session'] });
    await queryClient.invalidateQueries({ queryKey: ['room'] });
  };

  return useMutation({
    mutationFn,
    onSuccess,
  });
}
