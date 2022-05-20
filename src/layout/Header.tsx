import { useContext } from 'react';
import tw from 'tailwind-styled-components';

import Settings from '@/assets/icons/settings.svg';
import { isEmptyObject } from '@/helpers/objects';
import t from '@/helpers/translate';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerContext } from '@/hooks/context/player';

import { SettingsModal } from './SettingsModal';

const Navigation = tw.header`
  p-2 flex justify-between
`;

const Text = tw.p`
  font-bold text-black uppercase
`;

const PlayerInfos = tw.div`
  flex flex-row cursor-pointer
`;

const Image = tw.img`
  ml-1
`;

interface Props {
  hideSettings?: boolean;
}

const Header = ({ hideSettings = false }: Props): JSX.Element => {
  const { playerSession } = useContext(PlayerContext);
  const { openModal } = useContext(ModalContext);

  return (
    <Navigation>
      <Text>{t('header.project_name')}</Text>
      {!isEmptyObject(playerSession) && (
        <PlayerInfos onClick={() => openModal(<SettingsModal />)}>
          <Text>{playerSession.name}</Text>
          {!hideSettings && <Image alt="settings" src={Settings} />}
        </PlayerInfos>
      )}
    </Navigation>
  );
};

export default Header;
