import BasicInfo from '@/components/profile/resume/create/BasicInfo';
import styles from './page.module.scss';
import BottomActions from '@/components/profile/resume/create/BottomActions';
import AddressInfo from '@/components/profile/resume/create/AddressInfo';
import JobInfo from '@/components/profile/resume/create/JobInfo';
import SkillsInfo from '@/components/profile/resume/create/SkillsInfo';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resumeSchema } from '@/lib/schemas/resumeSchema';
import ExperienceInfo from '@/components/profile/resume/create/EmploymentInfo';
import EducationInfo from '@/components/profile/resume/create/EducationInfo';
import AwardsInfo from '@/components/profile/resume/create/AwardsInfo';
import CertificatesInfo from '@/components/profile/resume/create/CertificatesInfo';
import LinkInfo from '@/components/profile/resume/create/LinkInfo';
import IntroductionInfo from '@/components/profile/resume/create/IntroductionInfo';
import FilesInfo from '@/components/profile/resume/create/FilesInfo';
import JobPreferenceInfo from '@/components/profile/resume/create/JobPreferenceInfo';
import ExpatInfo from '@/components/profile/resume/create/ExpatInfo';
import LanguageInfo from '@/components/profile/resume/create/LanguageInfo';
import { useNavigate } from 'react-router-dom';

import usePostResume, {
  PostResumeRequest,
} from '@/lib/apis/mutations/usePostResume';

import { z } from 'zod';

type ResumeFormType = z.infer<typeof resumeSchema>;

const defaultValues = {
  resumeTitle: '',
  desiredJobs: [],
  employments: [],
  educations: [],
  certificates: [],
  awards: [],
  skills: [],
  languages: [],
  portfolios: [],
  jobPreference: {
    desiredEmploymentType: '',
    desiredSalary: 0,
    desiredLocation: '',
  },
  expat: [],
  resumeImageUrl: '',
};

export default function CreateResumePage() {
  const formState = useForm({
    defaultValues,
    resolver: zodResolver(resumeSchema),
  });
  const navigate = useNavigate();
  const { mutate: postResume } = usePostResume();

  const onSubmit = async (data: ResumeFormType) => {
    console.log(JSON.stringify(data, null, 2));
    postResume(data as PostResumeRequest, {
      onSuccess: () => {
        navigate('/profile/resume');
      },
    });
  };

  const onError = (error: unknown) => {
    console.error(error);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>새 이력서 작성</h1>
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
          {/* 파일 첨부 <FilesInfo /> */}

          <LinkInfo />
          {/* 자기 소개 <IntroductionInfo /> */}
          <BottomActions />
        </form>
      </FormProvider>
    </div>
  );
}
