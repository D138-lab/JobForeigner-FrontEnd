import { useState } from 'react';
import styles from './page.module.scss';
import { Link } from 'react-router-dom';
import Button from '@/components/common/button/Button';
import { FileText, Plus, Sparkles } from 'lucide-react';
import Input from '@/components/common/input/Input';
import Select from '@/components/common/select/Select';
import ResumeCard from '@/components/profile/resume/ResumeCard';
import { Resume } from '@/lib/type/profile/resume';
import useGetResumeList from '@/lib/apis/queries/useGetResumeList';
import { useTranslation } from 'react-i18next';

export default function ResumeListPage() {
  const { t } = useTranslation('pages');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: resumeListData, isLoading, error } = useGetResumeList();
  void error;

  const resumeList: Resume[] =
    resumeListData?.data?.content?.map(
      (item: any): Resume => ({
        id: item.resumeId,
        title:
          item.resumeTitle ||
          (item.desiredJobs && item.desiredJobs[0]?.desiredJob) ||
          t('profile.resume.resumeFallback'),
        createdAt: item.createdAt?.slice(0, 10) || '',
        updatedAt: item.updatedAt?.slice(0, 10) || '',
        status: 'completed', // TODO: 필요시 조건 분기
      }),
    ) ?? [];

  // 검색어 필터 적용
  const filteredResumes = resumeList.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.pageContainer}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <span className={styles.eyebrow}>
            <Sparkles size={14} />
            {t('profile.resume.title')}
          </span>
          <h1 className={styles.headerTitle}>{t('profile.resume.title')}</h1>
          <p className={styles.headerSubtitle}>
            {t('profile.resume.description')}
          </p>
        </div>
        <Link to='/profile/resume/create'>
          <Button size='medium'>
            <Plus className={styles.buttonIcon} />
            {t('profile.resume.create')}
          </Button>
        </Link>
      </div>

      {/* 필터 & 검색 */}
      <div className={styles.filterBox}>
        <div className={styles.filterRow}>
          {/* 검색 래퍼 */}
          <div className={styles.searchWrapper}>
            <Input
              icon='search'
              placeholder={t('profile.resume.searchPlaceholder')}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.selects}>
            <Select
              options={[
                { value: 'all', label: t('profile.filters.all') },
                { value: 'completed', label: t('profile.resume.completed') },
                { value: 'progressing', label: t('profile.resume.inProgress') },
              ]}
              defaultValue='all'
              name='status'
            />
            <Select
              options={[
                { value: 'newest', label: t('profile.filters.newest') },
                { value: 'oldest', label: t('profile.filters.oldest') },
              ]}
              defaultValue='newest'
              name='sort'
            />
          </div>
        </div>
      </div>

      {/* 이력서 목록 */}
      <div className={styles.resumeList}>
        {isLoading ? (
          <div className={styles.emptyList}>
            <h3 className={styles.emptyListTitle}>
              {t('profile.main.loading')}
            </h3>
          </div>
        ) : filteredResumes.length > 0 ? (
          filteredResumes.map(resume => (
            <ResumeCard key={resume.id} resume={resume} />
          ))
        ) : (
          <div className={styles.emptyList}>
            <FileText className={styles.emptyListIcon} />
            <h3 className={styles.emptyListTitle}>
              {t('profile.resume.emptyTitle')}
            </h3>
            <p className={styles.emptyListDesc}>
              {t('profile.resume.emptyDescription')}
            </p>
            <Link to='/profile/resume/create'>
              <Button size='medium'>
                <Plus className={styles.buttonIcon} />
                {t('profile.resume.create')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
