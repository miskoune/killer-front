import { useMemo } from 'react';
import { toast } from 'sonner';

import Checked from '@/assets/icons/checked.svg?react';
import Avenger from '@/assets/images/avatars/avenger.svg?react';
import Beach from '@/assets/images/avatars/beach.svg?react';
import Captain from '@/assets/images/avatars/captain.svg?react';
import Football from '@/assets/images/avatars/football.svg?react';
import Gladiator from '@/assets/images/avatars/gladiator.svg?react';
import Jedi from '@/assets/images/avatars/jedi.svg?react';
import Milk from '@/assets/images/avatars/milk.svg?react';
import Pirate from '@/assets/images/avatars/pirate.svg?react';
import Samurai from '@/assets/images/avatars/samurai.svg?react';
import { onEnter } from '@/helpers/keys';
import { classNames } from '@/helpers/utils';
import { useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

export const avatarList = {
  avenger: <Avenger />,
  beach: <Beach />,
  captain: <Captain />,
  football: <Football />,
  gladiator: <Gladiator />,
  jedi: <Jedi />,
  milk: <Milk />,
  samurai: <Samurai />,
  pirate: <Pirate />,
};

interface Props {
  playerId?: number;
  currentAvatar?: string | null;
  setCurrentAvatar?: (avatar: string) => void;
}

export function Gallery({ playerId, currentAvatar, setCurrentAvatar }: Props) {
  const { session } = useSession();
  const { updatePlayer } = useUpdatePlayer();

  const handleAvatarClick = (avatar: string) => {
    setCurrentAvatar?.(avatar);

    toast.success('Avatar mis à jour');

    if (session || playerId) {
      updatePlayer.mutate({ id: playerId ?? session?.id, avatar });
    }
  };

  const selectedAvatar = useMemo(
    () => session?.avatar ?? currentAvatar,
    [session, currentAvatar],
  );

  return (
    <div className="flex flex-wrap gap-4 p-4 md:mt-[40px] md:mb-[100px]">
      {Object.entries(avatarList).map(([name, avatar]) => (
        <div key={name} className="relative flex">
          <div
            role="button"
            onClick={() => handleAvatarClick(name)}
            onKeyDown={({ key }) =>
              onEnter({ key, fn: () => handleAvatarClick(name) })
            }
            tabIndex={0}
            className={classNames(
              'rounded-full drop-shadow cursor-pointer [&>svg]:rounded-full [&>svg]:drop-shadow [&>svg]:w-[100px] [&>svg]:min-w-[100px] [&>svg]:h-[100px]',
              {
                'shadow-green': selectedAvatar === name,
              },
            )}
          >
            {avatar}
          </div>
          {selectedAvatar === name && (
            <Checked className="absolute top-[70%] right-0 h-[30px]" />
          )}
        </div>
      ))}
    </div>
  );
}
