import PrimaryButton from '@/components/Button/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { findPasswordSchema, type FindPasswordFormData } from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';
import GoogleLoginButton from '@/components/Button/GoogleLoginButton';

const FindPasswordPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FindPasswordFormData>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onSubmit', // 제출 시에만 검사
  });

  // 인증번호 받기 제출 핸들러
  const onSubmit = (data: FindPasswordFormData) => {
    // TODO: 인증번호 받기 API 호출
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center gap-20">
        {/* 메인 폼 영역 */}
        <div className="flex flex-col items-center gap-56">
          {/* 로고 */}
          <p className="font-service-name text-black">Device Life</p>

          {/* 폼 컨테이너 */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col items-center gap-24 w-400"
          >
            {/* 입력 + 버튼 영역 */}
            <div className="flex flex-col gap-20 w-full">
              {/* 입력창들 */}
              <div className="flex flex-col gap-8">
                <PrimaryInput {...register('email')} type="email" placeholder="이메일(ID)" />
                {/* 에러 메시지 - 제출 시에만 표시 */}
                {isSubmitted && errors.email && (
                  <p className="font-body-3-r text-warning">{errors.email.message}</p>
                )}
              </div>
              {/* 인증번호 받기 버튼 */}
              <PrimaryButton text="인증번호 받기" className="w-full bg-blue-600" />
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

export default FindPasswordPage;
