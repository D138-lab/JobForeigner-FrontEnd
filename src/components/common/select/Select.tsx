import { Briefcase, ChevronDown, MapPin, Search } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import clsx from 'clsx';
import styles from './select.module.scss';

const getIcon = (icon?: string) => {
  switch (icon) {
    case 'search':
      return <Search className={styles.icon} />;
    case 'map-pin':
      return <MapPin className={styles.icon} />;
    case 'brief-case':
      return <Briefcase className={styles.icon} />;
    default:
      return null;
  }
};

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  icon?: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  value?: string;
  name?: string;
  width?: string | number;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    { icon, options, defaultValue, onChange, name, value, width, ...props },
    ref,
  ) => {
    const { t } = useTranslation('common');
    const [selectedValue, setSelectedValue] = useState(
      value ?? defaultValue ?? options[0]?.value,
    );
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === selectedValue);

    useEffect(() => {
      if (value !== undefined && value !== selectedValue) {
        setSelectedValue(value);
      }
    }, [value, selectedValue]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOptionClick = (optionValue: string) => {
      setSelectedValue(optionValue);
      if (onChange) {
        onChange(optionValue);
      }
      setIsOpen(false);
    };

    return (
      <div className={styles.selectWrapper} ref={wrapperRef} {...props}>
        {getIcon(icon)}
        <div
          ref={ref}
          className={clsx(
            styles.customSelect,
            icon && styles.isIcon,
            isOpen && styles.isOpen,
          )}
          onClick={() => setIsOpen(prev => !prev)}
          style={{ width }}
          tabIndex={0}
          role='button'
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          aria-label={t('select.ariaLabel')}
        >
          {selectedOption ? selectedOption.label : t('select.placeholder')}
          <ChevronDown className={styles.arrow} />
        </div>
        {isOpen && (
          <ul className={styles.optionsList} role='listbox'>
            {options.map(opt => (
              <li
                key={opt.value}
                className={clsx(
                  styles.option,
                  opt.value === selectedValue && styles.selectedOption,
                )}
                onClick={() => handleOptionClick(opt.value)}
                role='option'
                aria-selected={opt.value === selectedValue}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
        {name && <input type='hidden' name={name} value={selectedValue} />}
      </div>
    );
  },
);

export default Select;
