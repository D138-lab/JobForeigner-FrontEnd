import { Resume } from '@/lib/type/profile/resume';
import styles from './resumeCard.module.scss';
import {
  Badge,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  PenSquare,
  Trash2,
} from 'lucide-react';
import Button from '@/components/common/button/Button';
import { Link } from 'react-router-dom';
import useDeleteResume from '@/lib/apis/mutations/useDeleteResume';
import { useTranslation } from 'react-i18next';

interface Props {
  resume: Resume;
}

export default function ResumeCard({ resume }: Props) {
  const { t } = useTranslation('pages');
  const { mutate: deleteResume } = useDeleteResume();
  const getStatusBadge = (status: Resume['status']) => {
    switch (status) {
      case 'completed':
        return (
          <div className={styles.badgeCompleted}>
            <Badge className={styles.badge}>
              <CheckCircle2 className={styles.badgeIcon} />
            </Badge>
            {t('profile.resume.completed')}
          </div>
        );
      case 'progressing':
        return (
          <div className={styles.badgeProgressing}>
            <Badge className={styles.badge}>
              <Clock className={styles.badgeIcon} />
            </Badge>
            {t('profile.resume.inProgress')}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.leftArea}>
          <div className={styles.iconBg}>
            <FileText className={styles.icon} />
          </div>
          <div>
            <h3 className={styles.title}>{resume.title}</h3>
            <div className={styles.metaRow}>
              <span>
                {t('profile.resumePreview.updatedAt', { date: resume.updatedAt })}
              </span>
              <span>•</span>
              {getStatusBadge(resume.status)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <Link to={`/profile/resume/${resume.id}`}>
          <Button variant='outline' size='medium'>
            <Eye className={styles.buttonIcon} />
            {t('profile.component.common.preview')}
          </Button>
        </Link>
        <Link to={`/profile/resume/${resume.id}/edit`}>
          <Button variant='outline' size='medium'>
            <PenSquare className={styles.buttonIcon} />
            {t('profile.component.common.edit')}
          </Button>
        </Link>

        <Button
          variant='outline'
          size='medium'
          style={{ color: 'var(--color-red-500)' }}
          onClick={() => {
            if (confirm(t('profile.component.common.deleteConfirm'))) {
              deleteResume(resume.id);
            }
          }}
        >
          <Trash2 className={styles.buttonIcon} />
          {t('profile.component.common.delete')}
        </Button>
      </div>
    </div>
  );
}
