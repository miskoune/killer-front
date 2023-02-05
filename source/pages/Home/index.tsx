import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '@/hooks/useTranslation';
import { useSession } from '@/services/player/queries';

import { CreateRoomButton } from './CreateRoomButton';
import { Gallery } from './Gallery';
import { JoinRoomButton } from './JoinRoomButton';
import { Rules } from './Rules';
import styles from './styles/index.module.css';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { session } = useSession();

  useEffect(() => {
    if (session?.room?.code) {
      navigate(`/room/${session.room.code}`);
    }
  }, [navigate, session?.room?.code]);

  return (
    <>
      <div className={styles.introduction}>
        <h1>{t('home.title')}</h1>
        <h2>{t('home.subtitle')}</h2>
        <p>{t('home.description')}</p>
      </div>
      <div className={styles.actions}>
        <CreateRoomButton playerName={session?.name} />
        <JoinRoomButton />
      </div>
      <Gallery />
      <Rules />
    </>
  );
}
