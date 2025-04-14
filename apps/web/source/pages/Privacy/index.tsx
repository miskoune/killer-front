import { useTranslation } from '@killerparty/intl';

export function PrivacyPage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="max-w-[800px] px-5 py-[50px] mx-auto text-white">
      <h1 className="mb-8 text-white text-4xl">{t('privacy.policy.title')}</h1>
      <p className="mb-6 text-lg">{t('privacy.policy.description')}</p>
      <h2 className="my-8 text-white text-3xl">
        {t('privacy.policy.information.title')}
      </h2>
      <p className="mb-6 text-lg">
        {t('privacy.policy.information.description')}
      </p>
      <p className="mb-6 text-lg">
        <strong className="text-white">
          {t('privacy.policy.information.description.first.item.subtitle')}
        </strong>
        &nbsp;
        {t('privacy.policy.information.description.first.item.description')}
      </p>
      <p className="mb-6 text-lg">
        <strong className="text-white">
          {t('privacy.policy.information.description.second.item.subtitle')}
        </strong>
        &nbsp;
        {t('privacy.policy.information.description.second.item.description')}
      </p>
      <h2 className="my-8 text-white text-3xl">
        {t('privacy.policy.information.usage.title')}
      </h2>
      <p className="mb-6 text-lg">
        {t('privacy.policy.information.usage.description')}
      </p>
      <ul className="pl-6 mb-6 list-disc">
        <li className="mb-2 text-white text-lg">
          {t('privacy.policy.information.usage.first.item.description')}
        </li>
        <li className="mb-2 text-white text-lg">
          {t('privacy.policy.information.usage.second.item.description')}
        </li>
        <li className="mb-2 text-white text-lg">
          {t('privacy.policy.information.usage.third.item.description')}
        </li>
        <li className="mb-2 text-white text-lg">
          {t('privacy.policy.information.usage.fourth.item.description')}
        </li>
      </ul>
      <h2 className="my-8 text-white text-3xl">
        {t('privacy.policy.information.share.title')}
      </h2>
      <p className="mb-6 text-lg">
        {t('privacy.policy.information.share.description')}
      </p>
      <ul className="pl-6 mb-6 list-disc">
        <li className="mb-2 text-white text-lg">
          {t('privacy.policy.information.share.first.item.description')}
        </li>
        <li className="mb-2 text-white text-lg">
          {t('privacy.policy.information.share.second.item.description')}
        </li>
        <li className="mb-2 text-white text-lg">
          {t('privacy.policy.information.share.third.item.description')}
        </li>
      </ul>
      <h2 className="my-8 text-white text-3xl">
        {t('privacy.policy.security.title')}
      </h2>
      <p className="mb-6 text-lg">{t('privacy.policy.security.description')}</p>
      <h2 className="my-8 text-white text-3xl">
        {t('privacy.policy.confidential.edition.title')}
      </h2>
      <p className="mb-6 text-lg">
        {t('privacy.policy.confidential.edition.description')}
      </p>
      <h2 className="my-8 text-white text-3xl">
        {t('privacy.policy.contact.title')}
      </h2>
      <p className="mb-6 text-lg">
        {t('privacy.policy.contact.description')}&nbsp;
        <strong className="text-white">{t('contact.email')}</strong>.
      </p>
      <p className="mb-6 text-lg">{t('privacy.policy.terms.validation')}</p>
      <p className="mb-6 text-lg">{t('privacy.policy.last.update')}</p>
    </div>
  );
}
