import Logo from '@/assets/logos/logo.svg?react';
import UserBlack from '@/assets/icons/userblack.svg?react';
import UserBlue500 from '@/assets/icons/userblue500.svg?react';
import UserBlue600 from '@/assets/icons/userblue600.svg?react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useLogout } from '@/hooks/useLogout';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

const NAV_TEXT_CLASS = 'font-body-1-sm text-black hover:text-blue-500 active:text-blue-600 cursor-pointer';
const USER_BLUE_500_CLASS = 'absolute inset-0 opacity-0 group-hover:opacity-100';

interface GNBProps {
  paddingRight?: number;
}
const getNavClass = ({ isActive }: { isActive: boolean }) =>
  clsx(NAV_TEXT_CLASS, isActive && 'text-blue-600 hover:text-blue-500');

const getMyNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(
    'group flex items-center gap-4',
    isActive ? 'font-body-1-sm text-blue-600 hover:text-blue-500' : NAV_TEXT_CLASS
  );

const getUserBlackClass = (isActive: boolean) =>
  clsx('absolute inset-0', isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0');

const getUserBlue600Class = (isActive: boolean) =>
  clsx('absolute inset-0', isActive ? 'opacity-100' : 'opacity-0 group-active:opacity-100');

const GNB = ({ paddingRight: _paddingRight = 0 }: GNBProps) => {
  const { isLoggedIn } = useAuth();
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white h-80">
      <div className="mx-auto w-full max-w-1920 h-full">
        <div className="min-w-1440 h-full">
          <div className="flex items-center justify-between h-full pl-44 pr-[clamp(60px,calc(60px+(100vw-1440px)*0.208333),160px)]">
            <div className="flex items-center gap-108 shrink-0">
              <NavLink to="/" end className="flex items-center gap-20 cursor-pointer">
                <Logo className="w-48 h-48" />
                <span className="font-service-name-sm text-black">Device Life</span>
              </NavLink>
              <NavLink to="/devices" className={getNavClass}>
                기기검색
              </NavLink>
              <NavLink to="/lifestyle" className={getNavClass}>
                라이프스타일
              </NavLink>
              <NavLink to="/combination/create" className={getNavClass}>
                조합 생성하기
              </NavLink>
            </div>
            <div className="flex items-center gap-56 shrink-0">
              {isLoggedIn ? (
              // 로그인 상태: MY | 로그아웃
                <>
                  <NavLink to={ROUTES.my.base} className={getMyNavLinkClass}>
                    {({ isActive }) => (
                      <>
                        <span className="relative w-32 h-32">
                          <UserBlack className={getUserBlackClass(isActive)} />
                          <UserBlue500 className={USER_BLUE_500_CLASS} />
                          <UserBlue600 className={getUserBlue600Class(isActive)} />
                        </span>
                        MY
                      </>
                    )}
                  </NavLink>
                  <button type="button" className={NAV_TEXT_CLASS} onClick={handleLogout}>
                    로그아웃
                  </button>
                </>
              ) : (
                // 비로그인 상태: 로그인 | 회원가입
                <>
                  <NavLink to={ROUTES.auth.login} className={getNavClass}>
                    로그인
                  </NavLink>
                  <NavLink to={ROUTES.auth.signup.base} className={getNavClass}>
                    회원가입
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
