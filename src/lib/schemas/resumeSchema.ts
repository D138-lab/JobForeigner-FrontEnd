import { z } from 'zod';
import { ERROR_MSG } from './error';
import { REGEX } from './regex';

const maxPhotoSize = 50 * 1024 * 1024;
void REGEX;
void maxPhotoSize;

export const resumeSchema = z.object({
  resumeTitle: z
    .string()
    .min(1, ERROR_MSG.required)
    .max(50, ERROR_MSG.exceed.fifty),

  desiredJobs: z.array(
    z.object({
      desiredJob: z.string().min(1, ERROR_MSG.required),
    }),
    // sido: z.string().min(1, ERROR_MSG.required),
    // sigungu: z.string().min(1, ERROR_MSG.required),
  ),

  educations: z.array(
    z.object({
      educationName: z.string().min(1, ERROR_MSG.required),
      major: z.string().min(1, ERROR_MSG.required),
      yearOfGraduation: z.string().min(1, ERROR_MSG.required), // YYYY-MM-DD
      degree: z.string().min(1, ERROR_MSG.required),
      graduationStatus: z.string().min(1, ERROR_MSG.required),
      etc: z.string().optional(),
    }),
  ),

  employments: z.array(
    z.object({
      companyName: z.string().min(1, ERROR_MSG.required),
      departmentName: z.string().min(1, ERROR_MSG.required),
      jobTitle: z.string().min(1, ERROR_MSG.required),
      startDate: z.string().min(1, ERROR_MSG.required), // YYYY-MM-DD
      endDate: z.string().min(1, ERROR_MSG.required),
      achievement: z.string().optional(),
    }),
  ),

  certificates: z.array(
    z.object({
      certificateName: z.string().min(1, ERROR_MSG.required),
      organization: z.string().min(1, ERROR_MSG.required),
      date: z.string().min(1, ERROR_MSG.required), // YYYY-MM-DD
    }),
  ),

  awards: z.array(
    z.object({
      awardName: z.string().min(1, ERROR_MSG.required),
      organization: z.string().min(1, ERROR_MSG.required),
      awardYear: z.string().min(1, ERROR_MSG.required), // YYYY-MM-DD
      details: z.string().optional(),
    }),
  ),

  skills: z.array(
    z.object({
      skillName: z.string().min(1, ERROR_MSG.required),
    }),
  ),

  languages: z.array(
    z.object({
      languages: z.string().min(1, ERROR_MSG.required),
      proficiency: z.string().min(1, ERROR_MSG.required),
    }),
  ),

  portfolios: z.array(
    z.object({
      portfolioTitle: z.string().min(1, ERROR_MSG.required),
      portfolioUrl: z.string().url(ERROR_MSG.url),
    }),
  ),

  jobPreference: z.object({
    desiredEmploymentType: z.string().min(1, ERROR_MSG.required),
    desiredSalary: z.coerce.number().nonnegative(),
    desiredLocation: z.string().min(1, ERROR_MSG.required),
  }),

  expat: z.array(
    z.object({
      country: z.string().min(1, ERROR_MSG.required),
      startDate: z.string().min(1, ERROR_MSG.required), // YYYY-MM-DD
      endDate: z.string().min(1, ERROR_MSG.required),
      experience: z.string().optional(),
    }),
  ),

  resumeImageUrl: z.string().optional(), // 서버에서 string으로 받는다면
});

export type ResumeValues = z.infer<typeof resumeSchema>;

export const validateResume = (formData: FormData) => {
  const formValues = Object.fromEntries(formData.entries());

  return resumeSchema.safeParse(formValues);
};
