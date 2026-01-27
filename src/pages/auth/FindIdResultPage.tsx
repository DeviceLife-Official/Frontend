import PrimaryButton from "@/components/Button/PrimaryButton";
import OnboardingLifestyleTag from "@/components/Lifestyle/OnboardingLifestyleTag";
import { ROUTES } from "@/constants/routes";
import { useNavigate, useLocation } from "react-router-dom";
import WarningIcon from "@/assets/icons/warning.svg?react";

// 라우터 state 타입
type FindIdResultState = {
  success?: boolean;
  email?: string | null;
};

const FindIdResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 라우터 state에서 결과 정보 가져오기
  const { success, email } = (location.state || {}) as FindIdResultState;
  const isSuccess = success && email;

  return (
    <div className="relative flex items-center justify-center h-[calc(100vh-80px)] bg-white overflow-hidden">
      {/* 아이디 찾기 결과 프레임 레이아웃 (성공/실패 공통) */}
      <div className="relative flex w-540 flex-col items-center gap-56">
        {isSuccess ? (
          <>
            {/* 상단 안내 문구 영역 - 성공 */}
            <p className="font-body-1-sm text-blue-600 text-center">
              회원님의 아이디를 확인해 주세요
            </p>

            {/* 아이디 표시 영역 - 성공 */}
            <OnboardingLifestyleTag
              label={email!}
              selected={true}
              className="w-300 h-150 !px-0 !py-24 !border-shadow-blue-welcome !font-body-1-r !text-black"
            />

            {/* 하단 버튼 영역 - 성공 (로그인 / 비밀번호 찾기) */}
            <div className="flex flex-col items-center w-full gap-20">
              <PrimaryButton
                text="로그인"
                className="w-400 bg-blue-600 hover:bg-blue-500"
                onClick={() => navigate(ROUTES.auth.login, { state: { prefillEmail: email } })}
              />
              <div className="flex items-center gap-16 font-body-2-r text-gray-400">
                <span>비밀번호가 생각나지 않으신가요?</span>
                <button
                  type="button"
                  className="underline underline-offset-4 cursor-pointer"
                  onClick={() => navigate(ROUTES.auth.findPassword)}
                >
                  비밀번호 찾기
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 상단 안내 문구 영역 - 실패 */}
            <p className="font-body-1-sm text-blue-600 text-center">
              회원님의 아이디를 확인해 주세요
            </p>

            {/* 메시지 영역 - 실패*/}
            <div className="flex flex-col items-center justify-center w-300 h-150 gap-12 py-36 rounded-button bg-white border-shadow-red">
              {/* 실패 아이콘 영역 - 실제 아이콘 컴포넌트는 추후 공통 컴포넌트로 분리 가능 */}
              <WarningIcon className="size-34" />

              {/* 실패 메시지 텍스트 */}
              <p className="font-body-2-r text-black">
                조회결과가 없습니다
              </p>
            </div>

            {/* 하단 버튼 영역 - 실패 */}
            <div className="flex flex-col items-center w-full gap-20">
              <PrimaryButton
                text="확인"
                className="w-400 bg-blue-600 hover:bg-blue-500"
                onClick={() => navigate(ROUTES.auth.findId)}
              />
              <div className="flex items-center gap-16 font-body-2-r text-gray-400">
                <span>아직 Device Life 회원이 아니신가요?</span>
                <button
                  type="button"
                  className="underline underline-offset-4 cursor-pointer"
                  onClick={() => navigate(ROUTES.auth.signup.base)}
                >
                  회원가입 하기
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FindIdResultPage