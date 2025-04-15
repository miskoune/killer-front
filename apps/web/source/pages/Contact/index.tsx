import { Typography } from '@/components/Typography';
import { useTranslation } from '@/translations';

export function ContactPage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center mx-auto text-center mt-[100px] gap-4">
      <Typography.H1>{t('contact.title')}</Typography.H1>
      <p className="mb-2">{t('contact.description')}</p>
      <a className="font-medium" href={`mailto:${t('contact.email')}`}>
        {t('contact.email')}
      </a>
      <p>{t('contact.last.update')}</p>
    </div>
  );
}
