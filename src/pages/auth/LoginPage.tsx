import { useState } from 'react';
import PrimaryInput from '@/components/Input/PrimaryInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import Checkbox from '@/assets/icons/checkbox.svg?react';
import CheckboxOn from '@/assets/icons/checkbox_on.svg?react';
import googleLogo from '@/assets/logos/google.png';
import appleLogo from '@/assets/logos/apple.png';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [keepLogin, setKeepLogin] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      {/* 전체 컨테이너 */}
      <div className="flex flex-col items-center gap-20">
        {/* 메인 폼 영역 */}
        <div className="flex flex-col items-center gap-28">
          {/* 로고 */}
          <p className="font-service-name text-black">Device Life</p>

          {/* 폼 컨테이너 */}
          <div className="flex flex-col items-center gap-24 w-[400px]">
            {/* 입력 + 버튼 영역 */}
            <div className="flex flex-col gap-20 w-full">
              {/* 입력창들 */}
              <div className="flex flex-col gap-8">
                <PrimaryInput placeholder="이메일" />
                <PrimaryInput placeholder="비밀번호" type="password" />
              </div>

              {/* 체크박스 */}
              <button
                type="button"
                onClick={() => setKeepLogin(!keepLogin)}
                className="flex items-center gap-8 cursor-pointer"
              >
                {keepLogin ? (
                  <CheckboxOn className="size-[26px]" />
                ) : (
                  <Checkbox className="size-[26px]" />
                )}
                <span className="font-body-2-r text-gray-400">로그인 상태 유지</span>
              </button>

              {/* 로그인 버튼 */}
              <PrimaryButton text="로그인" className="w-full bg-blue-600" />
            </div>

            {/* 아이디/비밀번호 찾기 */}
            <div className="flex items-center gap-16 font-body-2-r text-gray-400">
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => navigate('/auth/find-id')}
              >
                아이디 찾기
              </button>
              <span>|</span>
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => navigate('/auth/find-password')}
              >
                비밀번호 찾기
              </button>
            </div>
          </div>
        </div>

        {/* 소셜 로그인 */}
        <div className="flex items-center gap-40">
          <button type="button" className="cursor-pointer">
            <img src={googleLogo} alt="Google 로그인" className="size-[50px]" />
          </button>
          <button type="button" className="cursor-pointer">
            <img src={appleLogo} alt="Apple 로그인" className="size-[50px]" />
          </button>
        </div>

        {/* 회원가입 안내 */}
        <div className="flex items-center gap-16 font-body-2-r text-gray-400">
          <span>아직 Device Life 회원이 아니신가요?</span>
          <button
            type="button"
            className="underline cursor-pointer"
            onClick={() => navigate('/auth/signup')}
          >
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
