import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetRecentlyViewed } from '@/apis/recentlyViewed/getRecentlyViewed';
import RecentlyViewedCard from './RecentlyViewedCard';

interface RecentlyViewedFloatingProps {
  userName: string;
  sidebarContentRef: React.RefObject<HTMLDivElement | null>;
}

const RecentlyViewedFloating = ({
  userName,
  sidebarContentRef,
}: RecentlyViewedFloatingProps) => {
  const navigate = useNavigate();
  const { data: devices = [], isLoading } = useGetRecentlyViewed();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFloating, setIsFloating] = useState(false);
  const [leftPosition, setLeftPosition] = useState(0);

  // 표시할 기기 (최대 2개)
  const displayDevices = devices.slice(0, 2);

  useEffect(() => {
    const updatePosition = () => {
      if (!sidebarContentRef.current) return;

      const sidebarRect = sidebarContentRef.current.getBoundingClientRect();
      const GNB_HEIGHT = 80;
      const MARGIN_TOP = 60;

      // 사이드바 콘텐츠의 하단이 GNB + 마진 위로 올라갔을 때 플로팅 시작
      const threshold = GNB_HEIGHT + MARGIN_TOP + 60;

      if (sidebarRect.bottom < threshold) {
        setIsFloating(true);
        setLeftPosition(sidebarRect.left);
      } else {
        setIsFloating(false);
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(updatePosition);
    };

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    updatePosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarContentRef]);

  // 로딩 중이거나 기기가 없으면 렌더링하지 않음
  if (isLoading || displayDevices.length === 0) return null;

  const handleCardClick = (deviceId: number) => {
    navigate(`/devices?productId=${deviceId}`);
  };

  return (
    <div
      ref={containerRef}
      className={`w-280 mt-60 transition-all duration-300 ${
        isFloating ? 'fixed z-40' : 'relative'
      }`}
      style={
        isFloating
          ? {
              top: 140,
              left: leftPosition,
            }
          : undefined
      }
    >
      {/* 헤더 */}
      <div className="pl-20 mb-28">
        <span className="font-heading-3 text-black">{userName}</span>
        <span className="font-heading-4 text-black"> 님이 최근에 본</span>
      </div>

      {/* 카드 목록 - 세로 배치, 최대 2개 */}
      <div className="flex flex-col gap-28">
        {displayDevices.map((device) => (
          <RecentlyViewedCard
            key={device.deviceId}
            device={device}
            onClick={() => handleCardClick(device.deviceId)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedFloating;
