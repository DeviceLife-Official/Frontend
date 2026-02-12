import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import GNB from '@/components/Home/GNB';
import PrimaryButton from '@/components/Button/PrimaryButton';
import MyPageSidebar from '@/components/MyPage/MyPageSidebar';
import CombinationList from '@/components/MyPage/CombinationList';
import DeviceDeleteModal from '@/components/MyPage/DeviceDeleteModal';
import CombinationDeleteModal from '@/components/MyPage/CombinationDeleteModal';
import SaveNameModal from '@/components/MyPage/SaveNameModal';
import DeleteCompleteModal from '@/components/MyPage/DeleteCompleteModal';
import SaveCompleteModal from '@/components/DeviceSearch/SaveCompleteModal';
import TopIcon from '@/assets/icons/top.svg?react';
import { useGetCombos } from '@/apis/combo/getCombos';
import { useGetCombo } from '@/apis/combo/getComboId';
import { usePutCombo } from '@/apis/combo/putCombos';
import { useDeleteCombo } from '@/apis/combo/deleteCombo';
import { usePostComboPin } from '@/apis/combo/postComboPin';
import { useDeleteComboDevice } from '@/apis/combo/deleteComboDevice';
import { useComboEvaluation } from '@/apis/combo/getComboEvaluation';
import { useAuth } from '@/hooks/useAuth';
import { useCombinationModals } from '@/hooks/useCombinationModals';
import { useDeviceSelection } from '@/hooks/useDeviceSelection';
import { useCombinationSort } from '@/hooks/useCombinationSort';
import { useCombinationEdit } from '@/hooks/useCombinationEdit';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useModalScrollLock } from '@/hooks/useModalScrollLock';
import { useMyPageScroll } from '@/hooks/useMyPageScroll';
import { mapEvaluationToUI } from '@/utils/mapEvaluationToUI';
import type { LifestyleKey } from '@/constants/evaluation/lifestyle';

const MyPage = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [columns, setColumns] = useState<3 | 4>(4);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [detailViewComboId, setDetailViewComboId] = useState<number | null>(null);
  const [savedScrollPosition, setSavedScrollPosition] = useState<number>(0);

  const menuRef = useRef<HTMLDivElement>(null);
  const sidebarContentRef = useRef<HTMLDivElement>(null);
  const combinationListRef = useRef<HTMLDivElement>(null);

  // API 호출
  const { data: combos = [], isLoading, isError } = useGetCombos();
  const { data: comboDetail } = useGetCombo(detailViewComboId);
  const { mutate: updateCombo, isPending: isUpdating } = usePutCombo();
  const { mutate: deleteCombo, isPending: isDeleting } = useDeleteCombo();
  const { mutate: togglePin } = usePostComboPin();
  const { mutate: deleteDevice, isPending: isDeletingDevice } = useDeleteComboDevice();
  const { user: userProfile, isAuthLoading } = useAuth();
  const { data: evaluation, isLoading: isEvaluationLoading } = useComboEvaluation(
    detailViewComboId ?? undefined
  );

  // 커스텀 훅
  const modals = useCombinationModals();
  const deviceSelection = useDeviceSelection();
  const { sortOption, setSortOption, sortedCombos } = useCombinationSort(combos);
  const combinationEdit = useCombinationEdit(combos);

  // 유저 라이프스타일 태그 변환
  const lifestyleKey = useMemo<LifestyleKey | undefined>(() => {
    const raw = userProfile?.lifestyleList?.[0];
    if (!raw) return undefined;
    return raw.replace(/^#\s*/, '') as LifestyleKey;
  }, [userProfile]);

  // 평가 데이터 변환
  const evaluationCards = useMemo(() => {
    if (!evaluation) return null;
    return mapEvaluationToUI(evaluation, lifestyleKey);
  }, [evaluation, lifestyleKey]);

  // 스크롤 감지 (하단 그라데이션용 + Top 버튼용)
  const { isAtBottom, showTopButton } = useMyPageScroll(combinationListRef);

  // 브레이크포인트 감지 (칼럼 수 반응형)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1536px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setColumns(e.matches ? 4 : 3);
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 드롭다운 외부 클릭 시 닫기
  useClickOutside(menuRef, () => setOpenMenuIndex(null));

  // 모달 열릴 때 배경 스크롤 방지
  const isAnyModalOpen =
    modals.showDeleteModal ||
    modals.showCombinationDeleteModal ||
    modals.showSaveModal ||
    modals.showDeleteSuccessModal ||
    modals.showSaveSuccessModal;
  useModalScrollLock(isAnyModalOpen);

  // 자세히보기 클릭 핸들러
  const handleDetailView = (comboId: number) => {
    setSavedScrollPosition(window.scrollY);
    setDetailViewComboId(comboId);
    setOpenMenuIndex(null);
    deviceSelection.clearSelection();
    window.scrollTo(0, 0);
  };

  // 뒤로가기 핸들러
  const handleBackToNormal = () => {
    setDetailViewComboId(null);
    deviceSelection.clearSelection();
    window.scrollTo(0, savedScrollPosition);
  };

  // 선택된 기기 삭제 핸들러
  const handleDeleteDevices = async () => {
    if (!detailViewComboId || deviceSelection.selectedDevices.length === 0) return;

    try {
      for (const deviceId of deviceSelection.selectedDevices) {
        await new Promise<void>((resolve, reject) => {
          deleteDevice(
            { comboId: detailViewComboId, deviceId },
            {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            }
          );
        });
      }

      deviceSelection.clearSelection();
      modals.closeDeleteModal();

      setTimeout(() => {
        modals.openDeleteSuccessModal();
      }, 300);
    } catch (error) {
      console.error('기기 삭제 중 오류 발생:', error);
    }
  };

  // 휴지통 클릭 핸들러
  const handleTrashClick = () => {
    if (deviceSelection.selectedDevices.length > 0) {
      modals.openDeleteModal();
    }
  };

  // 조합 삭제 핸들러
  const handleDeleteCombination = () => {
    if (modals.deleteTargetComboId === null) return;

    deleteCombo(modals.deleteTargetComboId, {
      onSuccess: () => {
        modals.closeCombinationDeleteModal();

        if (detailViewComboId !== null) {
          setDetailViewComboId(null);
          deviceSelection.clearSelection();
        }

        setTimeout(() => {
          modals.openDeleteSuccessModal();
        }, 300);
      },
      onError: (error) => {
        console.error('조합 삭제 실패:', error);
      },
    });
  };

  // Pin 토글 핸들러
  const handleTogglePin = (e: React.MouseEvent, comboId: number) => {
    e.stopPropagation();
    togglePin(comboId);
  };

  // 조합명 저장 핸들러
  const handleSaveCombinationName = () => {
    if (combinationEdit.editingComboId === null) return;

    const finalError = combinationEdit.validateComboName(combinationEdit.editingCombinationName);
    if (finalError) {
      combinationEdit.setComboNameError(finalError);
      return;
    }

    const trimmedName = combinationEdit.editingCombinationName.trim();

    updateCombo(
      { comboId: combinationEdit.editingComboId, comboName: trimmedName },
      {
        onSuccess: () => {
          modals.closeSaveModal();
          combinationEdit.stopEditing();

          setTimeout(() => {
            modals.openSaveSuccessModal();
          }, 300);
        },
        onError: (error) => {
          console.error('조합명 수정 실패:', error);
        },
      }
    );
  };

  // 맨 위로 스크롤
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-white relative ${isAtBottom ? 'bg-effect-fade-bottom' : ''}`}>
      <GNB />

      <div className="flex pt-52">
        {/* 좌측 사이드바 */}
        <MyPageSidebar
          userProfile={userProfile}
          isAuthLoading={isAuthLoading}
          sidebarContentRef={sidebarContentRef}
        />

        {/* 우측 메인 콘텐츠 */}
        <main
          className="flex-1 pt-64"
          style={{
            paddingLeft: 'clamp(80px, calc(80px + (100vw - 1440px) * 0.166667), 160px)',
            paddingRight: 'clamp(80px, calc(80px + (100vw - 1440px) * 0.166667), 160px)',
          }}
        >
          {/* 헤더: 내 조합 + 새 조합 추가하기 / 조합 삭제하기 */}
          <div className="flex items-center justify-between h-72">
            <h2 className="font-heading-2 text-black">내 조합</h2>
            {detailViewComboId !== null ? (
              <button
                onClick={() => modals.openCombinationDeleteModal(detailViewComboId)}
                className="w-280 h-52 border-2 border-warning rounded-button flex items-center justify-center cursor-pointer hover:bg-warning/10 transition-colors"
              >
                <span className="font-body-2-sm text-warning">조합 삭제하기</span>
              </button>
            ) : (
              <PrimaryButton
                text="새 조합 추가하기"
                onClick={() => navigate('/combination/create')}
                className="w-280 bg-blue-600 hover:bg-blue-500"
              />
            )}
          </div>

          {/* 조합 카드 목록 */}
          <CombinationList
            combinationListRef={combinationListRef}
            sortedCombos={sortedCombos}
            isLoading={isLoading}
            isError={isError}
            detailViewComboId={detailViewComboId}
            comboDetail={comboDetail}
            columns={columns}
            sortOption={sortOption}
            setSortOption={setSortOption}
            openMenuIndex={openMenuIndex}
            setOpenMenuIndex={setOpenMenuIndex}
            menuRef={menuRef}
            combinationEdit={combinationEdit}
            modals={modals}
            deviceSelection={deviceSelection}
            evaluationCards={evaluationCards}
            isEvaluationLoading={isEvaluationLoading}
            handleDetailView={handleDetailView}
            handleBackToNormal={handleBackToNormal}
            handleTogglePin={handleTogglePin}
            handleTrashClick={handleTrashClick}
          />

          {/* Top Button */}
          {showTopButton && (
            <button
              onClick={handleScrollToTop}
              className="fixed right-48 bottom-48 w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300"
              aria-label="맨 위로 이동"
            >
              <TopIcon className="w-48 h-48 text-gray-300" />
            </button>
          )}

          {/* 하단 여백 */}
          <div className="h-268" />
        </main>
      </div>

      {/* 모달들 */}
      {modals.showDeleteModal && (
        <DeviceDeleteModal
          isDeleting={isDeletingDevice}
          onConfirm={handleDeleteDevices}
          onCancel={modals.closeDeleteModal}
        />
      )}

      {modals.showCombinationDeleteModal && modals.deleteTargetComboId !== null && (() => {
        const targetCombo = sortedCombos.find((c) => c.comboId === modals.deleteTargetComboId);
        if (!targetCombo) return null;
        return (
          <CombinationDeleteModal
            comboName={targetCombo.comboName}
            isDeleting={isDeleting}
            onConfirm={handleDeleteCombination}
            onCancel={modals.closeCombinationDeleteModal}
          />
        );
      })()}

      {modals.showSaveModal && (
        <SaveNameModal
          isSaving={isUpdating}
          onConfirm={handleSaveCombinationName}
          onCancel={modals.closeSaveModal}
        />
      )}

      {modals.showDeleteSuccessModal && (
        <DeleteCompleteModal isFadingOut={modals.isDeleteFadingOut} />
      )}

      {modals.showSaveSuccessModal && (
        <SaveCompleteModal isFadingOut={modals.isSaveFadingOut} />
      )}
    </div>
  );
};

export default MyPage;
