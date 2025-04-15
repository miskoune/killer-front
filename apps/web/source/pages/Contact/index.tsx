import { Typography } from '@/components/Typography';
import { useTranslation } from '@/translations';

import styles from './styles/index.module.css';

export function ContactPage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <Typography.H1>{t('contact.title')}</Typography.H1>
      <p>{t('contact.description')}</p>
      <a className={styles.contact} href={`mailto:${t('contact.email')}`}>
        {t('contact.email')}
      </a>
      <p>{t('contact.last.update')}</p>
    </div>
  );
}
