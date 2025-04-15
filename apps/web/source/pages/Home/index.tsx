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
} from '@/components/Tooltip';
import { Typography } from '@/components/Typography';
import { type SessionQuery } from '@/services/player/types';
import { useTranslation } from '@/translations';

import { Rules } from './Rules';

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
      <div className="flex items-center justify-between md:flex-row flex-col">
        <div>
          <div className="py-8 md:py-[30px]">
            <Typography.H1 className="mb-[20px] md:mb-[30px]">
              {t('home.title')}
            </Typography.H1>
            <p>{t('home.description')}</p>
          </div>
          <Lottie
            className="md:hidden max-w-[80vw] mx-auto"
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
          className="hidden md:block max-w-[30rem]"
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
