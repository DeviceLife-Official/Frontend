import { z } from 'zod';

// 이메일 스키마 (재사용 가능)
export const emailSchema = z.string().email('유효한 이메일을 입력하세요');

// 비밀번호 스키마 (재사용 가능)
export const passwordSchema = z
  .string()
  .min(8, '8자 이상 입력하세요')
  .max(20, '20자 이하로 입력하세요')
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, '영문과 숫자를 포함해야 합니다');

// 로그인 스키마
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

// 아이디 찾기 스키마
export const findIdSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phone: z
    .string()
    .min(1, '휴대폰 번호를 입력해주세요')
    .refine(
      (value) => /^[0-9]+$/.test(value) && value.length >= 10 && value.length <= 11,
      '휴대폰 번호 형식을 확인해주세요'
    ),
});

export type FindIdFormData = z.infer<typeof findIdSchema>;

// 비밀번호 찾기 스키마
export const findPasswordSchema = z.object({
  email: emailSchema,
});

export type FindPasswordFormData = z.infer<typeof findPasswordSchema>;

// 조합명 스키마
export const combinationSchema = z.object({
  combinationName: z.string().min(1, '조합명을 입력해주세요'),
});

export type CombinationFormData = z.infer<typeof combinationSchema>;

// 온보딩 조합명 스키마
export const onboardingCombinationSchema = z.object({
  combinationName: z
    .string()
    .min(1, '조합명을 입력해주세요')
    .max(20, '조합명은 최대 20자까지 입력 가능합니다.')
    .regex(/^[가-힣a-zA-Z0-9 ]+$/, '특수문자나 이모지는 사용할 수 없습니다.')
    .refine((val) => val.trim().length > 0, '조합명을 한 글자 이상 입력해주세요.'),
});

export type OnboardingCombinationFormData = z.infer<typeof onboardingCombinationSchema>;
