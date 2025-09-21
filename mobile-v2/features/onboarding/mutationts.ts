import { useMutation } from '@tanstack/react-query';

import { PLAYER_ENDPOINT } from '@/constants/endpoints';
import { type Player } from '@/shared/types/player';
import { request } from '@/shared/utils/apis';

export function useCreatePlayer() {
  const mutationFn = ({ name, avatar }: { name: string; avatar: string }) => {
    return request<Player>({
      url: PLAYER_ENDPOINT,
      method: 'POST',
      requestInit: { body: JSON.stringify({ name, avatar }) },
    });
  };

  return useMutation({ mutationFn });
}
