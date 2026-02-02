import Portability from '@/assets/icons/portability.svg?react';

const PortabilitySection = () => {
  return (
    <div className="flex flex-col justify-center items-center w-448 h-380">
      <div className="flex flex-col gap-20">
        <p className="font-heading-4 text-blue-600 text-center">편의성</p>
        <p className="font-body-2-sm text-black text-center !leading-23">
          기기의 무게, 크기 및 배터리 효율을 종합적으로 분석하여, <br />
          실질적인 휴대 부담과 사용 지속성을 판단해 줍니다.
        </p>
      </div>
      <Portability className="w-280 h-280" />
    </div>
  );
};

export default PortabilitySection;
