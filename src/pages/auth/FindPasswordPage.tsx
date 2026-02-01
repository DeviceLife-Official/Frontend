import PrimaryButton from '@/components/Button/PrimaryButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { findPasswordSchema, type FindPasswordFormData } from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';

const FindPasswordPage = () => {
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
      <div className="flex flex-col items-center gap-12">
        {/* 메인 폼 영역 */}
        <div className="flex flex-col items-center gap-56">
          {/* 로고 */}
          <p className="font-service-name text-black">Device Life</p>

          {/* 폼 컨테이너 */}
          <form
            id="find-password-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col items-center gap-20 w-400"
          >
            {/* 입력 영역 */}
            <div className="flex flex-col gap-8 w-full">
              <PrimaryInput {...register('email')} type="email" placeholder="이메일(ID)" />
              {/* 에러 메시지 - 제출 시에만 표시 */}
              {isSubmitted && errors.email && (
                <p className="font-body-3-r text-warning">{errors.email.message}</p>
              )}
            </div>

            {/* 인증번호 받기 버튼 */}
            <PrimaryButton
              text="인증번호 받기"
              className="w-full bg-blue-600"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
