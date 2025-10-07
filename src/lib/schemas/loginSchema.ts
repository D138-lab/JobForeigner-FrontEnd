// 추후에 제거할 것

import { z } from 'zod';
import { ERROR_MSG } from './error';

export const loginSchema = z.object({
  email: z.string().email(ERROR_MSG.email).max(50, ERROR_MSG.exceed.fifty),
  password: z.string().min(8, ERROR_MSG.password.min),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const validateLogin = (formData: FormData) => {
  const formValues = Object.fromEntries(formData.entries());

  return loginSchema.safeParse(formValues);
};
