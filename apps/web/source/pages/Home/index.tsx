import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import AppleStore from '@/assets/images/apple-store.svg';
import GooglePlayStore from '@/assets/images/google-play-store.png';
import HomeLottie from '@/assets/lotties/home.json';
import { Gallery } from '@/components/Gallery';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { Typography } from '@/components/ui/Typography';
import { type SessionQuery } from '@/services/player/types';

import { Rules } from './Rules';
import styles from './styles/index.module.css';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { session } = useOutletContext<SessionQuery>();
  const [defaultAvatar, setDefaultAvatar] = useState('captain');

  useEffect(() => {
    if (session?.room?.id) {
      navigate(`/room/${session.room.id}`);
    }
  }, [navigate, session?.room?.id]);

  return (
    <>
      <div className={styles.content}>
        <div>
          <div className={styles.resume}>
            <Typography.H1>{t('home.title')}</Typography.H1>
            <p>{t('home.description')}</p>
          </div>
          <Lottie
            className={styles.mobileLottie}
            animationData={HomeLottie}
            style={{ transform: 'scaleX(-1)' }}
          />
          <div className="flex items-center">
            <a
              href="https://apps.apple.com/fr/app/killerparty/id6468843961"
              target="_blank"
              rel="noreferrer"
              aria-label="Download on the Apple Store"
            >
              <AppleStore />
            </a>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src={GooglePlayStore}
                    alt="Download on the Google Play Store"
                    className="h-20"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <span>{t('home.android.app.coming.soon')}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Lottie
          className={styles.webLottie}
          animationData={HomeLottie}
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>
      <Gallery
        currentAvatar={defaultAvatar}
        setCurrentAvatar={setDefaultAvatar}
      />
      <Rules />
    </>
  );
}
