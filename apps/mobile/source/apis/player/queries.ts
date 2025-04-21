import { useQuery } from '@tanstack/react-query';

import { getSessionRequest } from './requests';
import { type SessionQuery } from './types';

export function useSession(): SessionQuery {
  const { data: session, refetch: refetchSession } = useQuery({
    queryKey: ['session'],
    queryFn: getSessionRequest,
  });

  return {
    session,
    refetchSession,
  };
}
