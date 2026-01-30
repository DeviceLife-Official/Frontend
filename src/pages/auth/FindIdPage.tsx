import { useState } from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';
import PrimaryInput from '@/components/Input/PrimaryInput';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { findIdSchema, type FindIdFormData } from '@/schemas/authSchema';
import GoogleLoginButton from '@/components/Button/GoogleLoginButton';
import { usePostFindId } from '@/apis/findCredential/postFindId';

const FindIdPage = () => {
  const navigate = useNavigate();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { mutateAsync: findId, isPending } = usePostFindId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindIdFormData>({
    resolver: zodResolver(findIdSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange', // 한 번 제출 후에는 입력 시마다 재검사
  });

  // 아이디 찾기 제출 핸들러 (유효할 때만 호출)
  const onSubmitValid = async (data: FindIdFormData) => {
    try {
      const response = await findId({
        username: data.name,
        phoneNumber: data.phone,
      });

      // 아이디 찾기 성공
      navigate(ROUTES.auth.findIdResult, {
        state: {
          success: true,
          email: response.result?.emailInfo,
        },
      });
    } catch (error: unknown) {
      // axios 에러에서 응답 데이터 확인
      const axiosError = error as { response?: { data?: { success?: boolean } } };

      // API 응답이 있는 경우 (4xx 에러 등) → 실패 화면으로 이동
      if (axiosError.response?.data) {
        navigate(ROUTES.auth.findIdResult, {
          state: {
            success: false,
            email: null,
          },
        });
        return;
      }

      // 네트워크 오류 등 응답 자체가 없는 경우 → alert
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  // 유효성 검사 실패 시 한 번이라도 제출했음을 표시 → 이후 실시간 검사
  const onSubmitInvalid = () => {
    setHasSubmitted(true);
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
            onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}
            className="flex flex-col items-center gap-24 w-400"
          >
            {/* 입력 + 버튼 영역 */}
            <div className="flex flex-col w-full">
              {/* 입력창들 */}
              <div className="flex flex-col gap-8 mb-56">
                {/* 이름 */}
                <div className="flex flex-col gap-8">
                  <PrimaryInput {...register('name')} type="text" placeholder="이름" />
                  {hasSubmitted && errors.name && (
                    <p className="font-body-3-r text-warning">{errors.name.message}</p>
                  )}
                </div>
                {/* 휴대폰 번호 */}
                <div className="flex flex-col gap-8">
                  <PrimaryInput
                    {...register('phone')}
                    type="tel"
                    placeholder="휴대폰 번호"
                    maxLength={11}
                  />
                  {hasSubmitted && errors.phone && (
                    <p className="font-body-3-r text-warning">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* 아이디 찾기 버튼 */}
              <PrimaryButton
                text={isPending ? '조회 중...' : '아이디 찾기'}
                className="w-full bg-blue-600 hover:bg-blue-500"
                disabled={isPending}
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

export default FindIdPage;
