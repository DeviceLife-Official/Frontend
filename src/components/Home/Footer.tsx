import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 h-510 px-160 py-100">
      <div className="flex flex-col items-start gap-72">
        <div className="flex flex-wrap items-start gap-96">
          <Link to="/support/notices" className="w-140 font-body-1-sm text-white cursor-pointer">
            공지사항
          </Link>
          <Link to="/support/faq" className="w-140 font-body-1-sm text-white cursor-pointer">
            자주묻는질문
          </Link>
          <Link
            to="/support/privacy-policy"
            className="w-180 font-body-1-sm text-white cursor-pointer"
          >
            개인정보처리방침
          </Link>
          <Link to="/support/terms" className="w-140 font-body-1-sm text-white cursor-pointer">
            이용약관
          </Link>
          <Link
            to="/support/customer-center"
            className="w-140 font-body-1-sm text-white cursor-pointer"
          >
            고객센터
          </Link>
        </div>
        <div className="flex flex-col gap-12 items-start w-fit">
          <p className="font-body-1-sm text-white">(주) Device Life</p>
          <p className="font-body-3-r text-white">
            대표: 김준환 | 사업자등록번호: 105-30-20492 | 통신판매업: 2023-서울마포-2465
          </p>
          <p className="font-body-3-r text-white">
            이메일: ssy08042@kau.kr | 주소: 서울특별시 마포구 와우산로 94, 7층
          </p>
        </div>
        <p className="self-stretch font-body-3-r text-white">
          © Device Life Co, All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

// todo: 호버했을때밑줄, 혹시모를 클래스 상수분리
