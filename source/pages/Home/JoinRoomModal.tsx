import { ChangeEvent, Fragment, useContext, useState } from 'react';
import tw from 'twin.macro';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ModalContext } from '@/context/modal';
import { useTranslation } from '@/hooks/useTranslation';
import { useCreatePlayer, useUpdatePlayer } from '@/services/player/mutations';
import { useSession } from '@/services/player/queries';

const HeadContent = tw.div`
  flex flex-row items-center
`;

const Title = tw.h2`
  mb-0
`;

export function JoinRoomModal(): JSX.Element {
  const [pseudo, setPseudo] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const { t } = useTranslation();
  const { closeModal } = useContext(ModalContext);
  const { session } = useSession();
  const { createPlayer } = useCreatePlayer();
  const { updatePlayer } = useUpdatePlayer();

  const handlePseudo = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setPseudo(target.value);
  };

  const handleRoomCode = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setRoomCode(target.value.toUpperCase());
  };

  const handleJoinRoom = async (): Promise<void> => {
    if (!session) {
      await createPlayer.mutateAsync(pseudo.toUpperCase(), {
        onSuccess: ({ id }) =>
          updatePlayer.mutateAsync(
            { id, room: roomCode },
            { onSuccess: closeModal },
          ),
      });
    } else {
      updatePlayer.mutateAsync(
        { id: session?.id, room: roomCode },
        { onSuccess: closeModal },
      );
    }
  };

  return (
    <Fragment>
      <HeadContent>
        <Title>{t('home.join.room')}</Title>
      </HeadContent>
      {!session?.name && (
        <Input
          id="pseudo"
          type="text"
          label={t('home.create.pseudo.label')}
          placeholder={t('home.create.pseudo.placeholder')}
          value={pseudo}
          onChange={handlePseudo}
        />
      )}
      <Input
        id="joinRoom"
        label={t('home.join.room.code.label')}
        placeholder={t('home.join.room.code.placeholder')}
        value={roomCode}
        onChange={handleRoomCode}
        uppercase
      />
      <Button
        content={t('home.join.room.confirm.button')}
        disabled={!roomCode}
        onClick={handleJoinRoom}
      />
    </Fragment>
  );
}
