import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type RequestError } from '@/helpers/errors';

import { createPlayerRequest, updatePlayerRequest } from './requests';
import {
  type PlayerUpdateInfos,
  type CreatePlayerMutation,
  type UpdatePlayerMutation,
  type Session,
} from './types';

export function useUpdatePlayer(): UpdatePlayerMutation {
  const queryClient = useQueryClient();

  const updatePlayer = useMutation<
    void,
    RequestError,
    Partial<PlayerUpdateInfos>,
    unknown
  >({
    mutationFn: updatePlayerRequest,
    onMutate: async ({ avatar }) => {
      // Optimistically update the session with the new avatar
      if (avatar) {
        await queryClient.cancelQueries({ queryKey: ['session'] });

        queryClient.setQueryData<Session>(['session'], (oldSession) => ({
          ...oldSession!,
          ...(avatar && { avatar }),
        }));
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['session'] }),
  });

  return { updatePlayer };
}

export function useCreatePlayer(): CreatePlayerMutation {
  const queryClient = useQueryClient();

  const createPlayer = useMutation({
    mutationFn: createPlayerRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['session'] }),
  });

  return { createPlayer };
}
