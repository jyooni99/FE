import { z } from 'zod';

//schema
const usernameSchema = z
  .string()
  .min(5, '아이디는 최소 5글자 이상이어야 합니다.')
  .max(20, '아이디는 최대 20글자까지 가능합니다.')
  .regex(/^[A-Za-z0-9]+$/, {
    message: '아이디는 영문 대소문자와 숫자만 사용할 수 있습니다.',
  })
  .refine((val) => !/^\d+$/.test(val), {
    message: '아이디는 숫자로만 이루어질 수 없습니다.',
  });

const passwordSchema = z
  .string()
  .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  .max(20, { message: '비밀번호는 최대 20자까지 가능합니다.' })
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/, {
    message: '비밀번호는 영문, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.',
  })
  .refine((val) => !/\s/.test(val), {
    message: '비밀번호에는 공백을 포함할 수 없습니다.',
  });

const koreanNameSchema = z
  .string()
  .min(2, '이름은 최소 2글자 이상이어야 합니다.')
  .max(20, '이름은 최대 20글자까지 가능합니다.')
  .regex(/^[가-힣]+$/, '이름 형식이 올바르지 않습니다.');

const englishNameSchema = z
  .string()
  .min(2, '이름은 최소 2글자 이상이어야 합니다.')
  .max(30, '이름은 최대 30글자까지 가능합니다.')
  .regex(/^[a-zA-Z]+$/, '이름 형식이 올바르지 않습니다.');

const nameSchema = z.union([koreanNameSchema, englishNameSchema]);

const emailSchema = z
  .string()
  .email({ message: '이메일 형식이 올바르지 않습니다.' })
  .min(1, '이메일을 입력해주세요');

const phoneSchema = z
  .string()
  .regex(/^(\d{3}-\d{3,4}-\d{4})$/, '전화번호 형식이 유효하지 않습니다.');

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
});

export const findIdSchema = z.object({
  name: nameSchema,
  email: emailSchema,
});

export const findPasswordSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
});

export const updateProfileSchema = z.object({
  name: nameSchema, // 이름 유효성 검사 (한글/영어)
  email: emailSchema, // 이메일 유효성 검사
  phone: phoneSchema, // 전화번호 유효성 검사
});

//payload
export type loginPayload = z.infer<typeof loginSchema>;
export type signUpPayload = z.infer<typeof signUpSchema>;
export type findIdPayload = z.infer<typeof findIdSchema>;
export type findPasswordPayload = z.infer<typeof findPasswordSchema>;
