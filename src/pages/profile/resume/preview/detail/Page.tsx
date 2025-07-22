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
} from 'lucide-react';
import styles from './page.module.scss';
import Button from '@/components/common/button/Button';
import useGetResumePreview from '@/lib/apis/queries/useGetResumePreview';

export default function ResumePreviewPage() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: resumePreviewData, isLoading: isResumeLoading } =
    useGetResumePreview(resumeId!);
  const serverData = resumePreviewData?.data;

  const resumeData = serverData
    ? {
        id: serverData.resumeId,
        title: serverData.jobPreference?.desiredJob + ' 이력서',
        createdAt: serverData.createdAt?.slice(0, 10) || '',
        updatedAt: serverData.updatedAt?.slice(0, 10) || '',
        status: 'completed',
        basicInfo: {
          name: '',
          email: '',
          phone: '',
          address: '',
          photo: serverData.imageUrl,
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
        attachments: [],
        links:
          serverData.portfolios?.map(p => ({
            title: '포트폴리오',
            url: p.portfolioUrl,
          })) || [],
      }
    : {
        id: resumeId,
        title: '프론트엔드 개발자 이력서',
        createdAt: '2024-03-15',
        updatedAt: '2024-03-20',
        status: 'completed',
        basicInfo: {
          name: '홍길동',
          email: 'example@email.com',
          phone: '010-1234-5678',
          address: '서울특별시 강남구',
          photo: null,
          job: 'IT/개발',
        },
        skills: [
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'HTML',
          'CSS',
          'Redux',
          'Git',
          'Responsive Design',
          'RESTful API',
        ],
        experience: [
          {
            company: '테크 솔루션즈',
            position: '프론트엔드 개발자',
            period: '2021.03 - 현재',
            description:
              'React와 Next.js를 활용한 웹 애플리케이션 개발, 사용자 인터페이스 개선 및 성능 최적화, 백엔드 개발자와 협업하여 RESTful API 연동 등의 업무를 수행했습니다.',
          },
          {
            company: '스타트업 허브',
            position: '웹 개발자',
            period: '2019.03 - 2021.02',
            description:
              'HTML, CSS, JavaScript를 활용한 웹사이트 개발, 반응형 웹 디자인 구현, jQuery 및 Bootstrap 프레임워크 활용 등의 업무를 담당했습니다.',
          },
        ],
        education: [
          {
            school: '서울대학교',
            degree: '컴퓨터공학 학사',
            period: '2015.03 - 2019.02',
            description:
              '컴퓨터 알고리즘, 데이터베이스, 웹 개발 등을 학습했으며, 졸업 프로젝트로 SNS 웹 애플리케이션을 개발했습니다.',
          },
          {
            school: '한국디지털고등학교',
            degree: '소프트웨어개발과',
            period: '2012.03 - 2015.02',
            description:
              '프로그래밍 기초와 웹 개발 기술을 배웠으며, 교내 프로그래밍 경진대회에서 우수상을 수상했습니다.',
          },
        ],
        awards: [
          {
            title: '웹 개발 경진대회 우수상',
            organization: '한국소프트웨어협회',
            date: '2020.10',
            description:
              '사용자 경험을 개선한 웹 애플리케이션 개발로 우수상 수상',
          },
          {
            title: '오픈소스 컨트리뷰션 페스티벌 참가',
            organization: '한국정보기술연구원',
            date: '2019.08',
            description:
              '오픈소스 프로젝트에 기여하는 활동에 참여하여 React 기반 라이브러리 개발에 기여',
          },
        ],
        certificates: [
          {
            name: '정보처리기사',
            organization: '한국산업인력공단',
            date: '2018.08',
            number: '18-12-123456',
          },
          {
            name: 'SQLD (SQL 개발자)',
            organization: '한국데이터산업진흥원',
            date: '2019.05',
            number: '19-05-654321',
          },
          {
            name: '리눅스마스터 2급',
            organization: '한국정보통신진흥협회',
            date: '2017.11',
            number: '17-11-789012',
          },
        ],
        attachments: [
          {
            name: '포트폴리오.pdf',
            size: '2.3MB',
            url: '#',
          },
        ],
        links: [
          {
            title: '개인 블로그',
            url: 'https://blog.example.com',
          },
          {
            title: '포트폴리오 웹사이트',
            url: 'https://portfolio.example.com',
          },
          {
            title: 'GitHub',
            url: 'https://github.com/username',
          },
          {
            title: 'LinkedIn',
            url: 'https://linkedin.com/in/username',
          },
        ],
      };

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
        </section>
      </div>
    </div>
  );
}
