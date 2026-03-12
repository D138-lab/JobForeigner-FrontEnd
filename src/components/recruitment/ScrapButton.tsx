import Button from '../common/button/Button';
import usePostToggleScarp from '@/lib/apis/mutations/usePostToggleScrap';
import { useState } from 'react';

const ScrapButton = ({ id, initial }: { id: number; initial: boolean }) => {
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
      {scrapped ? '스크랩 취소' : '스크랩하기'}
    </Button>
  );
};

export default ScrapButton;
