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

interface Props {
  resume: Resume;
}

export default function ResumeCard({ resume }: Props) {
  const getStatusBadge = (status: Resume['status']) => {
    switch (status) {
      case 'completed':
        return (
          <div className={styles.badgeCompleted}>
            <Badge className={styles.badge}>
              <CheckCircle2 className={styles.badgeIcon} />
            </Badge>
            작성완료
          </div>
        );
      case 'progressing':
        return (
          <div className={styles.badgeProgressing}>
            <Badge className={styles.badge}>
              <Clock className={styles.badgeIcon} />
            </Badge>
            작성중
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.card}>
      {/* 상단 */}
      <div className={styles.cardHeader}>
        <div className={styles.leftArea}>
          <div className={styles.iconBg}>
            <FileText className={styles.icon} />
          </div>
          <div>
            <h3 className={styles.title}>{resume.title}</h3>
            <div className={styles.metaRow}>
              <span>최종 수정일: {resume.updatedAt}</span>
              <span>•</span>
              {getStatusBadge(resume.status)}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 */}
      <div className={styles.cardFooter}>
        <Button variant='outline' size='medium'>
          <Eye className={styles.buttonIcon} />
          미리보기
        </Button>
        <Button variant='outline' size='medium'>
          <PenSquare className={styles.buttonIcon} />
          수정하기
        </Button>
        <Button
          variant='outline'
          size='medium'
          style={{ color: 'var(--color-red-500)' }}
        >
          <Trash2 className={styles.buttonIcon} />
          삭제하기
        </Button>
      </div>
    </div>
  );
}
