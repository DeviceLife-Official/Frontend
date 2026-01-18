import EllipseBlack from '@/assets/icons/ellipse_black.svg?react';
import EllipseGray from '@/assets/icons/ellipse_gray.svg?react';
import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import DuplicateCheckButton from '@/components/Button/DuplicateCheckButton';
import InputLabel from '@/components/Auth/Label/InputLabel';

const SignupAccountPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center">
        {/* 페이지네이션 인디케이터 */}
        <div className="flex items-center justify-center p-8 gap-24 mb-24">
          <EllipseBlack className="size-10" />
          <EllipseGray className="size-10" />
          <EllipseGray className="size-10" />
          <EllipseGray className="size-10" />
        </div>

        {/* 로고 */}
        <p className="font-service-name text-black mb-40">Device Life</p>

        {/* 폼 컨테이너 */}
        <form className="flex flex-col gap-40 items-center w-full">
          {/* 폼 필드 영역 */}
          <div className="flex flex-col gap-8">
            {/* 이메일 필드 */}
            <div className="relative w-400">
              <InputLabel text="이메일(ID)" className="absolute right-full mr-95 top-1/2 -translate-y-1/2" />
              <PrimaryInput type="email" placeholder="이메일"/>
              <DuplicateCheckButton className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+12px)]" />
            </div>
            
            {/* 비밀번호 입력창 */}
            <div className="relative w-400">
              <InputLabel text="비밀번호" className="absolute right-full mr-96 top-1/2 -translate-y-1/2" />
            <PrimaryInput type="password" placeholder="비밀번호" />
            </div>

            {/* 비밀번호 확인 입력창 */}
            <div className="relative w-400">
              <InputLabel text="비밀번호확인" className="absolute right-full mr-95 top-1/2 -translate-y-1/2" />
            <PrimaryInput type="password" placeholder="비밀번호확인" />
            </div>
          </div>

          {/* 다음 버튼 */}
          <PrimaryButton text="다음" className="w-280 bg-blue-500" />
          
        </form>
      </div>
    </div>
  );
};

export default SignupAccountPage;
