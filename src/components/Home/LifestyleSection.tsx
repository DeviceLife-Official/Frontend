import Lifestyle from '@/assets/icons/lifestyle.svg?react';

const LifeStyleSection = () => {
  return (
    <div className="flex flex-col justify-center items-center w-448 h-380">
      <div className="flex flex-col gap-20">
        <p className="font-heading-4 text-blue-600 text-center">라이프스타일</p>
        <p className="font-body-2-sm text-black text-center !leading-23">
          사용자의 라이프스타일에 맞춰 <br />
          가장 중요한 기준을 우선적으로 분석합니다.
        </p>
      </div>
      <Lifestyle className="w-280 h-280" />
    </div>
  );
};

export default LifeStyleSection;
