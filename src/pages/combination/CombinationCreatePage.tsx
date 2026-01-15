import PrimaryButton from '@/components/Button/PrimaryButton';
import Stage1Section from '@/components/Combination/Stage1Section';
import Stage2Section from '@/components/Combination/Stage2Section';
import Stage3Section from '@/components/Combination/Stage3Section';

const CombinationCreatePage = () => {
  return (
    <div className="mt-96 flex flex-col gap-143">
      <div className="flex flex-row gap-20 justify-center">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="생성하고 싶은 조합명을 입력하세요"
            className="w-600 h-72 px-20 py-20 rounded-button bg-blue-100 placeholder-gray-300 font-body-1-r outline-none"
          />
          <p className="pl-20 mt-16 text-warning font-body-4-r">
            *회원의 경우에는 로그인 한 뒤, 조합을 생성해야지 마이페이지&gt;내 조합 목록에
            저장됩니다.
          </p>
        </div>
        <PrimaryButton text="조합 생성하기" className="w-280 bg-blue-600 hover:bg-blue-500" />
      </div>
      <div className="flex flex-row gap-20 justify-center">
        <Stage1Section />
        <Stage2Section />
        <Stage3Section />
      </div>
    </div>
  );
};

export default CombinationCreatePage;

// TODO: 간격 줄인 버전으로 간격 재조정
// 입력창 유효성 검사 함수
// 배경 깔기

// TODO: 간격 줄인 버전으로 간격 재조정
// 입력창 유효성 검사 함수
