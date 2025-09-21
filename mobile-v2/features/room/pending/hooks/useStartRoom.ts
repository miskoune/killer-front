import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ROOM_ENDPOINT } from '@/shared/constants/endpoints';
import { request } from '@/shared/utils/request';

export function useStartRoom() {
  const queryClient = useQueryClient();

  const mutationFn = (roomCode: string) => {
    return request<void>({
      url: `${ROOM_ENDPOINT}/${roomCode}`,
      method: 'PATCH',
      requestInit: { body: JSON.stringify({ status: 'IN_GAME' }) },
    });
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['session'] });
  };

  return useMutation({ mutationFn: mutationFn, onSuccess });
}
