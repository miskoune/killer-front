import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MISSION_ENDPOINT } from '@/constants/endpoints';
import { request } from '@/utils/apis';

export function useCreateMission() {
  const queryClient = useQueryClient();

  const mutationFn = ({ content }: { content: string }) => {
    console.log('Creating mission with content:', content);

    return request<void>({
      url: MISSION_ENDPOINT,
      method: 'POST',
      requestInit: { body: JSON.stringify({ content }) },
    });
  };

  const onSuccess = () => {
    console.log('Mission created successfully, invalidating queries...');

    // Invalidate room and session queries to refresh mission data
    queryClient.invalidateQueries({ queryKey: ['room'] });
    queryClient.invalidateQueries({ queryKey: ['session'] });

    console.log('Queries invalidated');
  };

  return useMutation({
    mutationFn,
    onSuccess,
  });
}

export function useDeleteMission() {
  const queryClient = useQueryClient();

  const mutationFn = ({ missionId }: { missionId: number }) => {
    return request<void>({
      url: `${MISSION_ENDPOINT}/${missionId}`,
      method: 'DELETE',
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
