import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useEvent } from '@/hooks/useEvent';
import { usePrevious } from '@/hooks/usePrevious';

interface ModalContextInterface {
  modal: ReactNode;
  openModal: Dispatch<SetStateAction<ReactNode>>;
  closeModal: () => void;
}

interface Props {
  children: ReactNode;
}

const ModalContext = createContext({} as ModalContextInterface);

function ModalProvider({ children }: Props) {
  const [modal, openModal] = useState<ReactNode>(null);

  const memoizedModalComponent = useMemo(
    () => ({
      modal,
      openModal,
      closeModal: () => openModal(null),
    }),
    [modal, openModal],
  );

  const previousModal = usePrevious(modal);

  /**
   * Prevent page scrolling when a modal is open.
   */
  useEffect(() => {
    if (!previousModal && modal) {
      document.body.style.overflow = 'hidden';
    }

    if (previousModal && !modal) {
      document.body.style.removeProperty('overflow');
    }
  }, [previousModal, modal]);

  /**
   * Close any modal opened when the user navigate through the history.
   */
  useEvent('popstate', () => {
    if (modal) {
      document.body.style.removeProperty('overflow');
      openModal(null);
    }
  });

  return (
    <ModalContext.Provider value={memoizedModalComponent}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
