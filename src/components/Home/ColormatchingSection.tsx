import Colormatching from '@/assets/icons/colormatching.svg?react';

const ColormatchingSection = () => {
  return (
    <div className="flex flex-col justify-center items-center w-448 h-380">
      <div className="flex flex-col gap-20">
        <p className="font-body-1-sm text-blue-600 text-center">컬러 매칭</p>
        <p className="font-body-2-sm text-black text-center">
          기기 간의 색상과 톤의 조화를 분석하여, 시각적으로 <br />
          완성도 높은 나만의 데스크테리어를 제안합니다.
        </p>
      </div>
      <Colormatching className="w-280 h-280" />
    </div>
  );
};

export default ColormatchingSection;
