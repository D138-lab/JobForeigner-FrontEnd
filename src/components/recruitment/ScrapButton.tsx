import Button from '../common/button/Button';
import usePostToggleScarp from '@/lib/apis/mutations/usePostToggleScrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ScrapButton = ({ id, initial }: { id: number; initial: boolean }) => {
  const { t } = useTranslation('pages');
  const [scrapped, setScrapped] = useState(initial);
  const { mutate, isPending } = usePostToggleScarp();

  const handleClick = () => {
    mutate(id, {
      onSuccess: () => setScrapped(prev => !prev),
    });
  };

  return (
    <Button
      variant={scrapped ? 'outline' : 'default'}
      size='medium'
      onClick={handleClick}
      disabled={isPending}
      style={{
        minWidth: 180,
      }}
    >
      {scrapped ? t('jobs.cancelScrap') : t('jobs.scrap')}
    </Button>
  );
};

export default ScrapButton;
