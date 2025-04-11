import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { useScroll } from '@/hooks/useScroll';

import { LanguageSelector } from './Menu';
import styles from './styles/Header.module.css';

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const isScrolled = useScroll();

  return (
    <div
      className={clsx(styles.content, {
        'border-b border-white/20': isScrolled,
      })}
    >
      <header className={styles.header}>
        <button
          type="button"
          className={styles.text}
          onClick={() => navigate('/')}
        >
          Killer Party
        </button>
        <LanguageSelector />
      </header>
    </div>
  );
}
