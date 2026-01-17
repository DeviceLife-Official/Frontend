import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import Checkbox from '@/assets/icons/checkbox.svg?react';
import CheckboxOn from '@/assets/icons/checkbox_on.svg?react';
import GoogleLogo from '@/assets/logos/google.svg?react';
import AppleLogo from '@/assets/logos/apple.svg?react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const LoginPage = () => {
  const navigate = useNavigate();
  const [keepLogin, setKeepLogin] = useState(false);

  // 로그인 폼 상태 관리
  const {
    register, // input과 폼 연결하는 함수
    handleSubmit, // 폼 제출 처리 함수
    formState: { isValid }, // 폼이 유효한지 (true/false)
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // zod 스키마로 검사해줘!
    mode: 'onChange', // 입력할 때마다 검사
  });

  // 로그인 제출 핸들러
  const onSubmit = (data: LoginFormData) => {
    // TODO: 로그인 API 호출
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center gap-20">
        {/* 메인 폼 영역 */}
        <div className="flex flex-col items-center gap-28">
          {/* 로고 */}
          <p className="font-service-name text-black">Device Life</p>

          {/* 폼 컨테이너 */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-24 w-400"
          >
            {/* 입력 + 버튼 영역 */}
            <div className="flex flex-col gap-20 w-full">
              {/* 입력창들 */}
              <div className="flex flex-col gap-8">
                <PrimaryInput {...register('email')} type="email" placeholder="이메일" />
                <PrimaryInput
                  {...register('password')}
                  type="password"
                  placeholder="비밀번호"
                  maxLength={20}
                />
              </div>

              {/* 체크박스 */}
              <button
                type="button"
                onClick={() => setKeepLogin(!keepLogin)}
                className="flex items-center gap-8 cursor-pointer"
              >
                {keepLogin ? <CheckboxOn className="size-26" /> : <Checkbox className="size-26" />}
                <span className="font-body-2-r text-gray-400">로그인 상태 유지</span>
              </button>

              {/* 로그인 버튼 */}
              <PrimaryButton text="로그인" className="w-full bg-blue-600" disabled={!isValid} />
            </div>

            {/* 아이디/비밀번호 찾기 */}
            <div className="flex items-center gap-16 font-body-2-r text-gray-400">
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => navigate(ROUTES.auth.findId)}
              >
                아이디 찾기
              </button>
              <span>|</span>
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => navigate(ROUTES.auth.findPassword)}
              >
                비밀번호 찾기
              </button>
            </div>
          </form>
        </div>

        {/* 소셜 로그인 */}
        <div className="flex items-center gap-40">
          <button type="button" className="cursor-pointer">
            <GoogleLogo className="size-50" />
          </button>
          <button type="button" className="cursor-pointer">
            <AppleLogo className="size-50" />
          </button>
        </div>

        {/* 회원가입 안내 */}
        <div className="flex items-center gap-16 font-body-2-r text-gray-400">
          <span>아직 Device Life 회원이 아니신가요?</span>
          <button
            type="button"
            className="underline underline-offset-4 cursor-pointer"
            onClick={() => navigate(ROUTES.auth.signup)}
          >
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
