import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { Modal } from '@/components/Modal';
import { ModalContext } from '@/context/modal';
import { classNames } from '@/helpers/utils';
import { useSession } from '@/services/player/queries';

import { Header } from './Header';

export function Layout() {
  const { modal, closeModal } = useContext(ModalContext);
  const { isLoading, session, refetchSession } = useSession();

  return (
    <div className="flex h-full">
      <div className={classNames('w-full mx-auto')}>
        <Header />
        <section className="max-w-7xl mx-auto p-4 mt-[60px]">
          <Outlet context={{ isLoading, session, refetchSession }} />
        </section>
      </div>
      {modal && <Modal closeModal={closeModal}>{modal}</Modal>}
    </div>
  );
}
