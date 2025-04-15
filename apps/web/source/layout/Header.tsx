import { useNavigate } from 'react-router-dom';

import { classNames } from '@/helpers/utils';
import { useScroll } from '@/hooks/useScroll';

import { LanguageSelector } from './LanguageSelector';

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const isScrolled = useScroll();

  return (
    <div
      className={classNames(
        'fixed top-0 right-0 left-0 z-50 bg-body border-b border-white/10 transition-colors duration-500',
        {
          'border-b border-white/50': isScrolled,
        },
      )}
    >
      <header className="flex max-w-7xl mx-auto items-center justify-between p-4">
        <button
          type="button"
          className="mr-2 text-white font-semibold uppercase"
          onClick={() => navigate('/')}
        >
          Killer Party
        </button>
        <LanguageSelector />
      </header>
    </div>
  );
}
