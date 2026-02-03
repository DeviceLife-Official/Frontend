import DeviceLifeLogo from '@/assets/logos/logo_circle.svg?react';
import GoogleLogo from '@/assets/logos/google.svg?react';
import SignupButton from '@/components/Button/SignupButton';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center w-400 gap-40">
        {/* 로고 + 회원가입 버튼들 */}
        <div className="flex flex-col items-center w-full gap-56">
          {/* 로고 */}
          <p className="font-service-name text-black">Device Life</p>
          {/* 회원가입 버튼들 */}
          <div className="flex flex-col items-center gap-20 w-full">
            <SignupButton text="Device Life 계정 만들기" icon={<DeviceLifeLogo />} onClick={() => navigate(ROUTES.auth.signup.account)} textStart={132} />
            <SignupButton text="구글로 시작하기" icon={<GoogleLogo />} textStart={146} />
          </div>
        </div>

        {/* 로그인 안내 */}
        <div className="flex items-center gap-16 font-body-2-r text-gray-400">
          <span>이미 Device Life 계정이 있으신가요?</span>
          <button
            type="button"
            className="underline underline-offset-4 cursor-pointer hover:opacity-80"
            onClick={() => navigate(ROUTES.auth.login)}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
