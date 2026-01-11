import Logo from '@/assets/logos/logo.png';
import { Link } from 'react-router-dom';

const navTextClass =
  'font-body-1-sm text-black cursor-pointer hover:text-blue-500 active:text-blue-600';

const HomeIndicator = () => {
  return (
    <header className="bg-white h-108">
      <div className="flex items-center justify-between h-full px-160 pl-44">
        <div className="flex justify-end items-center gap-108">
          <div className="flex items-center gap-20">
            <img src={Logo} alt="Logo" className="w-48 h-48" />
            <Link
              to="/"
              className="font-service-name-sm text-black cursor-pointer hover:text-blue-500 active:text-blue-600"
            >
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
        <div className="flex items-center gap-56">
          <Link to="/auth/login" className={navTextClass}>
            로그인
          </Link>
          <Link to="/auth/signup" className={navTextClass}>
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HomeIndicator;
