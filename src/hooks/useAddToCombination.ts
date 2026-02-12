import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { type ModalView } from '@/types/devices';
import { type ComboDevice } from '@/types/combo/combo';
import { ROUTES } from '@/constants/routes';
import { useGetCombos } from '@/apis/combo/getCombos';
import { useGetCombo } from '@/apis/combo/getComboId';
import { usePostComboDevice } from '@/apis/combo/postComboDevices';
import { usePostRecentlyViewed } from '@/apis/recentlyViewed/postRecentlyViewed';
import { useAuth } from '@/hooks/useAuth';
import { getBaseModelName } from '@/utils/devices/getBaseModelName';

interface UseAddToCombinationParams {
  selectedProductId: string | null;
  selectedDeviceType?: string | null;
  selectedDeviceName?: string | null;
  onCloseModal: () => void;
}

interface AddToCombinationConfig {
  text: string;
  handler: () => void;
  disabled?: boolean;
}

interface DuplicateCheckResult {
  isBlocked: boolean;
  reason: 'model' | 'category' | null;
}

export const useAddToCombination = ({
  selectedProductId,
  selectedDeviceType,
  selectedDeviceName,
  onCloseModal,
}: UseAddToCombinationParams) => {
  const navigate = useNavigate();

  // 인증 상태 확인
  const { isLoggedIn, hasCompletedOnboarding, isAuthLoading } = useAuth();

  // 온보딩 완료 여부 (로딩 중에는 false로 기본 처리)
  const hasOnboarding = isAuthLoading ? false : hasCompletedOnboarding;

  const [modalView, setModalView] = useState<ModalView>('device');

  // API hooks
  const { data: combos = [] } = useGetCombos();
  const { mutate: addDeviceToCombo, isPending: isAddingDevice } = usePostComboDevice();
  const { mutate: recordRecentlyViewed } = usePostRecentlyViewed();

  // 조합이 1개일 때 해당 조합의 상세 정보 조회
  const singleComboId = combos.length === 1 ? combos[0].comboId : null;
  const { data: singleComboDetail } = useGetCombo(singleComboId);

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

  /* 중복 체크 유틸리티 */
  const DEVICE_TYPE_MAP: Record<string, string[]> = {
    'SMARTPHONE': ['SMARTPHONE', 'PHONE', '스마트폰', '폰'],
    'LAPTOP': ['LAPTOP', '노트북'],
    'TABLET': ['TABLET', '태블릿'],
    'CHARGER': ['CHARGER', '충전기'],
    'EARBUDS': ['EARBUDS', '이어버드'],
    'WATCH': ['WATCH', '워치', '시계'],
  };

  const isSameDeviceType = (type1: string, type2: string): boolean => {
    if (type1 === type2) return true;

    for (const types of Object.values(DEVICE_TYPE_MAP)) {
      if (types.includes(type1) && types.includes(type2)) {
        return true;
      }
    }

    return false;
  };

  const checkDeviceDuplicate = (
    existingDevices: ComboDevice[],
    targetDeviceType: string,
    targetDeviceName: string
  ): DuplicateCheckResult => {
    if (!targetDeviceType || !targetDeviceName) {
      return { isBlocked: false, reason: null };
    }

    const targetBaseName = getBaseModelName(targetDeviceName);

    // 우선순위 1: 같은 모델
    for (const device of existingDevices) {
      const deviceBaseName = getBaseModelName(device.name);
      if (deviceBaseName === targetBaseName) {
        return { isBlocked: true, reason: 'model' };
      }
    }

    // 우선순위 2: 같은 카테고리
    for (const device of existingDevices) {
      if (isSameDeviceType(device.deviceType, targetDeviceType)) {
        return { isBlocked: true, reason: 'category' };
      }
    }

    return { isBlocked: false, reason: null };
  };

  /* 모달 닫기 */
  const handleCloseModal = () => {
    onCloseModal();
    setModalView('device');
    setSelectedCombinationId(null);
    setShowAllDevices(false);
  };

  // 에러 핸들러 (공통)
  const handleComboError = (_error: any) => {
    // 에러 처리 로직 필요시 추가
  };

  /* 단일 조합일 때 중복 체크 */
  const singleComboDuplicateCheck = (() => {
    if (combos.length !== 1 || !singleComboDetail) {
      return { isBlocked: false, reason: null };
    }

    return checkDeviceDuplicate(
      singleComboDetail.devices,
      selectedDeviceType ?? '',
      selectedDeviceName ?? ''
    );
  })();

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
  const getAddToCombinationConfig = (): AddToCombinationConfig => {
    // Case 1: 로그아웃 상태
    if (!isLoggedIn) {
      return {
        text: '로그인하고 내 조합에 담기',
        handler: () => {
          navigate(ROUTES.auth.login);
        },
        disabled: false,
      };
    }

    // Case 2: 로그인했지만 온보딩 미완료
    if (!hasOnboarding) {
      return {
        text: '맞춤 설정하고 담기',
        handler: () => {
          navigate(ROUTES.onboarding.lifestyle);
        },
        disabled: false,
      };
    }

    // Case 3: 로그인 + 온보딩 완료 + 조합 1개
    if (combos.length === 1) {
      const isBlocked = singleComboDuplicateCheck.isBlocked;
      const reason = singleComboDuplicateCheck.reason;

      let text = '내 조합에 담기';
      if (isBlocked && reason === 'model') {
        text = '이미 담은 기기입니다';
      } else if (isBlocked && reason === 'category') {
        text = '이미 담은 타입입니다';
      }

      return {
        text,
        handler: handleAddToCombination,
        disabled: isBlocked,
      };
    }

    // Case 4: 로그인 + 온보딩 완료 + 조합 2개 이상
    return {
      text: '내 조합에 담기',
      handler: handleAddToCombination,
      disabled: false,
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
  const duplicateCheck = (() => {
    if (!selectedCombinationId || !selectedDeviceType || !selectedDeviceName) {
      return { isBlocked: false, reason: null };
    }

    return checkDeviceDuplicate(
      combinationDevices,
      selectedDeviceType,
      selectedDeviceName
    );
  })();

  const isAlreadyInSelectedCombination = duplicateCheck.isBlocked;
  const duplicateReason = duplicateCheck.reason;

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
    duplicateReason,
    isAddingDevice,
    addToCombinationConfig,
    isProfileLoading: isAuthLoading,
    handleCloseModal,
    handleSelectCombination,
    handleAddDeviceToCombination,
  };
};
