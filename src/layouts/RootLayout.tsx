import HomeIndicator from '@/components/Home/HomeIndicator';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <main className="mx-auto min-w-1440 max-w-1920 w-full min-h-screen">
      <div className="min-w-max flex flex-col">
        <HomeIndicator />
        <div className="pt-108">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default RootLayout;
