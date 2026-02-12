import DeviceLifeLogo from '@/assets/logos/logo_circle.svg?react';
import GoogleLogo from '@/assets/logos/google.svg?react';
import SignupButton from '@/components/Button/SignupButton';
import { ROUTES } from '@/constants/routes';
import { OAUTH } from '@/constants/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const SignupPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // 로그인된 상태에서 회원가입 페이지 접근 시 홈으로 리다이렉트
  if (isLoggedIn) {
    return <Navigate to={ROUTES.home} replace />;
  }

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
            <SignupButton text="구글로 시작하기" icon={<GoogleLogo />} textStart={146} onClick={() => { window.location.href = OAUTH.google; }} />
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
