import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import Checkbox from '@/assets/icons/checkbox.svg?react';
import CheckboxOn from '@/assets/icons/checkbox_on.svg?react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import GoogleLoginButton from '@/components/Button/GoogleLoginButton';
import { usePostLogin } from '@/apis/auth/postLogin';
import { useQueryClient } from '@tanstack/react-query';
import { finalizeLogin } from '@/utils/auth/finalizeLogin';

const LoginPage = () => {
  const navigate = useNavigate();
  const [keepLogin, setKeepLogin] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [loginError, setLoginError] = useState<string>('');

  // 로그인 폼 상태 관리
  const {
    register, // input과 폼 연결하는 함수
    handleSubmit, // 폼 제출 처리 함수
    formState: { errors, isValid }, // errors: 에러 메시지, isValid: 폼 유효 여부
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // zod 스키마로 검사해줘!
    mode: 'onChange', // 입력할 때마다 검사
  });

  // 비밀번호 입력 필드 등록
  const passwordRegister = register('password');

  // 로그인 API 훅
  const { mutateAsync: login, isPending } = usePostLogin();

  // React Query 클라이언트
  const queryClient = useQueryClient();

  // 로그인 제출 핸들러
  const onSubmit = async (data: LoginFormData) => {
    setLoginError('');

    try {
      // 1. 로그인 API 호출
      const response = await login({
        email: data.email,
        password: data.password,
      });

      // 2. 토큰 저장 및 유저 정보 캐시
      if (response.result) {
        try {
          await finalizeLogin(
            response.result.accessToken,
            response.result.refreshToken,
            queryClient
          );

          // 3. 라우팅 - 홈(/) 또는 원래 가려던 페이지로 이동
          navigate(ROUTES.home, { replace: true });
        } catch (error) {
          // 유저 정보 조회 실패 시 알림 및 현재 페이지 유지
          alert('유저 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      }
    } catch (error: any) {
      // 로그인 실패 시 에러 메시지 표시
      setLoginError('아이디 또는 비밀번호를 확인해주세요.');
    }
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
                <PrimaryInput
                  {...register('email', {
                    onChange: () => {
                      setLoginError('');
                    },
                  })}
                  type="email"
                  placeholder="이메일"
                />
                <div className="flex flex-col gap-4">
                  <PrimaryInput
                    {...passwordRegister}
                    type="password"
                    placeholder="비밀번호"
                    maxLength={20}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      setIsCapsLockOn(e.getModifierState('CapsLock'));
                    }}
                    onChange={(e) => {
                      passwordRegister.onChange(e);
                      setLoginError('');
                    }}
                  />
                  {(errors.password || isCapsLockOn || loginError) && (
                    <p className="font-body-3-r text-warning">
                      {errors.password?.message ||
                        (isCapsLockOn ? 'Caps Lock이 켜져 있습니다.' : '') ||
                        loginError}
                    </p>
                  )}
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
              </div>

              {/* 로그인 버튼 */}
              <PrimaryButton
                text="로그인"
                className={`w-full bg-blue-600 ${isValid && !isPending ? 'hover:bg-blue-500' : ''}`}
                disabled={!isValid || isPending}
              />
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
        <GoogleLoginButton className="w-200 h-46" />

        {/* 회원가입 안내 */}
        <div className="flex items-center gap-16 font-body-2-r text-gray-400">
          <span>아직 Device Life 회원이 아니신가요?</span>
          <button
            type="button"
            className="underline underline-offset-4 cursor-pointer"
            onClick={() => navigate(ROUTES.auth.signup.base)}
          >
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
