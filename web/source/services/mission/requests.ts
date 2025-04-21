import { MISSION_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';

const { POST, DELETE } = Method;

export function createMissionRequest(content: string): Promise<void> {
  return request({
    url: MISSION_ENDPOINT,
    method: POST,
    requestInit: {
      body: JSON.stringify({ content }),
    },
  });
}

export function deleteMissionRequest(missionId: number): Promise<void> {
  return request({ url: `${MISSION_ENDPOINT}/${missionId}`, method: DELETE });
}
