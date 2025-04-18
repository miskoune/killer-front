import { http, HttpResponse } from 'msw';

import { MISSION_ENDPOINT } from '@/constants/endpoints';
import { ErrorCode } from '@/constants/errors';

export function createMission() {
  return http.post(MISSION_ENDPOINT, async ({ request }) => {
    const body = (await request.json()) as { content: string };

    if (body?.content?.length < 5) {
      return HttpResponse.json(
        { detail: ErrorCode.MISSION_TOO_SHORT_CONTENT },
        { status: 400 },
      );
    }

    return HttpResponse.json({});
  });
}

export function deleteMission(missionId: string) {
  return http.delete(
    `${MISSION_ENDPOINT}/${missionId}`,
    async ({ request }) => {
      await request.json();

      return HttpResponse.json();
    },
  );
}
