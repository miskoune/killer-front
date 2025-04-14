import { useTranslation } from '@killerparty/intl';
import { type ReactNode } from 'react';

import Close from '@/assets/icons/close.svg';

interface Props {
  children: ReactNode;
  closeModal: () => void;
}

export function Modal({ children, closeModal }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 relative">
        <Close
          className="absolute top-2 right-2 cursor-pointer"
          title={t('tooltip.close')}
          onClick={closeModal}
        />
        {children}
      </div>
    </div>
  );
}
