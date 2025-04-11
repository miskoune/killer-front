import { useTranslation } from '@killerparty/intl';

import { Typography } from '@/components/ui/Typography';

import styles from './styles/Rules.module.css';

export function Rules(): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.step}>
        <span className={styles.number}>1.</span>
        <div>
          <Typography.H3>{t('home.first.rule.title')}</Typography.H3>
          <Typography.Blockquote>
            {t('home.first.rule.text')}
          </Typography.Blockquote>
        </div>
      </div>
      <div className={styles.step}>
        <span className={styles.number}>2.</span>
        <div>
          <Typography.H3>{t('home.second.rule.title')}</Typography.H3>
          <Typography.Blockquote>
            {t('home.second.rule.text')}
          </Typography.Blockquote>
        </div>
      </div>
      <div className={styles.step}>
        <span className={styles.number}>3.</span>
        <div>
          <Typography.H2>{t('home.third.rule.title')}</Typography.H2>
          <Typography.Blockquote>
            {t('home.third.rule.text')}
          </Typography.Blockquote>
        </div>
      </div>
    </>
  );
}
