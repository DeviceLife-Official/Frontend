import PrimaryButton from '@/components/Button/PrimaryButton';

const CombinationCreatePage = () => {
  return (
    <div className="flex flex-col gap-10">
      <PrimaryButton text="로그인" className="w-440" disabled />
      <PrimaryButton text="로그인" className="w-440 bg-blue-600 hover:bg-blue-500" />

      <PrimaryButton
        text="로그인하고 내 조합에 담기"
        className="w-400 bg-blue-500 hover:bg-blue-400"
      />
      <PrimaryButton text="내 조합에 담기" className="w-400 bg-blue-500 hover:bg-blue-400" />

      <PrimaryButton text="완료" className="w-280 bg-blue-600 hover:bg-blue-500" />
      <PrimaryButton text="다음" className="w-280 bg-blue-500 hover:bg-blue-400" />

      <PrimaryButton text="조합1 에 담기" className="w-280 bg-blue-600 hover:bg-blue-500" />
      <PrimaryButton text="이미 담은 상품입니다." className="w-280" disabled />

      <PrimaryButton text="새 조합 추가하기" className="w-280 bg-blue-600 hover:bg-blue-500" />
    </div>
  );
};

export default CombinationCreatePage;
