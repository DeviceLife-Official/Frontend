import PrimaryButton from '@/components/Button/PrimaryButton';
import PrimaryInput from '@/components/Input/PrimaryInput';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from '@/assets/logos/google.svg?react';
import AppleLogo from '@/assets/logos/apple.svg?react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { findIdSchema, type FindIdFormData } from '@/schemas/authSchema';

const FindIdPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FindIdFormData>({
    resolver: zodResolver(findIdSchema),
    mode: 'onSubmit', // 제출 시에만 검사
  });

  // 아이디 찾기 제출 핸들러
  const onSubmit = (data: FindIdFormData) => {
    // TODO: 아이디 찾기 API 호출
    console.log(data);
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
            <div className="flex flex-col w-full">
              {/* 입력창들 */}
              <div className="relative flex flex-col gap-8 mb-56">
                <PrimaryInput {...register('name')} type="text" placeholder="이름" />
                <div className="relative">
                  <PrimaryInput
                    {...register('phone')}
                    type="tel"
                    placeholder="휴대폰 번호"
                    maxLength={11}
                  />
                  {/* 에러 메시지 - 휴대폰 번호 입력창 바로 아래 gap-8 (첫 번째 에러만, absolute) */}
                  {isSubmitted && (errors.name || errors.phone) && (
                    <p className="absolute top-full mt-8 left-0 font-body-3-r text-warning">
                      {errors.name?.message || errors.phone?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 아이디 찾기 버튼 */}
              <PrimaryButton text="아이디 찾기" className="w-full bg-blue-600" />
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
            onClick={() => navigate(ROUTES.auth.signup.base)}
          >
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindIdPage;
