import { useMutation } from '@tanstack/react-query';

import { request } from '@/utils/apis';

import { type Session, type Room } from './types';

export function useCreatePlayer() {
  const mutationFn = ({ name, avatar }: { name: string; avatar: string }) => {
    return request<Session>({
      url: 'https://api.killerparty.app/player',
      method: 'POST',
      requestInit: { body: JSON.stringify({ name, avatar }) },
    });
  };

  return useMutation({ mutationFn });
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
