import { ERROR_MSG } from './error';
import { z } from 'zod';

export const userProfileEditSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, { message: ERROR_MSG.required })
    .regex(/^\d{3}-\d{4}-\d{4}$/, { message: ERROR_MSG.phoneNumber }),
  email: z
    .string()
    .min(1, { message: ERROR_MSG.required })
    .email({ message: ERROR_MSG.email }),
  address: z.string().min(1, { message: ERROR_MSG.required }),
  detailAddress: z.string().optional(),
  zipcode: z.string().min(1, { message: ERROR_MSG.required }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: ERROR_MSG.required })
    .email({ message: ERROR_MSG.email }),
  password: z.string().min(1, { message: ERROR_MSG.required }),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const validateLogin = (formData: FormData) => {
  const formValues = Object.fromEntries(formData.entries());

  return loginSchema.safeParse(formValues);
};
