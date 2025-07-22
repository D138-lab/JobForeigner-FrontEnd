import { useParams } from 'react-router-dom';
import styles from './page.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resumeSchema } from '@/lib/schemas/resumeSchema';
import useGetResumePreview, {
  ResumePreviewItem,
} from '@/lib/apis/queries/useGetResumePreview';

import BasicInfo from '@/components/profile/resume/create/BasicInfo';
import JobInfo from '@/components/profile/resume/create/JobInfo';
import SkillsInfo from '@/components/profile/resume/create/SkillsInfo';
import JobPreferenceInfo from '@/components/profile/resume/create/JobPreferenceInfo';
import EducationInfo from '@/components/profile/resume/create/EducationInfo';
import ExperienceInfo from '@/components/profile/resume/create/ExperienceInfo';
import CertificatesInfo from '@/components/profile/resume/create/CertificatesInfo';
import AwardsInfo from '@/components/profile/resume/create/AwardsInfo';
import ExpatInfo from '@/components/profile/resume/create/ExpatInfo';
import LanguageInfo from '@/components/profile/resume/create/LanguageInfo';
import LinkInfo from '@/components/profile/resume/create/LinkInfo';
import IntroductionInfo from '@/components/profile/resume/create/IntroductionInfo';
import BottomActions from '@/components/profile/resume/create/BottomActions';
import { ResumeValues } from '@/lib/schemas/resumeSchema';

function convertPreviewToFormValues(data: ResumePreviewItem) {
  return {
    title: data.resumeTitle || '',
    name: data.memberProfile?.name || '',
    email: data.memberProfile?.email || '',
    phoneNumber: data.memberProfile?.phoneNumber || '',
    photo: null,
    sido: data.memberProfile?.address?.address || '',
    sigungu: data.memberProfile?.address?.detailAddress || '',
    job:
      data.desiredJobs && data.desiredJobs.length > 0
        ? data.desiredJobs[0].desiredJob
        : '',
    employmentType: data.jobPreference?.desiredEmploymentType || 'ANY',
    desiredSalary: data.jobPreference?.desiredSalary || '',
    workLocation: data.jobPreference?.desiredLocation || '',
    skills: (data.skills || []).map(s => s.skillName),
    experiences: (data.employments || []).map(e => ({
      name: e.companyName || '',
      spot: e.departmentName || '',
      period: `${e.startDate || ''} ~ ${e.endDate || ''}`,
      mainTask: e.achievement || '',
    })),
    educations: (data.educations || []).map(e => ({
      educationName: e.educationName || '',
      major: e.major || '',
      degree: e.degree || '',
      period: `${e.yearOfGraduation || ''} (${e.graduationStatus || ''})`,
      description: e.etc || '',
    })),
    awards: (data.awards || []).map(a => ({
      name: a.awardName || '',
      organization: a.organization || '',
      date: a.awardYear || '',
      description: a.details || '',
    })),
    certificates: (data.certificates || []).map(c => ({
      name: c.certificateName || '',
      organization: c.organization || '',
      date: c.date || '',
      //number: '',
    })),
    files: [],
    links: (data.portfolios || []).map(p => ({
      title: p.portfolioTitle || '',
      url: p.portfolioUrl || '',
    })),
    //introduction: '',
    expats: data.expats || [],
    languages: (data.languages || []).map(l => ({
      language: l.languages,
      proficiency: l.proficiency,
    })),
  };
}

export default function EditResumePage() {
  const { resumeId } = useParams();
  const { data, isLoading, isError } = useGetResumePreview(resumeId || '');

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !data?.data)
    return <div>이력서 정보를 불러올 수 없습니다.</div>;

  const formState = useForm<ResumeValues>({
    defaultValues: convertPreviewToFormValues(data.data),
    resolver: zodResolver(resumeSchema),
  });

  const onSubmit = async (formData: unknown) => {
    // 수정 API 호출
    console.log('수정 데이터:', formData);
  };

  const onError = (error: unknown) => {
    console.error(error);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>이력서 수정</h1>
        <p>* 표시는 필수 입력 항목입니다</p>
      </div>
      <FormProvider {...formState}>
        <form
          onSubmit={formState.handleSubmit(onSubmit, onError)}
          className={styles.contentSection}
        >
          <BasicInfo />
          <JobInfo />
          <SkillsInfo />
          <JobPreferenceInfo />
          <EducationInfo />
          <ExperienceInfo />
          <CertificatesInfo />
          <AwardsInfo />
          <ExpatInfo />
          <LanguageInfo />
          <LinkInfo />
          <BottomActions />
        </form>
      </FormProvider>
    </div>
  );
}
