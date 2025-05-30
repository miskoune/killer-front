import { useMutation } from '@tanstack/react-query';

import { type Player } from '@/requests/types';
import { request } from '@/utils/apis';

export function useCreatePlayer() {
  const mutationFn = ({ name, avatar }: { name: string; avatar: string }) => {
    return request<Player>({
      url: 'https://api.killerparty.app/player',
      method: 'POST',
      requestInit: { body: JSON.stringify({ name, avatar }) },
    });
  };

  return useMutation({ mutationFn });
}
