import BasicInfo from '@/components/profile/resume/create/BasicInfo';
import styles from '../create/page.module.scss';
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
import { useNavigate, useParams } from 'react-router-dom';

import { z } from 'zod';
import usePatchResume from '@/lib/apis/mutations/usePatchResume';
import useGetResumePreview from '@/lib/apis/queries/useGetResumePreview';
import { useEffect } from 'react';

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

export default function EditResumePage() {
  void AddressInfo;
  void IntroductionInfo;
  void FilesInfo;
  const { id } = useParams();
  const { data, isLoading } = useGetResumePreview(id ?? '');
  void isLoading;
  const { mutate: patchResume } = usePatchResume();
  // TODO: id로 이력서 상세 데이터 fetch 후 defaultValues에 반영
  const formState = useForm<ResumeFormType>({
    defaultValues,
    resolver: zodResolver(resumeSchema),
  });

  useEffect(() => {
    if (data?.data) {
      const {
        resumeTitle,
        desiredJobs,
        employments,
        educations,
        certificates,
        awards,
        skills,
        languages,
        portfolios,
        jobPreference,
        expats,
        imageUrl,
      } = data.data;

      formState.reset({
        resumeTitle,
        desiredJobs,
        employments,
        educations,
        certificates,
        awards,
        skills,
        languages,
        portfolios,
        jobPreference,
        expat: expats,
        resumeImageUrl: imageUrl ?? '',
      });
    }
  }, [data?.data]);

  const navigate = useNavigate();
  // TODO: usePatchResume 등 실제 수정 API 연결 필요
  const onSubmit = async (data: ResumeFormType) => {
    if (!id) return;

    patchResume(
      {
        resumeId: Number(id),
        body: data,
      },
      {
        onSuccess: () => {
          navigate('/profile/resume');
        },
        onError: error => {
          console.error('이력서 수정 실패:', error);
        },
      },
    );
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
          {/* 파일 첨부 <FilesInfo /> */}

          <LinkInfo />
          {/* 자기 소개 <IntroductionInfo /> */}
          <BottomActions />
        </form>
      </FormProvider>
    </div>
  );
}
