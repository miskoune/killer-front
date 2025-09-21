import { useMutation } from '@tanstack/react-query';

import { ROOM_ENDPOINT } from '@/shared/constants/endpoints';
import { type Room } from '@/shared/types/room';
import { request } from '@/shared/utils/request';

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
