import { useNavigate } from 'react-router-dom';

import { LanguageSelector } from './Menu';
import styles from './styles/Header.module.css';

export function Header(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
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
