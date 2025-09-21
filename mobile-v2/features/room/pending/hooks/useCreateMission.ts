import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MISSION_ENDPOINT } from '@/shared/constants/endpoints';
import { request } from '@/shared/utils/request';

export function useCreateMission() {
  const queryClient = useQueryClient();

  const mutationFn = ({ content }: { content: string }) => {
    return request<void>({
      url: MISSION_ENDPOINT,
      method: 'POST',
      requestInit: { body: JSON.stringify({ content }) },
    });
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['room'] });
    queryClient.invalidateQueries({ queryKey: ['session'] });
  };

  return useMutation({
    mutationFn,
    onSuccess,
  });
}
