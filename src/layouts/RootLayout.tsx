import GNB from '@/components/Home/GNB';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
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
