import Error404 from '@/assets/images/error/Error404.svg?react';
import SecondaryButton from '@/components/Button/SecondaryButton'
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="flex flex-col gap-32 items-center">
        <p className="font-heading-3 text-gray-400 text-center">Page Disconnected</p>
        <Error404 />
        <SecondaryButton className="w-280" text="홈으로 가기" onClick={() => navigate('/')} />
      </div>
    </div>
  );
};

export default NotFoundPage;
