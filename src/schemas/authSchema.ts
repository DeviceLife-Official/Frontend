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
    .regex(/^[0-9]+$/, '숫자만 입력해주세요')
    .min(10, '휴대폰 번호는 10자리 이상이어야 합니다')
    .max(11, '휴대폰 번호는 11자리 이하여야 합니다'),
});

export type FindIdFormData = z.infer<typeof findIdSchema>;
