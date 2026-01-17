import DeviceLifeLogo from '@/assets/logos/deviceLife.svg?react';
import GoogleLogo from '@/assets/logos/google.svg?react';
import AppleLogo from '@/assets/logos/apple.svg?react';
import SignupButton from '@/components/Button/SignupButton';

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center w-400 gap-56">
        {/* 로고 */}
        <p className="font-service-name text-black">Device Life</p>
        <div className="flex flex-col items-center gap-20 w-full">
          <SignupButton text="Device Life 계정 만들기" icon={<DeviceLifeLogo />} />
          <SignupButton text="구글로 시작하기" icon={<GoogleLogo />} />
          <SignupButton text="애플로 시작하기" icon={<AppleLogo />} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
