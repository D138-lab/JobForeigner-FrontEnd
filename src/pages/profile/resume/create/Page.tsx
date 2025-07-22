import BasicInfo from '@/components/profile/resume/create/BasicInfo';
import styles from './page.module.scss';
import BottomActions from '@/components/profile/resume/create/BottomActions';
import AddressInfo from '@/components/profile/resume/create/AddressInfo';
import JobInfo from '@/components/profile/resume/create/JobInfo';
import SkillsInfo from '@/components/profile/resume/create/SkillsInfo';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resumeSchema } from '@/lib/schemas/resumeSchema';
import ExperienceInfo from '@/components/profile/resume/create/ExperienceInfo';
import EducationInfo from '@/components/profile/resume/create/EducationInfo';
import AwardsInfo from '@/components/profile/resume/create/AwardsInfo';
import CertificatesInfo from '@/components/profile/resume/create/CertificatesInfo';
import LinkInfo from '@/components/profile/resume/create/LinkInfo';
import IntroductionInfo from '@/components/profile/resume/create/IntroductionInfo';
import FilesInfo from '@/components/profile/resume/create/FilesInfo';
import JobPreferenceInfo from '@/components/profile/resume/create/JobPreferenceInfo';
import ExpatInfo from '@/components/profile/resume/create/ExpatInfo';
import LanguageInfo from '@/components/profile/resume/create/LanguageInfo';

const defaultValues = {
  title: '',
  name: '',
  email: '',
  phoneNumber: '',
  photo: null,
  sido: '',
  sigungu: '',
  job: '',
  employmentType: 'ANY',
  desiredSalary: '',
  workLocation: '',
  skills: [],
  experiences: [],
  educations: [],
  awards: [],
  certificates: [],
  expats: [],
  languages: [],
  files: [],
  links: [],
  introduction: '',
};

export default function CreateResumePage() {
  const formState = useForm({
    defaultValues,
    resolver: zodResolver(resumeSchema),
  });

  const onSubmit = async (data: unknown) => {
    console.log(data);
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
          {/* 주소 정보 <AddressInfo />*/}
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
