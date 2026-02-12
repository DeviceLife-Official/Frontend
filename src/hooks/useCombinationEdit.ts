import { useState, useCallback, useMemo } from 'react';
import type { ComboListItem } from '@/types/combo/combo';

export interface UseCombinationEditReturn {
  editingComboId: number | null;
  editingCombinationName: string;
  comboNameError: string | null;
  isComboNameValid: boolean;
  startEditing: (comboId: number, comboName: string) => void;
  stopEditing: () => void;
  handleComboNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateComboName: (name: string) => string | null;
  setComboNameError: (error: string | null) => void;
}

export const useCombinationEdit = (combos: ComboListItem[]): UseCombinationEditReturn => {
  const [editingComboId, setEditingComboId] = useState<number | null>(null);
  const [editingCombinationName, setEditingCombinationName] = useState('');
  const [comboNameError, setComboNameError] = useState<string | null>(null);

  // 조합명 유효성 검사 함수
  const validateComboName = useCallback(
    (name: string): string | null => {
      // 1. 빈 값 체크
      if (name.length === 0) {
        return '조합명을 입력해주세요.';
      }

      // 2. 공백만 입력 체크
      if (name.trim().length === 0) {
        return '조합명을 한 글자 이상 입력해주세요.';
      }

      // 3. 최대 길이 체크 (20자)
      if (name.length > 20) {
        return '조합명은 최대 20자까지 입력 가능합니다.';
      }

      // 4. 중복 체크 (현재 수정 중인 조합 제외, trim 후 대소문자 구분 없이 비교)
      if (editingComboId !== null) {
        const isDuplicate = combos.some(
          (c) =>
            c.comboId !== editingComboId &&
            c.comboName.trim().toLowerCase() === name.trim().toLowerCase()
        );
        if (isDuplicate) {
          return '이미 존재하는 조합명입니다. 다른 이름을 시도해주세요.';
        }
      }

      return null; // 유효함
    },
    [combos, editingComboId]
  );

  // 조합명이 유효한지 여부
  const isComboNameValid = useMemo(() => {
    return validateComboName(editingCombinationName) === null;
  }, [editingCombinationName, validateComboName]);

  // 조합명 입력 핸들러 (길이 제한 + 실시간 검사)
  const handleComboNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // 최대 길이 20자로 제한 (입력 자체를 막음)
    if (newValue.length > 20) {
      return;
    }

    setEditingCombinationName(newValue);

    // 실시간 검사 (입력 중에는 빈 값/공백만 에러는 표시하지 않음)
    if (newValue.length > 0 && newValue.trim().length > 0) {
      const error = validateComboName(newValue);
      setComboNameError(error);
    } else {
      setComboNameError(null);
    }
  };

  // 편집 시작
  const startEditing = (comboId: number, comboName: string) => {
    setEditingComboId(comboId);
    setEditingCombinationName(comboName);
    setComboNameError(null);
  };

  // 편집 종료
  const stopEditing = () => {
    setEditingComboId(null);
    setEditingCombinationName('');
    setComboNameError(null);
  };

  return {
    editingComboId,
    editingCombinationName,
    comboNameError,
    isComboNameValid,
    startEditing,
    stopEditing,
    handleComboNameChange,
    validateComboName,
    setComboNameError,
  };
};
