import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import GNB from '@/components/Home/GNB';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import SortDropdown from '@/components/Filter/SortDropdown';
import MyPageSidebar from '@/components/MyPage/MyPageSidebar';
import CombinationMenu from '@/components/MyPage/CombinationMenu';
import CombinationCard from '@/components/MyPage/CombinationCard';
import EmptyCombinationCard from '@/components/MyPage/EmptyCombinationCard';
import CombinationDetailView from '@/components/MyPage/CombinationDetailView';
import DeviceDeleteModal from '@/components/MyPage/DeviceDeleteModal';
import CombinationDeleteModal from '@/components/MyPage/CombinationDeleteModal';
import SaveNameModal from '@/components/MyPage/SaveNameModal';
import DeleteCompleteModal from '@/components/MyPage/DeleteCompleteModal';
import SaveCompleteModal from '@/components/DeviceSearch/SaveCompleteModal';
import SettingMoreIcon from '@/assets/icons/settingmore.svg?react';
import AlarmIcon from '@/assets/icons/alarm.svg?react';
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
import { mapEvaluationToUI } from '@/utils/mapEvaluationToUI';
import { MYPAGE_SORT_OPTIONS } from '@/constants/combination';
import type { LifestyleKey } from '@/constants/evaluation/lifestyle';

const MyPage = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [columns, setColumns] = useState<3 | 4>(4);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [detailViewComboId, setDetailViewComboId] = useState<number | null>(null);
  const [savedScrollPosition, setSavedScrollPosition] = useState<number>(0);
  const [showTopButton, setShowTopButton] = useState(false);

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
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setIsAtBottom(scrollTop + windowHeight >= documentHeight - 50);

      // 조합 3개 정도 스크롤 시 Top 버튼 표시
      if (combinationListRef.current) {
        const listTop = combinationListRef.current.offsetTop;
        const thirdCombinationVisible = scrollTop + windowHeight >= listTop + 800;
        setShowTopButton(thirdCombinationVisible);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <div ref={combinationListRef} className="mt-76 flex flex-col gap-40">
            {isLoading && (
              <div className="flex items-center justify-center py-100">
                <p className="font-body-2-r text-gray-400">조합 목록을 불러오는 중...</p>
              </div>
            )}
            {isError && (
              <div className="flex items-center justify-center py-100">
                <p className="font-body-2-r text-warning">조합 목록을 불러오는데 실패했습니다.</p>
              </div>
            )}
            {!isLoading && !isError && sortedCombos.length === 0 && (
              <div className="flex items-center justify-center py-100">
                <p className="font-body-2-r text-gray-400">등록된 조합이 없습니다.</p>
              </div>
            )}
            {sortedCombos.map((combination, index) => {
              const isDetailView = detailViewComboId === combination.comboId;
              const hasDevices = combination.deviceCount > 0;
              const devices = isDetailView && comboDetail ? comboDetail.devices : [];
              const deviceIds = devices.map((d) => d.deviceId);

              // 상세보기 모드일 때 선택된 조합만 표시
              if (detailViewComboId !== null && !isDetailView) {
                return null;
              }

              return (
                <div key={combination.comboId}>
                  {/* 추천 메시지 + 정렬 필터 - 상세보기 모드가 아닐 때만 표시 */}
                  {!isDetailView && (
                    <div className="flex items-center justify-between mb-24">
                      <div className="flex items-center gap-16">
                        <AlarmIcon className="w-36 h-36 text-blue-600 flex-shrink-0" />
                        <p className="font-body-2-r text-blue-600">
                          {hasDevices
                            ? '추천하는 조합입니다. 기기 간 호환성이 우수하며 만족도가 높을 것입니다.'
                            : '-'}
                        </p>
                      </div>
                      {index === 0 && sortedCombos.length > 1 && (
                        <SortDropdown
                          options={MYPAGE_SORT_OPTIONS}
                          selectedValue={sortOption}
                          onSelect={setSortOption}
                        />
                      )}
                    </div>
                  )}

                  {/* 조합 카드 */}
                  <div
                    onClick={() =>
                      !isDetailView &&
                      combinationEdit.editingComboId !== combination.comboId &&
                      hasDevices &&
                      handleDetailView(combination.comboId)
                    }
                    className={`rounded-card relative ${
                      isDetailView
                        ? 'bg-blue-100'
                        : `bg-white shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-shadow ${hasDevices ? 'cursor-pointer hover:shadow-[0_0_12px_rgba(0,105,240,0.5)]' : ''}`
                    }`}
                  >
                    {/* 일반 모드: Setting More 버튼 + 드롭다운 또는 저장하기 버튼 */}
                    {!isDetailView && (
                      <div
                        ref={openMenuIndex === combination.comboId ? menuRef : null}
                        className={`absolute right-56 ${combinationEdit.editingComboId === combination.comboId ? 'top-48' : 'top-72'}`}
                      >
                        {combinationEdit.editingComboId === combination.comboId ? (
                          <SecondaryButton
                            text="저장하기"
                            onClick={() => {
                              const error = combinationEdit.validateComboName(
                                combinationEdit.editingCombinationName
                              );
                              combinationEdit.setComboNameError(error);
                              if (!error) {
                                modals.openSaveModal();
                              }
                            }}
                            disabled={
                              !combinationEdit.isComboNameValid ||
                              combinationEdit.editingCombinationName.trim().length === 0
                            }
                            className="w-150"
                          />
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuIndex(
                                openMenuIndex === combination.comboId ? null : combination.comboId
                              );
                            }}
                            className="cursor-pointer hover:opacity-80"
                          >
                            <SettingMoreIcon className="w-36 h-36 text-gray-400" />
                          </button>
                        )}

                        {openMenuIndex === combination.comboId && (
                          <CombinationMenu
                            hasDevices={hasDevices}
                            onDelete={() => {
                              modals.openCombinationDeleteModal(combination.comboId);
                              setOpenMenuIndex(null);
                            }}
                            onRename={() => {
                              combinationEdit.startEditing(
                                combination.comboId,
                                combination.comboName
                              );
                              setOpenMenuIndex(null);
                            }}
                            onDetail={hasDevices ? () => handleDetailView(combination.comboId) : undefined}
                          />
                        )}
                      </div>
                    )}

                    {/* 상세보기 모드 */}
                    {isDetailView ? (
                      <CombinationDetailView
                        combination={combination}
                        index={index}
                        devices={devices}
                        deviceIds={deviceIds}
                        columns={columns}
                        selectedDevices={deviceSelection.selectedDevices}
                        totalPrice={comboDetail?.totalPrice ?? combination.totalPrice}
                        evaluationCards={evaluationCards}
                        isEvaluationLoading={isEvaluationLoading}
                        onBack={handleBackToNormal}
                        onTogglePin={handleTogglePin}
                        onSelectAll={deviceSelection.handleSelectAll}
                        onSelectDevice={deviceSelection.handleSelectDevice}
                        onTrashClick={handleTrashClick}
                      />
                    ) : (
                      /* 일반 모드 */
                      <>
                        {hasDevices ? (
                          <CombinationCard
                            combination={combination}
                            index={index}
                            columns={columns}
                            isEditing={combinationEdit.editingComboId === combination.comboId}
                            editingName={combinationEdit.editingCombinationName}
                            nameError={combinationEdit.comboNameError}
                            onTogglePin={handleTogglePin}
                            onNameChange={combinationEdit.handleComboNameChange}
                            onNameBlur={(name) => {
                              const error = combinationEdit.validateComboName(name);
                              combinationEdit.setComboNameError(error);
                            }}
                          />
                        ) : (
                          <EmptyCombinationCard
                            comboId={combination.comboId}
                            comboName={combination.comboName}
                            createdAt={combination.createdAt}
                            isPinned={combination.isPinned}
                            index={index}
                            onTogglePin={handleTogglePin}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

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
