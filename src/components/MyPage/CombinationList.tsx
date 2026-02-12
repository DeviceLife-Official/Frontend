import { type RefObject, useState, useMemo } from 'react';
import SecondaryButton from '@/components/Button/SecondaryButton';
import SortDropdown from '@/components/Filter/SortDropdown';
import CombinationMenu from '@/components/MyPage/CombinationMenu';
import CombinationCard from '@/components/MyPage/CombinationCard';
import EmptyCombinationCard from '@/components/MyPage/EmptyCombinationCard';
import CombinationDetailView from '@/components/MyPage/CombinationDetailView';
import SettingMoreIcon from '@/assets/icons/settingmore.svg?react';
import AlarmIcon from '@/assets/icons/alarm.svg?react';
import { MYPAGE_SORT_OPTIONS } from '@/constants/combination';
import type { ComboListItem, GetComboResult } from '@/types/combo/combo';
import type { UseCombinationEditReturn } from '@/hooks/useCombinationEdit';
import type { UseCombinationModalsReturn } from '@/hooks/useCombinationModals';
import type { UseDeviceSelectionReturn } from '@/hooks/useDeviceSelection';
import type { EvaluationCardUI } from '@/utils/mapEvaluationToUI';

interface CombinationListProps {
  combinationListRef: RefObject<HTMLDivElement>;
  sortedCombos: ComboListItem[];
  isLoading: boolean;
  isError: boolean;
  detailViewComboId: number | null;
  comboDetail: GetComboResult | undefined;
  columns: 3 | 4;
  sortOption: string;
  setSortOption: (option: string) => void;
  openMenuIndex: number | null;
  setOpenMenuIndex: (index: number | null) => void;
  menuRef: RefObject<HTMLDivElement>;
  combinationEdit: UseCombinationEditReturn;
  modals: UseCombinationModalsReturn;
  deviceSelection: UseDeviceSelectionReturn;
  evaluationCards: EvaluationCardUI[] | null;
  isEvaluationLoading: boolean;
  handleDetailView: (comboId: number) => void;
  handleBackToNormal: () => void;
  handleTogglePin: (e: React.MouseEvent, comboId: number) => void;
  handleTrashClick: () => void;
  handleSaveScrollBeforeNavigate: () => void;
}

const CombinationList = ({
  combinationListRef,
  sortedCombos,
  isLoading,
  isError,
  detailViewComboId,
  comboDetail,
  columns,
  sortOption,
  setSortOption,
  openMenuIndex,
  setOpenMenuIndex,
  menuRef,
  combinationEdit,
  modals,
  deviceSelection,
  evaluationCards,
  isEvaluationLoading,
  handleDetailView,
  handleBackToNormal,
  handleTogglePin,
  handleTrashClick,
  handleSaveScrollBeforeNavigate,
}: CombinationListProps) => {
  // Lazy Loading: 초기 12개, 더 보기 클릭 시 12개씩 추가
  const INITIAL_DISPLAY_COUNT = 12;
  const LOAD_MORE_COUNT = 12;
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

  // 실제 렌더링할 조합 목록 (Detail View가 아닐 때만 Lazy Loading 적용)
  const displayedCombos = useMemo(() => {
    if (detailViewComboId !== null) {
      // Detail View: 모든 조합 표시 (필터링된 조합 찾기 위해)
      return sortedCombos;
    }
    // Normal View: displayCount만큼만 표시
    return sortedCombos.slice(0, displayCount);
  }, [sortedCombos, displayCount, detailViewComboId]);

  const hasMore = sortedCombos.length > displayCount && detailViewComboId === null;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + LOAD_MORE_COUNT);
  };

  return (
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
      {displayedCombos.map((combination, index) => {
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
                        combinationEdit.startEditing(combination.comboId, combination.comboName);
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
                  onSaveScrollBeforeNavigate={handleSaveScrollBeforeNavigate}
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
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* 더 보기 버튼 */}
      {hasMore && (
        <div className="flex justify-center mt-40">
          <button
            onClick={handleLoadMore}
            className="px-40 py-16 bg-blue-600 text-white font-body-2-sb rounded-button hover:bg-blue-500 transition-colors"
          >
            더 보기 ({sortedCombos.length - displayCount}개 남음)
          </button>
        </div>
      )}
    </div>
  );
};

export default CombinationList;
