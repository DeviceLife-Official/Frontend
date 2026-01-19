import { z } from 'zod';

// 이메일 스키마 (재사용 가능)
export const emailSchema = z.string().email('유효한 이메일을 입력하세요');

// 비밀번호 스키마 (재사용 가능)
export const passwordSchema = z
  .string()
  .min(8, '8자 이상 입력하세요')
  .max(20, '20자 이하로 입력하세요')
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, '영문과 숫자를 포함해야 합니다');

// 이름 스키마 (재사용 가능)
export const nameSchema = z
  .string()
  .min(1, '이름을 입력해주세요')
  .refine(
    (value) => /^[a-zA-Z가-힣\s]+$/.test(value),
    '한글 또는 영문만 입력 가능합니다'
  );

// 휴대폰 번호 스키마 (재사용 가능)
export const phoneSchema = z
  .string()
  .min(1, '휴대폰 번호를 입력해주세요')
  .refine(
    (value) => /^[0-9]+$/.test(value) && value.length >= 10 && value.length <= 11,
    '휴대폰 번호 형식을 확인해주세요'
  );

// 로그인 스키마
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

// 아이디 찾기 스키마
export const findIdSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
});

export type FindIdFormData = z.infer<typeof findIdSchema>;

// 비밀번호 찾기 스키마
export const findPasswordSchema = z.object({
  email: emailSchema,
});

export type FindPasswordFormData = z.infer<typeof findPasswordSchema>;

// 회원가입 - 계정 정보 스키마
export const signupAccountSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력하세요'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'], // 에러를 passwordConfirm 필드에만 표시
  });

export type SignupAccountFormData = z.infer<typeof signupAccountSchema>;

// 회원가입 - 프로필 정보 스키마
export const signupProfileSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
});

export type SignupProfileFormData = z.infer<typeof signupProfileSchema>;
