import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PLAYER_ENDPOINT } from '@/shared/constants/endpoints';
import { type Session } from '@/shared/types/session';
import { request } from '@/shared/utils/request';

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
