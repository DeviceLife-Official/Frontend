import { useState, useEffect } from 'react';

export interface UseCombinationModalsReturn {
  // 기기 삭제 모달
  showDeleteModal: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;

  // 조합 삭제 모달
  showCombinationDeleteModal: boolean;
  deleteTargetComboId: number | null;
  openCombinationDeleteModal: (comboId: number) => void;
  closeCombinationDeleteModal: () => void;

  // 조합명 저장 모달
  showSaveModal: boolean;
  openSaveModal: () => void;
  closeSaveModal: () => void;

  // 삭제 완료 팝업
  showDeleteSuccessModal: boolean;
  isDeleteFadingOut: boolean;
  openDeleteSuccessModal: () => void;

  // 저장 완료 팝업
  showSaveSuccessModal: boolean;
  isSaveFadingOut: boolean;
  openSaveSuccessModal: () => void;
}

export const useCombinationModals = (): UseCombinationModalsReturn => {
  // 기기 삭제 모달
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 조합 삭제 모달
  const [showCombinationDeleteModal, setShowCombinationDeleteModal] = useState(false);
  const [deleteTargetComboId, setDeleteTargetComboId] = useState<number | null>(null);

  // 조합명 저장 모달
  const [showSaveModal, setShowSaveModal] = useState(false);

  // 삭제 완료 팝업
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [isDeleteFadingOut, setIsDeleteFadingOut] = useState(false);

  // 저장 완료 팝업
  const [showSaveSuccessModal, setShowSaveSuccessModal] = useState(false);
  const [isSaveFadingOut, setIsSaveFadingOut] = useState(false);

  // 삭제 완료 팝업 자동 닫기 (0.8초 유지 후 0.2초 fade-out)
  useEffect(() => {
    if (showDeleteSuccessModal) {
      const holdTimer = setTimeout(() => {
        setIsDeleteFadingOut(true);

        const closeTimer = setTimeout(() => {
          setShowDeleteSuccessModal(false);
          setIsDeleteFadingOut(false);
        }, 200);

        return () => clearTimeout(closeTimer);
      }, 800);

      return () => clearTimeout(holdTimer);
    }
  }, [showDeleteSuccessModal]);

  // 저장 완료 팝업 자동 닫기 (0.8초 유지 후 0.2초 fade-out)
  useEffect(() => {
    if (showSaveSuccessModal) {
      const holdTimer = setTimeout(() => {
        setIsSaveFadingOut(true);

        const closeTimer = setTimeout(() => {
          setShowSaveSuccessModal(false);
          setIsSaveFadingOut(false);
        }, 200);

        return () => clearTimeout(closeTimer);
      }, 800);

      return () => clearTimeout(holdTimer);
    }
  }, [showSaveSuccessModal]);

  return {
    // 기기 삭제 모달
    showDeleteModal,
    openDeleteModal: () => setShowDeleteModal(true),
    closeDeleteModal: () => setShowDeleteModal(false),

    // 조합 삭제 모달
    showCombinationDeleteModal,
    deleteTargetComboId,
    openCombinationDeleteModal: (comboId: number) => {
      setDeleteTargetComboId(comboId);
      setShowCombinationDeleteModal(true);
    },
    closeCombinationDeleteModal: () => {
      setShowCombinationDeleteModal(false);
      setDeleteTargetComboId(null);
    },

    // 조합명 저장 모달
    showSaveModal,
    openSaveModal: () => setShowSaveModal(true),
    closeSaveModal: () => setShowSaveModal(false),

    // 삭제 완료 팝업
    showDeleteSuccessModal,
    isDeleteFadingOut,
    openDeleteSuccessModal: () => setShowDeleteSuccessModal(true),

    // 저장 완료 팝업
    showSaveSuccessModal,
    isSaveFadingOut,
    openSaveSuccessModal: () => setShowSaveSuccessModal(true),
  };
};
