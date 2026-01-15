import Stage3 from '@/assets/images/combination/stage3.svg?react';

const Stage3Section = () => {
  return (
    <div className="w-448 h-392">
      <div className="flex flex-col gap-128 justify-center items-center">
        <div className="flex flex-col gap-20">
          <p className="font-body-1-sm text-blue-600 text-center">3단계</p>
          <p className="font-body-2-sm text-black text-center">
            우측 상단 MY에 들어가서 <br /> 내가 만든 조합의 조합도를 확인해 보세요!
          </p>
        </div>
        <Stage3 className="w-272 h-88" />
      </div>
    </div>
  );
};

export default Stage3Section;
