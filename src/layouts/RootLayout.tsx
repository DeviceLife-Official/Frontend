import GNB from '@/components/Home/GNB';
import { Outlet } from 'react-router-dom';
import { useGetUserProfile } from '@/apis/mypage/getUserProfile';

const RootLayout = () => {
  // 레이아웃에서 유저 프로필 조회 트리거 (나머지 컴포넌트는 useAuth로 구독)
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
