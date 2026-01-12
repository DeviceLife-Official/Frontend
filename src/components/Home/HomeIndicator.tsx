import Logo from '@/assets/logos/logo.svg?react';
import User from '@/assets/icons/user.svg?react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const brandLinkClass = 'font-service-name-sm text-black hover:text-blue-500 active:text-blue-600';
const navTextClass = 'font-body-1-sm text-black hover:text-blue-500 active:text-blue-600';

type AuthStatus = 'logout' | 'login' | 'guest';

const HomeIndicator = () => {
  // TODO: 실제 상태로 교체
  const [authStatus] = useState<AuthStatus>('login');

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white h-108">
      <div className="mx-auto w-full max-w-1920 h-full">
        <div className="min-w-1440 h-full">
          <div className="flex items-center justify-between h-full px-160 pl-44">
            <div className="flex justify-end items-center gap-108 whitespace-nowrap shrink-0">
              <div className="flex items-center gap-20">
                <Logo className="w-48 h-48" aria-label="Logo" />
                <Link to="/" className={brandLinkClass}>
                  Device Life
                </Link>
              </div>
              <Link to="/devices" className={navTextClass}>
                기기검색
              </Link>
              <Link to="/lifestyle" className={navTextClass}>
                라이프스타일
              </Link>
              <Link to="/combination/create" className={navTextClass}>
                조합 생성하기
              </Link>
            </div>
            <div className="flex items-center gap-56 whitespace-nowrap shrink-0">
              {authStatus === 'logout' && (
                <>
                  <Link to="/auth/login" className={navTextClass}>
                    로그인
                  </Link>
                  <Link to="/auth/signup" className={navTextClass}>
                    회원가입
                  </Link>
                </>
              )}
              {authStatus !== 'logout' && (
                <>
                  <div className="flex items-center gap-4">
                    <User className="w-32 h-32" aria-label="User" />
                    <Link to="/my" className={navTextClass}>
                      {authStatus === 'guest' ? 'MY(guest)' : 'MY'}
                    </Link>
                  </div>
                  <p className={navTextClass}>로그아웃</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeIndicator;
