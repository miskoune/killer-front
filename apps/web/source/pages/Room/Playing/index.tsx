import { PlayerList } from '@/pages/Room/Pending/PlayerList';
import { PlayerStatus } from '@/services/player/constants';
import { useSession } from '@/services/player/queries';

import { PlayerKilledButton } from './PlayerKilledButton';
import { Status } from './Status';
import styles from './styles/index.module.css';

export function PlayingRoomPage(): JSX.Element {
  const { session } = useSession();

  return (
    <>
      <Status />
      <div className={styles.features}>
        {session?.status === PlayerStatus.ALIVE && <PlayerKilledButton />}
        <PlayerList />
      </div>
    </>
  );
}