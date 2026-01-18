import Logo from '@/assets/logos/logo.svg?react';
import UserBlack from '@/assets/icons/userblack.svg?react';
import UserBlue500 from '@/assets/icons/userblue500.svg?react';
import UserBlue600 from '@/assets/icons/userblue600.svg?react';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const brandLinkClass = 'font-service-name-sm text-black hover:text-blue-500 active:text-blue-600';
const navTextClass = 'font-body-1-sm text-black hover:text-blue-500 active:text-blue-600';
type AuthStatus = 'logout' | 'login';

interface GNBProps {
  paddingRight?: number;
}

const GNB = ({ paddingRight = 0 }: GNBProps) => {
  const [authStatus] = useState<AuthStatus>('login');

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `${navTextClass} ${isActive ? 'text-blue-600 hover:text-blue-500' : ''}`;

  const brandClass = ({ isActive }: { isActive: boolean }) =>
    `${brandLinkClass} ${isActive ? 'text-blue-600 hover:text-blue-500' : ''}`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white h-80">
      <div className="mx-auto w-full max-w-1920 h-full">
        <div className="min-w-1440 h-full">
          <div className="flex items-center justify-between h-full pl-44 pr-[clamp(60px,calc(60px+(100vw-1440px)*0.208333),160px)]">
            <div className="flex items-center gap-108 shrink-0">
              <div className="flex items-center gap-20">
                <Logo className="w-48 h-48" />
                <NavLink to="/" end className={brandClass}>
                  Device Life
                </NavLink>
              </div>
              <NavLink to="/devices" className={navClass}>
                기기검색
              </NavLink>
              <NavLink to="/lifestyle" className={navClass}>
                라이프스타일
              </NavLink>
              <NavLink to="/combination/create" className={navClass}>
                조합 생성하기
              </NavLink>
            </div>
            <div className="flex items-center gap-56 shrink-0">
              {authStatus === 'logout' ? (
                <>
                  <NavLink to="/auth/login" className={navClass}>
                    로그인
                  </NavLink>
                  <NavLink to="/auth/signup" className={navClass}>
                    회원가입
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/my"
                    className={({ isActive }) =>
                      `group flex items-center gap-4 ${
                        isActive ? 'font-body-1-sm text-blue-600 hover:text-blue-500' : navTextClass
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative w-32 h-32">
                          <UserBlack
                            className={`absolute inset-0 ${isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}
                          />
                          <UserBlue500 className="absolute inset-0 opacity-0 group-hover:opacity-100" />
                          <UserBlue600
                            className={`absolute inset-0 ${isActive ? 'opacity-100' : 'opacity-0 group-active:opacity-100'}`}
                          />
                        </span>
                        MY
                      </>
                    )}
                  </NavLink>
                  <NavLink
                    to="/"
                    className={navTextClass}
                    onClick={() => {
                      // TODO: 로그아웃 로직
                    }}
                  >
                    로그아웃
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GNB;
