import HomeIndicator from '@/components/Home/HomeIndicator';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <main className="mx-auto min-w-1440 max-w-1920 w-full h-screen">
      <HomeIndicator />
      <div className="pt-108 h-full">
        <div className="h-[calc(100vh-108px)]">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default RootLayout;
