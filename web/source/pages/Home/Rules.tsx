import { Typography } from '@/components/Typography';
import { useTranslation } from '@/translations';

export function Rules() {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center rounded-lg py-8 my-2 cursor-pointer gap-8 transition-all duration-300 ease-in-out hover:bg-white/5 hover:translate-x-[10px] md:flex-row flex-col">
        <span className="hidden md:flex items-center justify-center ml-4 mr-12 text-white text-5xl font-bold transition-all duration-300">
          1.
        </span>
        <div className="flex flex-col gap-2">
          <Typography.H3>{t('home.first.rule.title')}</Typography.H3>
          <p className="text-lg">{t('home.first.rule.text')}</p>
        </div>
      </div>
      <div className="flex items-center py-8 rounded-lg my-2 cursor-pointer gap-8 transition-all duration-300 ease-in-out hover:bg-white/5 hover:translate-x-[10px] md:flex-row flex-col">
        <span className="hidden md:flex items-center justify-center ml-4 mr-12 text-white text-5xl font-bold transition-all duration-300">
          2.
        </span>
        <div className="flex flex-col gap-2">
          <Typography.H3>{t('home.second.rule.title')}</Typography.H3>
          <p className="text-lg">{t('home.second.rule.text')}</p>
        </div>
      </div>
      <div className="flex items-center py-8 rounded-lg my-2 cursor-pointer gap-8 transition-all duration-300 ease-in-out hover:bg-white/5 hover:translate-x-[10px] md:flex-row flex-col">
        <span className="hidden md:flex items-center justify-center ml-4 mr-12 text-white text-5xl font-bold transition-all duration-300">
          3.
        </span>
        <div className="flex flex-col gap-2">
          <Typography.H2>{t('home.third.rule.title')}</Typography.H2>
          <p className="text-lg">{t('home.third.rule.text')}</p>
        </div>
      </div>
    </>
  );
}
