import { useEffect, useState } from 'react';
import { ROTATION_MS } from '@/constants/time';
import HomeImage1 from '@/assets/images/home/HomeImage1.svg?react';
import HomeImage2 from '@/assets/images/home/HomeImage2.svg?react';
import HomeImage3 from '@/assets/images/home/HomeImage3.svg?react';
import ConnectivitySection from '@/components/Home/ConnectivitySection';
import PortabilitySection from '@/components/Home/PortabilitySection';
import LifestyleSection from '@/components/Home/LifestyleSection';
import LogicEvaluationSection from '@/components/Home/LogicEvaluationSection';
import Footer from '@/components/Home/Footer';

const IMAGES = [HomeImage1, HomeImage2, HomeImage3];

const HomePage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-1200 mx-auto flex flex-col gap-100 pb-268">
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
        <div className="w-full flex flex-col items-center gap-88">
          <p className="font-heading-2 text-blue-600 text-center">스마트한 평가 시스템</p>
          <div className="flex flex-col gap-124">
            <div className="flex flex-row gap-108">
              <ConnectivitySection />
              <PortabilitySection />
            </div>
            <div className="flex flex-row gap-108">
              <LifestyleSection />
              <LogicEvaluationSection />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
