import PrimaryButton from '@/components/Button/PrimaryButton';
import PrimaryInput from '@/components/Input/PrimaryInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { findIdSchema, type FindIdFormData } from '@/schemas/authSchema';

const FindIdPage = () => {
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
      <div className="flex flex-col items-center gap-12">
        {/* 메인 폼 영역 */}
        <div className="flex flex-col items-center gap-28">
          {/* 로고 */}
          <p className="font-service-name text-black">Device Life</p>

          {/* 폼 컨테이너 */}
          <form
            id="find-id-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-56 w-400"
          >
            {/* 입력 영역 */}
            <div className="relative flex flex-col gap-8 w-full">
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
            <PrimaryButton
              text="아이디 찾기"
              className="w-full bg-blue-600 hover:bg-blue-500"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindIdPage;
