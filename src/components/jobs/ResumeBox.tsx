import {
  Badge,
  Briefcase,
  Clock,
  DollarSign,
  File,
  Globe,
  GraduationCap,
  Languages,
  MapIcon,
  Medal,
  User,
} from 'lucide-react';

import { ResumeListItem } from '@/lib/apis/queries/useGetResumeList';
import dayjs from 'dayjs';
import styles from './resumeBox.module.scss';

export interface ResumeProps extends ResumeListItem {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  selected: boolean;
}

export type ResumeStatus = '작성 완료' | '작성 중';

const ResumeBox = ({
  awards,
  certificates,
  createdAt,
  educations,
  employments,
  expats,
  imageUrl,
  jobPreference,
  languages,
  portfolios,
  skills,
  updatedAt,
  onClick,
  selected,
}: ResumeProps) => {
  return (
    <div
      className={`${styles.container} ${
        selected ? styles.selected : styles.unselected
      }`}
      onClick={onClick}
    >
      <div className={styles.topBar}>
        <div className={styles.leftTab}>
          <div className={styles.userIconBox}>
            {imageUrl ? <img src={imageUrl} /> : <User size={15} />}
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.title}>이력서1</div>
            <div className={styles.desiredTap}>
              <div>
                <MapIcon size={12} />
                <span>{jobPreference.desiredLocation}</span>
              </div>
              <div>
                <DollarSign size={12} />
                <span>{jobPreference.desiredSalary}</span>
              </div>
              <div>{jobPreference.desiredEmploymentType}</div>
            </div>
          </div>
        </div>

        <div>작성완료</div>
      </div>
      <div className={styles.middleTab}>
        {employments?.length > 0 ? (
          <div>
            최근 경력 : {employments[0].companyName} - {employments[0].jobTitle}
          </div>
        ) : (
          <div>최근 경력 없음</div>
        )}
        {educations?.length > 0 ? (
          <div>
            최종 학력 : {(educations[0].educationName, educations[0].major)} -
            {educations[0].degree}
          </div>
        ) : (
          <div>최종 학력 없음</div>
        )}
      </div>
      <div className={styles.careers}>
        <div>
          <GraduationCap size={15} color='green' /> 학력 {educations.length}
        </div>
        <div>
          <Briefcase size={15} color='purple' /> 경력 {employments.length}
        </div>
        <div>
          <Badge size={15} color='orange' />
          자격증 {certificates.length}
        </div>
        <div>
          <Medal size={15} color='red' /> 수상 {awards.length}
        </div>
        <div>
          <Languages size={15} color='blue' /> 언어 {languages.length}
        </div>
        <div>
          <File size={15} color='navy' /> 포트폴리오 {portfolios.length}
        </div>
        <div>
          <Globe size={15} color='green' /> 해외경험 {expats.length}
        </div>
      </div>
      <div className={styles.skills}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.skill}>
            {skill.skillName}
          </div>
        ))}
      </div>
      <div className={styles.langInfo}>
        {languages.map((lang, index) => (
          <div key={index} className={styles.langElement}>
            {lang.languages} ({lang.proficiency})
          </div>
        ))}
      </div>
      <hr />
      <div className={styles.timeInfo}>
        <Clock size={14} />
        <div>마지막 수정 : {dayjs(updatedAt).format('YYYY.MM.DD')}</div>
        <div>생성일 : {dayjs(createdAt).format('YYYY.MM.DD')}</div>
      </div>
    </div>
  );
};

export default ResumeBox;
