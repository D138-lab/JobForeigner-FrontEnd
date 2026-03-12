import { useNavigate } from 'react-router-dom';
import styles from './page.module.scss';
import Button from '@/components/common/button/Button';
import { ArrowLeft } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import CompanyProfileEditForm from '@/components/profile/company/edit/CompanyProfileEditForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyProfileEditSchema } from '@/lib/schemas/companyProfileEditSchema';
import { useTranslation } from 'react-i18next';

const defaultValues = {
  logo: null,
  company: '',
  ceo: '',
  businessNumber: '',
  industry: '',
  foundedYear: '',
  employeeCount: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  description: '',
};

export default function CompanyProfileEditPage() {
  const { t } = useTranslation('pages');
  const navigation = useNavigate();
  const formState = useForm({
    defaultValues,
    resolver: zodResolver(companyProfileEditSchema),
  });

  const onSubmit = async (data: unknown) => {
    console.log(data);
  };

  const onError = (error: unknown) => {
    console.error(error);
  };

  return (
    <div className={styles.container}>
      <main className={styles.page}>
        <div className={styles.title}>
          <h1>{t('profile.companyEdit.title')}</h1>
          <Button
            variant='outline'
            size='medium'
            onClick={() => navigation(-1)}
          >
            <span className={styles.buttonContent}>
              <ArrowLeft className={styles.buttonIcon} />
              {t('profile.common.goBack')}
            </span>
          </Button>
        </div>
        <section>
          <h2>{t('profile.common.basicInfo')}</h2>
          <p>{t('profile.companyEdit.description')}</p>
          <FormProvider {...formState}>
            <form onSubmit={formState.handleSubmit(onSubmit, onError)}>
              <CompanyProfileEditForm />
            </form>
          </FormProvider>
        </section>
      </main>
    </div>
  );
}
