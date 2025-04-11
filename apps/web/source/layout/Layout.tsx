import clsx from 'clsx';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { Modal } from '@/components/Modal';
import { ModalContext } from '@/context/modal';
import { useSession } from '@/services/player/queries';

import { Header } from './Header';
import styles from './styles/Layout.module.css';

export function Layout(): JSX.Element {
  const { modal, closeModal } = useContext(ModalContext);
  const { isLoading, session, refetchSession } = useSession();

  return (
    <div className={styles.application}>
      <div className={clsx(styles.layout)}>
        <Header />
        <section className={styles.content}>
          <Outlet context={{ isLoading, session, refetchSession }} />
        </section>
      </div>
      {modal && <Modal closeModal={closeModal}>{modal}</Modal>}
    </div>
  );
}
