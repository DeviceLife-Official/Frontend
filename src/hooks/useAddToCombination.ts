import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { type ModalView } from '@/types/devices';
import { ROUTES } from '@/constants/routes';
import { useGetCombos } from '@/apis/combo/getCombos';
import { useGetCombo } from '@/apis/combo/getComboId';
import { usePostComboDevice } from '@/apis/combo/postComboDevices';
import { useGetUserProfile } from '@/apis/mypage/getUserProfile';
import { usePostRecentlyViewed } from '@/apis/recentlyViewed/postRecentlyViewed';
import { hasAccessToken, hasCompletedOnboarding } from '@/utils/authStorage';

interface UseAddToCombinationParams {
  selectedProductId: string | null;
  onCloseModal: () => void;
}

export const useAddToCombination = ({
  selectedProductId,
  onCloseModal,
}: UseAddToCombinationParams) => {
  const navigate = useNavigate();

  // 로그인 상태 확인
  const isLoggedIn = hasAccessToken();

  // 사용자 프로필 조회 (로그인 시에만 자동 실행)
  const { data: userProfile, isLoading: isProfileLoading } = useGetUserProfile();

  // 온보딩 완료 여부 확인 (로딩 중에는 false로 기본 처리)
  const hasOnboarding = isProfileLoading ? false : hasCompletedOnboarding(userProfile);

  const [modalView, setModalView] = useState<ModalView>('device');

  // API hooks
  const { data: combos = [] } = useGetCombos();
  const { mutate: addDeviceToCombo, isPending: isAddingDevice } = usePostComboDevice();
  const { mutate: recordRecentlyViewed } = usePostRecentlyViewed();

  const [selectedCombinationId, setSelectedCombinationId] = useState<number | null>(null);
  const [showAllDevices, setShowAllDevices] = useState(false);
  const [showSaveCompleteModal, setShowSaveCompleteModal] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // 모달 열릴 때 최근 본 기기 기록 (로그인 상태에서만)
  useEffect(() => {
    if (isLoggedIn && selectedProductId) {
      recordRecentlyViewed(Number(selectedProductId));
    }
  }, [selectedProductId]);

  // 선택된 조합의 상세 정보 조회
  const { data: comboDetail } = useGetCombo(selectedCombinationId);

  /* 모달 닫기 */
  const handleCloseModal = () => {
    onCloseModal();
    setModalView('device');
    setSelectedCombinationId(null);
    setShowAllDevices(false);
  };

  // 에러 핸들러 (공통)
  const handleComboError = (error: any) => {
    console.error('기기 추가 실패 상세 정보:', error.response?.data || error.message);
    if (error.response?.data) {
      console.log('Error Code:', error.response.data.errorCode || error.response.data.code);
      console.log('Error Message:', error.response.data.message);
    }
  };

  /* 내 조합에 담기 */
  const handleAddToCombination = () => {
    // 조합이 1개면 바로 저장
    if (combos.length === 1 && selectedProductId) {
      addDeviceToCombo(
        { comboId: combos[0].comboId, deviceId: Number(selectedProductId) },
        {
          onSuccess: () => {
            setModalView('device');
            setShowSaveCompleteModal(true);
          },
          onError: handleComboError,
        }
      );
      return;
    }

    // 조합이 2개 이상이면 선택 모달 표시
    setModalView('combination');
  };

  /* 버튼 텍스트 및 핸들러 결정 */
  const getAddToCombinationConfig = () => {
    // Case 1: 로그아웃 상태
    if (!isLoggedIn) {
      return {
        text: '로그인하고 내 조합에 담기',
        handler: () => {
          navigate(ROUTES.auth.login);
        },
      };
    }

    // Case 2: 로그인했지만 온보딩 미완료
    if (!hasOnboarding) {
      return {
        text: '맞춤 설정하고 담기',
        handler: () => {
          navigate(ROUTES.onboarding.lifestyle);
        },
      };
    }

    // Case 3: 로그인 + 온보딩 완료
    return {
      text: '내 조합에 담기',
      handler: handleAddToCombination,
    };
  };

  const addToCombinationConfig = getAddToCombinationConfig();

  /* 조합 선택 - 기기 리스트 보기 */
  const handleSelectCombination = (combinationId: number) => {
    setSelectedCombinationId(combinationId);
    setShowAllDevices(false);
    setModalView('combinationDetail');
  };

  /* 조합에 기기 담기 */
  const handleAddDeviceToCombination = () => {
    if (selectedCombinationId && selectedProductId) {
      addDeviceToCombo(
        { comboId: selectedCombinationId, deviceId: Number(selectedProductId) },
        {
          onSuccess: () => {
            setModalView('device');
            setShowSaveCompleteModal(true);
          },
          onError: handleComboError,
        }
      );
    }
  };

  /* 저장 완료 모달 자동 닫기 */
  useEffect(() => {
    if (showSaveCompleteModal) {
      // 1. 0.8초 유지
      const holdTimer = setTimeout(() => {
        setIsFadingOut(true);

        // 2. 0.2초 동안 dissolve (fade-out) 후 종료
        const closeTimer = setTimeout(() => {
          setShowSaveCompleteModal(false);
          setIsFadingOut(false);
          handleCloseModal();
        }, 200);

        return () => clearTimeout(closeTimer);
      }, 800);

      return () => clearTimeout(holdTimer);
    }
  }, [showSaveCompleteModal]);

  /* 선택된 조합 정보 */
  const selectedCombination = selectedCombinationId
    ? combos.find(c => c.comboId === selectedCombinationId)
    : null;

  /* 선택된 조합의 기기 리스트 (API에서 조회) */
  const combinationDevices = comboDetail?.devices || [];

  /* 선택된 조합에 이미 담긴 기기인지 확인 */
  const isAlreadyInSelectedCombination = selectedCombinationId && selectedProductId
    ? combinationDevices.some(device => device.deviceId === Number(selectedProductId))
    : false;

  return {
    modalView,
    setModalView,
    showSaveCompleteModal,
    isFadingOut,
    combos,
    selectedCombination,
    combinationDevices,
    selectedCombinationId,
    showAllDevices,
    setShowAllDevices,
    isAlreadyInSelectedCombination,
    isAddingDevice,
    addToCombinationConfig,
    isProfileLoading,
    handleCloseModal,
    handleSelectCombination,
    handleAddDeviceToCombination,
  };
};
