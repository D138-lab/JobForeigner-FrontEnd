import Progress from '@/components/common/progress/Progress';
import styles from './bottomActions.module.scss';
import Button from '@/components/common/button/Button';
import { FileDown, Save } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function BottomActions() {
  const { t } = useTranslation('pages');
  const { watch } = useFormContext();
  const formValues = watch();

  function getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  const handleTempSave = () => {
    console.log('Draft form data');
    console.log(JSON.stringify(formValues, null, 2));
  };

  const progress = useMemo(() => {
    const requiredFields = [
      'resumeTitle',
      'desiredJobs',
      'skills',
      'jobPreference.desiredEmploymentType',
      'jobPreference.desiredSalary',
      'jobPreference.desiredLocation',
    ];

    const totalFields = requiredFields.length;
    const filledFields = requiredFields.filter(field => {
      const value = getNestedValue(formValues, field);
      if (typeof value === 'number') return value > 0;
      if (Array.isArray(value)) return value.length > 0;
      return (
        value !== undefined && value !== null && value.toString().trim() !== ''
      );
    }).length;

    return Math.round((filledFields / totalFields) * 100);
  }, [formValues]);
  return (
    <div className={styles.bottomBar}>
      <div className={styles.bottomBarContainer}>
        <div className={styles.bottomBarRow}>
          <div className={styles.progressSection}>
            <div className={styles.progressLabelRow}>
              <span className={styles.progressLabel}>
                {t('profile.component.bottomActions.progress')}
              </span>
              <span className={styles.progressValue}>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
          <div className={styles.buttonGroup}>
            <Button variant='outline' size='medium' onClick={handleTempSave}>
              <FileDown className={styles.buttonIcon} />
              <span className={styles.buttonText}>
                {t('profile.component.bottomActions.tempSave')}
              </span>
            </Button>
            <Button size='medium'>
              <Save className={styles.buttonIcon} />
              <span className={styles.buttonText}>
                {t('profile.component.form.save')}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
