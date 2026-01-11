import { useEffect, useState } from 'react';
import HomeImage1 from '@/assets/images/home/HomeImage1.svg?react';
import HomeImage2 from '@/assets/images/home/HomeImage2.svg?react';
import HomeImage3 from '@/assets/images/home/HomeImage3.svg?react';
import Connectivity from '@/assets/icons/connectivity.svg?react';
import Portability from '@/assets/icons/portability.svg?react';
import LifeStyle from '@/assets/icons/lifestyle.svg?react';
import Colormatching from '@/assets/icons/colormatching.svg?react';

import Footer from '@/components/Home/Footer';

const IMAGES = [HomeImage1, HomeImage2, HomeImage3];

const HomePage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 10_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-1200 mx-auto flex flex-col gap-100 pb-268">
        {/* 사진 영역 */}
        <div className="relative w-full max-w-1200">
          {IMAGES.map((Img, i) => (
            <Img
              key={i}
              className={[
                'absolute inset-0 w-full h-auto transition-opacity duration-700',
                i === index ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            />
          ))}
          <div className="invisible">
            <HomeImage1 className="w-full h-auto" />
          </div>
        </div>

        {/* 소개 영역 */}
        <div className="w-full flex flex-col items-center gap-88">
          <p className="font-heading-2 text-blue-600 text-center">스마트한 평가 시스템</p>
          <div className="flex flex-col gap-124">
            <div className="flex flex-row gap-108">
              <div className="flex flex-col justify-center items-center w-448 h-380">
                <div className="flex flex-col gap-20">
                  <p className="font-body-1-sm text-blue-600 text-center">연동성</p>
                  <p className="font-body-2-sm text-black text-center">
                    OS 및 제조사 생태계를 분석하여, 기기 간의 끊김 없는 <br /> 연결과 소프트웨어
                    호환성을 정밀하게 진단합니다.
                  </p>
                </div>
                <Connectivity className="w-280 h-280" />
              </div>
              <div className="flex flex-col justify-center items-center w-448 h-380">
                <div className="flex flex-col gap-20">
                  <p className="font-body-1-sm text-blue-600 text-center">편의성</p>
                  <p className="font-body-2-sm text-black text-center">
                    기기의 무게, 크기 및 배터리 효율을 종합적으로 분석하여, <br />
                    실질적인 휴대 부담과 사용 지속성을 판단해 줍니다.
                  </p>
                </div>
                <Portability className="w-280 h-280" />
              </div>
            </div>

            <div className="flex flex-row gap-108">
              <div className="flex flex-col justify-center items-center w-448 h-380">
                <div className="flex flex-col gap-20">
                  <p className="font-body-1-sm text-blue-600 text-center">라이프스타일</p>
                  <p className="font-body-2-sm text-black text-center">
                    사용자의 라이프스타일에 맞춰 <br />
                    가장 중요한 기준을 우선적으로 분석합니다.
                  </p>
                </div>
                <LifeStyle className="w-280 h-280" />
              </div>
              <div className="flex flex-col justify-center items-center w-448 h-380">
                <div className="flex flex-col gap-20">
                  <p className="font-body-1-sm text-blue-600 text-center">컬러 매칭</p>
                  <p className="font-body-2-sm text-black text-center">
                    기기 간의 색상과 톤의 조화를 분석하여, 시각적으로 <br />
                    완성도 높은 나만의 데스크테리어를 제안합니다.
                  </p>
                </div>
                <Connectivity className="w-280 h-280" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
//todo:헤더 플로팅
