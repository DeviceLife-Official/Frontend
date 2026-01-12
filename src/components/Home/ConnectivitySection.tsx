import Connectivity from '@/assets/icons/connectivity.svg?react';

const ConnectivitySection = () => {
  return (
    <div className="flex flex-col justify-center items-center w-448 h-380">
      <div className="flex flex-col gap-20">
        <p className="font-body-1-sm text-blue-600 text-center">연동성</p>
        <p className="font-body-2-sm text-black text-center">
          OS 및 제조사 생태계를 분석하여, 기기 간의 끊김 없는 <br /> 연결과 소프트웨어 호환성을
          정밀하게 진단합니다.
        </p>
      </div>
      <Connectivity className="w-280 h-280" />
    </div>
  );
};

export default ConnectivitySection;
