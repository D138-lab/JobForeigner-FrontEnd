import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Printer,
  Globe,
  Calendar,
  GraduationCap,
  Award,
  FileText,
  User,
  Building2,
  Bookmark,
  BadgeIcon as Certificate,
  Paperclip,
  Plane,
  Wallet,
  MapPin,
} from 'lucide-react';
import styles from './page.module.scss';
import Button from '@/components/common/button/Button';
import useGetResumePreview from '@/lib/apis/queries/useGetResumePreview';
import { PATH } from '@/lib/constants/routes';

export default function ResumePreviewPage() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: resumePreviewData,
    isLoading: isResumeLoading,
    error,
    isError,
  } = useGetResumePreview(resumeId!);
  const serverData = resumePreviewData?.data;

  if (isError) {
    const anyError = error as any;
    const status = anyError?.response?.status || anyError?.status;
    if (status === 404) {
      navigate(PATH.NOT_FOUND, { replace: true });
      return null;
    }
  }

  const resumeData = serverData
    ? {
        id: serverData.resumeId,
        title: serverData.jobPreference?.desiredJob + ' 이력서',
        createdAt: serverData.createdAt?.slice(0, 10) || '',
        updatedAt: serverData.updatedAt?.slice(0, 10) || '',
        status: 'completed',
        basicInfo: {
          name: serverData.memberProfile?.name || '',
          email: serverData.memberProfile?.email || '',
          phone: serverData.memberProfile?.phoneNumber || '',
          address: serverData.memberProfile?.address?.address || '',
          photo:
            serverData.memberProfile?.profile_image_url || serverData.imageUrl,
          job: serverData.jobPreference?.desiredJob || '',
        },
        skills: serverData.skills?.map(s => s.skillName) || [],
        experience:
          serverData.employments?.map(e => ({
            company: e.companyName,
            position: e.jobTitle,
            period: `${e.startDate?.slice(0, 10) || ''} - ${
              e.endDate?.slice(0, 10) || ''
            }`,
            description: e.achievement,
          })) || [],
        education:
          serverData.educations?.map(ed => ({
            school: ed.educationName,
            degree: ed.degree,
            period: ed.yearOfGraduation,
            description: ed.etc,
          })) || [],
        awards:
          serverData.awards?.map(a => ({
            title: a.awardName,
            organization: a.organization,
            date: a.awardYear,
            description: a.details,
          })) || [],
        certificates:
          serverData.certificates?.map(c => ({
            name: c.certificateName,
            organization: c.organization,
            date: c.date,
            number: '',
          })) || [],
        attachments: [] as any[],
        links:
          serverData.portfolios?.map(p => ({
            title: '포트폴리오',
            url: p.portfolioUrl,
          })) || [],
      }
    : null;

  if (!isResumeLoading && !serverData) {
    // 데이터가 없고, 로딩 중도 아니면 아무것도 렌더링하지 않음
    return null;
  }
  if (!resumeData) return null;

  const handlePrint = () => window.print();
  const handleDownloadPDF = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('PDF가 다운로드되었습니다.');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <div className={styles.actions}>
          <Button variant='outline' onClick={() => navigate(-1)}>
            <span className={styles.buttonContent}>
              <ArrowLeft /> 돌아가기
            </span>
          </Button>
          <div className={styles.actionButtons}>
            <Button variant='outline' onClick={handlePrint}>
              <span className={styles.buttonContent}>
                <Printer /> 인쇄하기
              </span>
            </Button>
            <Button onClick={handleDownloadPDF} disabled={isLoading}>
              <span className={styles.buttonContent}>
                <Download /> {isLoading ? '다운로드 중...' : 'PDF 다운로드'}
              </span>
            </Button>
          </div>
        </div>

        <section ref={resumeRef} className={styles.previewArea}>
          <div className={styles.header}>
            <div className={styles.left}>
              <h1>{resumeData.title}</h1>
              <p>최종 수정일: {resumeData.updatedAt}</p>
            </div>
            <span className={styles.badge}>작성 완료</span>
          </div>

          {/* 기본 정보 */}
          <div>
            <div className={styles.sectionTitle}>
              <User className={styles.titleIcon} /> <h2>기본 정보</h2>
            </div>
            <div className={styles.basicGrid}>
              <div className={styles.photoWrapper}>
                {resumeData.basicInfo.photo ? (
                  <img
                    src={resumeData.basicInfo.photo}
                    alt={resumeData.basicInfo.name}
                    className={styles.photo}
                  />
                ) : (
                  <div className={styles.placeholder} />
                )}
              </div>
              <div className={styles.basicDetails}>
                <div className={styles.basicInfoColumn}>
                  <div className={styles.basicInfoItem}>
                    <span className={styles.name}>이름</span>
                    <span className={styles.value}>
                      {resumeData.basicInfo.name}
                    </span>
                  </div>
                  <div className={styles.basicInfoItem}>
                    <span className={styles.name}>이메일</span>
                    <span className={styles.value}>
                      {resumeData.basicInfo.email}
                    </span>
                  </div>
                  <div className={styles.basicInfoItem}>
                    <span className={styles.name}>전화번호</span>
                    <span className={styles.value}>
                      {resumeData.basicInfo.phone}
                    </span>
                  </div>
                </div>

                <div className={styles.basicInfoColumn}>
                  <div className={styles.basicInfoItem}>
                    <span className={styles.name}>주소</span>
                    <span className={styles.value}>
                      {resumeData.basicInfo.address}
                    </span>
                  </div>
                  <div className={styles.basicInfoItem}>
                    <span className={styles.name}>직종</span>
                    <span className={styles.value}>
                      {resumeData.basicInfo.job}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 업무 및 스킬 */}
          <div>
            <div className={styles.sectionTitle}>
              <Bookmark className={styles.titleIcon} /> <h2>업무 및 스킬</h2>
            </div>
            {resumeData.skills.length > 0 ? (
              <ul className={styles.skillsList}>
                {resumeData.skills.map((skill, index) => (
                  <li key={index} className={styles.skillItem}>
                    <span className={styles.skillName}>{skill}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noSkills}>등록된 업무 및 스킬이 없습니다.</p>
            )}
          </div>

          {/* 경력 */}
          <div>
            <div className={styles.sectionTitle}>
              <Building2 className={styles.titleIcon} /> <h2>경력</h2>
            </div>
            {resumeData.experience.length > 0 ? (
              <ul className={styles.experienceList}>
                {resumeData.experience.map((item, index) => (
                  <li key={index} className={styles.experienceItem}>
                    <div className={styles.experienceHeader}>
                      <h3 className={styles.experienceCompany}>
                        {item.company}
                      </h3>
                      <span className={styles.experiencePeriod}>
                        <Calendar />
                        {item.period}
                      </span>
                    </div>
                    <p className={styles.experiencePosition}>{item.position}</p>
                    <p className={styles.experienceDescription}>
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noExperience}>등록된 경력이 없습니다.</p>
            )}
          </div>

          {/* 학력 */}
          <div>
            <div className={styles.sectionTitle}>
              <GraduationCap className={styles.titleIcon} /> <h2>학력</h2>
            </div>
            {resumeData.education.length > 0 ? (
              <ul className={styles.educationList}>
                {resumeData.education.map((item, index) => (
                  <li key={index} className={styles.educationItem}>
                    <div className={styles.educationHeader}>
                      <h3 className={styles.educationCompany}>{item.school}</h3>
                      <span className={styles.educationPeriod}>
                        <Calendar />
                        {item.period}
                      </span>
                    </div>
                    <p className={styles.educationPosition}>{item.degree}</p>
                    <p className={styles.educationDescription}>
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noEducation}>등록된 경력이 없습니다.</p>
            )}
          </div>

          {/* 활동 및 수상 */}
          <div>
            <div className={styles.sectionTitle}>
              <Award className={styles.titleIcon} /> <h2>활동 및 수상</h2>
            </div>
            {resumeData.awards.length > 0 ? (
              <ul className={styles.awardsList}>
                {resumeData.awards.map((item, index) => (
                  <li key={index} className={styles.awardItem}>
                    <div className={styles.awardHeader}>
                      <div className={styles.awardDetail}>
                        <h3 className={styles.awardTitle}>{item.title}</h3>
                        <p className={styles.awardOrganization}>
                          {item.organization}
                        </p>
                      </div>
                      <span className={styles.awardDate}>
                        <Calendar />
                        {item.date}
                      </span>
                    </div>
                    <p className={styles.awardDescription}>
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noAwards}>등록된 수상 내역이 없습니다.</p>
            )}
          </div>

          {/* 자격증 */}
          <div>
            <div className={styles.sectionTitle}>
              <Certificate className={styles.titleIcon} /> <h2>자격증</h2>
            </div>
            <div className={styles.certificationList}>
              {resumeData.certificates.length > 0 ? (
                <>
                  {resumeData.certificates.map((item, index) => (
                    <div key={index} className={styles.certificateItem}>
                      <h3 className={styles.certificateName}>{item.name}</h3>
                      <p className={styles.certificateOrganization}>
                        {item.organization}
                      </p>
                      <span className={styles.certificateDate}>
                        <Calendar />
                        {item.date}
                      </span>
                      <p className={styles.certificateNumber}>
                        자격증 번호: {item.number}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <p className={styles.noCertificates}>
                  등록된 자격증이 없습니다.
                </p>
              )}
            </div>
          </div>

          {/* 첨부 파일 */}
          <div>
            <div className={styles.sectionTitle}>
              <Paperclip className={styles.titleIcon} />{' '}
              <h2>첨부 파일 및 링크</h2>
            </div>
            {resumeData.attachments.length > 0 && (
              <ul className={styles.attachmentsList}>
                <h3 className={styles.attachmentsTitle}>첨부파일</h3>
                {resumeData.attachments.map((item, index) => (
                  <li key={index} className={styles.attachmentItem}>
                    <a href={item.url} className={styles.attachmentLink}>
                      <FileText />
                      {item.name} ({item.size})
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {resumeData.links.length > 0 && (
              <ul className={styles.linksList}>
                <h3 className={styles.linksTitle}>링크</h3>
                {resumeData.links.map((item, index) => (
                  <li key={index} className={styles.linkItem}>
                    <a href={item.url} className={styles.linkLink}>
                      <Globe />
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 언어 */}
          <div className={styles.languagesSection}>
            <div className={styles.sectionTitle}>
              <Globe className={styles.titleIcon} /> <h2>언어</h2>
            </div>
            {serverData?.languages && serverData.languages.length > 0 ? (
              <ul className={styles.languagesList}>
                {serverData.languages.map((lang, idx) => (
                  <li key={idx} className={styles.languageItem}>
                    <span className={styles.languageName}>
                      {lang.languages}
                    </span>
                    <span className={styles.languageProficiency}>
                      ({lang.proficiency})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noSkills}>등록된 언어 정보가 없습니다.</p>
            )}
          </div>

          {/* 해외경험 */}
          <div className={styles.expatsSection}>
            <div className={styles.sectionTitle}>
              <Plane className={styles.titleIcon} /> <h2>해외 경험</h2>
            </div>
            {serverData?.expats && serverData.expats.length > 0 ? (
              <ul className={styles.expatsList}>
                {serverData.expats.map((expat, idx) => (
                  <li key={idx} className={styles.expatItem}>
                    <div className={styles.expatHeader}>
                      <span className={styles.expatCountry}>
                        {expat.country}
                      </span>
                      <span className={styles.expatPeriod}>
                        <Calendar />
                        {expat.startDate?.slice(0, 10) || ''} -{' '}
                        {expat.endDate?.slice(0, 10) || ''}
                      </span>
                    </div>
                    <p className={styles.expatDescription}>
                      {expat.experience}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noExperience}>
                등록된 해외 경험이 없습니다.
              </p>
            )}
          </div>

          {/* 희망 근무 조건 */}
          <div className={styles.preferenceSection}>
            <div className={styles.sectionTitle}>
              <Wallet className={styles.titleIcon} /> <h2>희망 근무 조건</h2>
            </div>
            {serverData?.jobPreference ? (
              <div className={styles.preferenceList}>
                <div className={styles.preferenceItem}>
                  <Bookmark className={styles.titleIcon} />
                  <span className={styles.preferenceLabel}>희망 직무</span>
                  <span className={styles.preferenceValue}>
                    {serverData.jobPreference.desiredJob}
                  </span>
                </div>
                <div className={styles.preferenceItem}>
                  <Wallet className={styles.titleIcon} />
                  <span className={styles.preferenceLabel}>희망 연봉</span>
                  <span className={styles.preferenceValue}>
                    {serverData.jobPreference.desiredSalary?.toLocaleString()}원
                  </span>
                </div>
                <div className={styles.preferenceItem}>
                  <MapPin className={styles.titleIcon} />
                  <span className={styles.preferenceLabel}>희망 근무지역</span>
                  <span className={styles.preferenceValue}>
                    {serverData.jobPreference.desiredLocation}
                  </span>
                </div>
                <div className={styles.preferenceItem}>
                  <Bookmark className={styles.titleIcon} />
                  <span className={styles.preferenceLabel}>고용 형태</span>
                  <span className={styles.preferenceValue}>
                    {serverData.jobPreference.desiredEmploymentType}
                  </span>
                </div>
              </div>
            ) : (
              <p className={styles.noSkills}>
                등록된 희망 근무 조건이 없습니다.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
