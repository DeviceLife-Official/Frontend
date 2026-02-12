import Stage2 from '@/assets/images/combination/stage2.svg?react';

const Stage2Section = () => {
  return (
    <div className="w-360 h-264">
      <div className="flex flex-col gap-24 justify-center items-center">
        <div className="flex flex-col gap-20">
          <p className="font-body-2-sm text-blue-600 text-center">2단계</p>
          <p className="font-body-4-sm text-black text-center">
            기기검색 창에서 원하는 기기들을 골라
            <br /> 내가 만든 조합에 담아보세요!
            <br /> 이때 한 조합에는 동일한 카테고리의 기기를 <br />
            하나씩만 담는 것을 추천합니다.
          </p>
        </div>
        <Stage2 className="w-176 h-128" />
      </div>
    </div>
  );
};

export default Stage2Section;
