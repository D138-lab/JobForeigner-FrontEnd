import { Dispatch, SetStateAction } from 'react';

import styles from './activateButton.module.scss';

interface Props {
  text: string;
  isActive: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export const ActivateButton = ({ text, isActive, setActive }: Props) => {
  return (
    <div
      className={`${styles.container} ${isActive ? styles.active : ''}`}
      onClick={() => setActive(prev => !prev)}
    >
      <div>{text}</div>
    </div>
  );
};
