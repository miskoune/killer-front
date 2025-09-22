import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { PLAYER_ENDPOINT } from '@/shared/constants/endpoints';
import { request } from '@/shared/utils/request';

export function useLeaveRoom() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationFn = (playerId?: number) => {
    return request<void>({
      url: `${PLAYER_ENDPOINT}/${playerId}`,
      method: 'PATCH',
      requestInit: { body: JSON.stringify({ room: null }) },
    });
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ['session'] });

    router.replace('/');
  };

  return useMutation({
    mutationFn,
    onSuccess,
  });
}
