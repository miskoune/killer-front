import { useTranslation } from '@killerparty/intl';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

export function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoBack = (): void => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center m-auto gap-4 justify-center w-[500px]">
      <Typography.H1 className="text-center">404</Typography.H1>
      <Typography.H2 className="text-center">
        {t('notfound.description')}
      </Typography.H2>

      <Button color="primary" onClick={handleGoBack}>
        {t('notfound.back')}
      </Button>
    </div>
  );
}
