import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PLAYER_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { request } from '@/utils/apis';

import { type Session, type Room, type SessionUpdate } from './types';

export function useCreatePlayer() {
  const queryClient = useQueryClient();

  const mutationFn = ({ name, avatar }: { name: string; avatar: string }) => {
    return request<Session>({
      url: PLAYER_ENDPOINT,
      method: 'POST',
      requestInit: { body: JSON.stringify({ name, avatar }) },
    });
  };

  const onSuccess = async ({ token }: { token: string }) => {
    await AsyncStorage.setItem('token', token);

    queryClient.invalidateQueries({ queryKey: ['session'] });
  };

  return useMutation({
    mutationFn,
    onSuccess,
  });
}

export function useUpdatePlayer() {
  const mutationFn = (session: Partial<SessionUpdate>) => {
    return request<Session>({
      url: `${PLAYER_ENDPOINT}/${session.id}`,
      method: 'PATCH',
      requestInit: { body: JSON.stringify(session) },
    });
  };

  return useMutation({ mutationFn });
}

export function useCreateRoom() {
  const mutationFn = ({ isGameMastered }: { isGameMastered: boolean }) => {
    return request<Room>({
      url: ROOM_ENDPOINT,
      method: 'POST',
      requestInit: { body: JSON.stringify({ isGameMastered }) },
    });
  };

  return useMutation({ mutationFn });
}

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
    queryClient.invalidateQueries({ queryKey: ['session', 'room'] });
  };

  return useMutation({
    mutationFn,
    onSuccess,
  });
}
