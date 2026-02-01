import LogicEvaluation from '@/assets/icons/logicevaluation.svg?react';

const LogicEvaluationSection = () => {
  return (
    <div className="flex flex-col justify-center items-center w-448 h-380">
      <div className="flex flex-col gap-20">
        <p className="font-heading-4 text-blue-600 text-center">로직 평가</p>
        <p className="font-body-2-sm text-black text-center leading-23">
          Device Life의 자체 로직을 통해,
          <br /> 기기 간의 조합 적합성을 빠르고 정확하게 판단합니다.
        </p>
      </div>
      <LogicEvaluation className="w-280 h-280" />
    </div>
  );
};

export default LogicEvaluationSection;
