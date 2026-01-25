import GNB from '@/components/Home/GNB';
import { Outlet } from 'react-router-dom';
import { useGetUserProfile } from '@/apis/mypage/getUserProfile';

const RootLayout = () => {
  // 토큰이 있을 때만 유저 정보 자동 조회
  useGetUserProfile();

  return (
    <main className="mx-auto min-w-1440 max-w-1920 w-full min-h-screen">
      <div className="min-w-max flex flex-col">
        <GNB />
        <div className="mt-80">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default RootLayout;
