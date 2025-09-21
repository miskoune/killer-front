import { Home } from '@/features/home';
import { useRoomRedirect } from '@/shared/hooks/useRoomRedirect';

export default function HomePage() {
  useRoomRedirect();

  return <Home />;
}
