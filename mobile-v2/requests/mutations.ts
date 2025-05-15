import { useMutation, useQueryClient } from '@tanstack/react-query';

import { request } from '@/utils/apis';

import { type Player, type Room } from './types';

export function useCreatePlayer() {
  const queryClient = useQueryClient();

  const mutationFn = ({ name, avatar }: { name: string; avatar: string }) => {
    return request<Player>({
      url: 'https://api.killerparty.app/player',
      method: 'POST',
      requestInit: { body: JSON.stringify({ name, avatar }) },
    });
  };

  const onSuccess = () => {
    queryClient.resetQueries({ queryKey: ['session'] });
  };

  return useMutation({
    mutationFn,
    onSuccess,
  });
}

export function useCreateRoom() {
  const mutationFn = ({ isGameMastered }: { isGameMastered: boolean }) => {
    return request<Room>({
      url: 'https://api.killerparty.app/room',
      method: 'POST',
      requestInit: { body: JSON.stringify({ isGameMastered }) },
    });
  };

  return useMutation({ mutationFn });
}
