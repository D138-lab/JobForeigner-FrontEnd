import { Dispatch, SetStateAction } from 'react';
import { List, Map } from 'lucide-react';

import styles from './selectByTwo.module.scss';

interface Props {
  firstIcon?: string;
  secondIcon?: string;
  firstText: string;
  secondText: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const getIcon = (icon?: string) => {
  if (icon === 'map') return <Map size={15} />;
  if (icon === 'list') return <List size={15} />;
};

export const SelectByTwo = ({
  firstIcon,
  secondIcon,
  firstText,
  secondText,
  selected,
  setSelected,
}: Props) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.firstItem} ${
          selected === firstIcon ? styles.selected : ''
        }`}
        onClick={() => setSelected(firstText)}
      >
        {getIcon(firstIcon)}
        <span>{firstText}</span>
      </div>
      <div
        className={`${styles.secondItem} ${
          selected === secondIcon ? styles.selected : ''
        }`}
        onClick={() => setSelected(secondText)}
      >
        {getIcon(secondIcon)}
        <span>{secondText}</span>
      </div>
    </div>
  );
};
