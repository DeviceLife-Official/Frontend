import Stage1 from '@/assets/images/combination/stage1.svg?react';

const Stage1Section = () => {
  return (
    <div className="w-360 h-264">
      <div className="flex flex-col gap-60 justify-center items-center">
        <div className="flex flex-col gap-20">
          <p className="font-body-2-sm text-blue-600 text-center">1단계</p>
          <p className="font-body-4-sm text-black text-center">
            나만의 기기 조합을 만들어보세요! <br /> 조합명을 입력하고, 조합 생성하기 버튼을 누르면
            <br />
            나만의 조합이 생성돼요!
          </p>
        </div>
        <Stage1 className="w-236 h-60" />
      </div>
    </div>
  );
};

export default Stage1Section;
