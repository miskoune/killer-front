import { useMutation } from '@tanstack/react-query';

import { PLAYER_ENDPOINT } from '@/shared/constants/endpoints';
import { request } from '@/shared/utils/request';

export function useKickPlayer() {
  const mutationFn = (playerId: number) => {
    return request<void>({
      url: `${PLAYER_ENDPOINT}/${playerId}`,
      method: 'PATCH',
      requestInit: { body: JSON.stringify({ room: null }) },
    });
  };

  return useMutation({
    mutationFn,
  });
}
