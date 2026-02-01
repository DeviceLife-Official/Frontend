import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { findPasswordSchema, type FindPasswordFormData } from '@/schemas/authSchema';
import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { parseApiError } from '@/utils/error';

type Step1FormProps = {
  onSubmit: (data: FindPasswordFormData) => Promise<void>;
  onInvalid: () => void;
  isPending: boolean;
  hasSubmitted: boolean;
};

const Step1Form = ({ onSubmit, onInvalid, isPending, hasSubmitted }: Step1FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FindPasswordFormData>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const handleFormSubmit = async (data: FindPasswordFormData) => {
    try {
      await onSubmit(data);
    } catch (error: unknown) {
      const { hasResponse, message } = parseApiError(error);
      if (hasResponse) {
        setError('email', {
          type: 'manual',
          message: message ?? '인증번호 발송에 실패했습니다. 다시 시도해 주세요.',
        });
      } else {
        // 네트워크/환경 에러는 상위로 전달하지 않고 alert로 처리
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-12">
      {/* 메인 폼 영역 */}
      <div className="flex flex-col items-center gap-56">
        {/* 로고 */}
        <p className="font-service-name text-black">Device Life</p>

        {/* 폼 컨테이너 */}
        <form
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
          noValidate
          className="flex flex-col items-center gap-20 w-400"
        >
          {/* 입력 영역 */}
          <div className="flex flex-col gap-8 w-full">
            <PrimaryInput {...register('email')} type="email" placeholder="이메일(ID)" />
            {(hasSubmitted || errors.email) && errors.email && (
              <p className="font-body-3-r text-warning">{errors.email.message}</p>
            )}
          </div>

          {/* 인증번호 받기 버튼 */}
          <PrimaryButton
            text={isPending ? '발송 중...' : '인증번호 받기'}
            className={`w-full bg-blue-600 ${!isPending ? 'hover:bg-blue-500' : ''}`}
            disabled={isPending}
          />
        </form>
      </div>
    </div>
  );
};

export default Step1Form;
