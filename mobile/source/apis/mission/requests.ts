import { MISSION_ENDPOINT } from '../constants';
import { createRequest } from '../utils/create-request';

export function createMissionRequest(content: string): Promise<void> {
  return createRequest({
    url: MISSION_ENDPOINT,
    method: 'POST',
    requestInit: {
      body: JSON.stringify({ content }),
    },
  });
}

export function deleteMissionRequest(missionId: number): Promise<void> {
  return createRequest({
    url: `${MISSION_ENDPOINT}/${missionId}`,
    method: 'DELETE',
  });
}
