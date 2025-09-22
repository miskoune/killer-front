import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PLAYER_ENDPOINT } from '@/shared/constants/endpoints';
import { SHOW_LOADING_WAIT_TIME } from '@/shared/constants/timers';
import { type Session } from '@/shared/types/session';
import { request } from '@/shared/utils/request';
import { wait } from '@/shared/utils/wait';

interface CreatePlayerParams {
  name: string;
  avatar: string;
}

export function useCreatePlayer() {
  const queryClient = useQueryClient();

  const mutationFn = async ({ name, avatar }: CreatePlayerParams) => {
    await wait(SHOW_LOADING_WAIT_TIME);

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
