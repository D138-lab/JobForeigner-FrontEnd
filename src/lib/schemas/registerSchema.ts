import { z } from 'zod';
import { ERROR_MSG } from './error';
import { REGEX } from './regex';

export const registerSchema = z
  .object({
    email: z.string().email(ERROR_MSG.email).max(50, ERROR_MSG.exceed.fifty),
    password: z.string().min(8, ERROR_MSG.password.min),
    passwordConfirm: z.string().min(8, ERROR_MSG.password.min),
    name: z
      .string()
      .min(1, ERROR_MSG.required)
      .max(30, ERROR_MSG.exceed.thirty),
    username: z
      .string()
      .min(1, ERROR_MSG.required)
      .max(30, ERROR_MSG.exceed.thirty),
    gender: z.string().min(1, ERROR_MSG.required),
    phoneNumber: z
      .string()
      .min(1, ERROR_MSG.required)
      .regex(REGEX.phoneNumber, ERROR_MSG.phoneNumber),
    birthDate: z.string().min(1, ERROR_MSG.required),
    address: z.string().min(1, ERROR_MSG.required),
    detailAddress: z.string().min(1, ERROR_MSG.required),
    zipcode: z.string().min(1, ERROR_MSG.required),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export type RegisterValues = z.infer<typeof registerSchema>;

export const validateRegister = (formData: FormData) => {
  const formValues = Object.fromEntries(formData.entries());

  return registerSchema.safeParse(formValues);
};
