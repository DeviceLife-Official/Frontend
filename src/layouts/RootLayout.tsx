import NavBar from '@/components/NavBar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <main className="mx-auto min-w-768 max-w-1920 w-full min-h-screen overflow-auto">
      <div className="min-w-max flex flex-col">
        <NavBar />
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
