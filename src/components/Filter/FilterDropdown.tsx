import { useState, useRef, useEffect } from 'react';
import CheckboxIcon from '@/assets/icons/checkbox.svg?react';
import CheckboxOnIcon from '@/assets/icons/checkbox_on.svg?react';
import DropdownIcon from '@/assets/icons/dropdown.svg?react';
import type { FilterOption } from '@/constants/devices';

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValue: string | string[] | null;
  onSelect: (value: string | string[] | null) => void;
  multiple?: boolean;
}

const FilterDropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  multiple = false,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* 드롭다운 외부 클릭 처리 */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSelected = (value: string) => {
    if (multiple && Array.isArray(selectedValue)) {
      return selectedValue.includes(value);
    }
    return selectedValue === value;
  };

  const hasSelection = multiple
    ? Array.isArray(selectedValue) && selectedValue.length > 0
    : selectedValue !== null;

  const getSelectedLabel = () => {
    if (multiple && Array.isArray(selectedValue) && selectedValue.length > 0) {
      // options 순서에 따라 정렬 (가격 순서 등 원래 정의된 순서 유지)
      const sortedValues = [...selectedValue].sort((a, b) => {
        const indexA = options.findIndex(opt => opt.value === a);
        const indexB = options.findIndex(opt => opt.value === b);
        return indexA - indexB;
      });

      if (sortedValues.length === 1) {
        return options.find(opt => opt.value === sortedValues[0])?.label || label;
      }
      return `${options.find(opt => opt.value === sortedValues[0])?.label} 외 ${sortedValues.length - 1}개`;
    }
    if (!multiple && selectedValue && typeof selectedValue === 'string') {
      return options.find(opt => opt.value === selectedValue)?.label || label;
    }
    return label;
  };

  const handleSelect = (value: string) => {
    if (multiple) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
      if (currentValues.includes(value)) {
        const newValues = currentValues.filter(v => v !== value);
        onSelect(newValues.length > 0 ? newValues : []);
      } else {
        onSelect([...currentValues, value]);
      }
    } else {
      onSelect(selectedValue === value ? null : value);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative flex flex-col gap-16">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center gap-16 pl-16 pr-8 py-8 rounded-button cursor-pointer ${
          hasSelection
            ? 'border-2 border-blue-600'
            : isOpen
            ? 'border border-gray-400'
            : 'border border-black'
        }`}
      >
        <p className={`font-body-1-sm whitespace-nowrap ${
          hasSelection
            ? 'text-blue-600'
            : isOpen
            ? 'text-gray-400'
            : 'text-black'
        }`}>
          {getSelectedLabel()}
        </p>
        <div className="flex items-center justify-center">
          <DropdownIcon
            className={`w-40 h-40 transition-transform duration-600 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            } ${
              hasSelection
                ? 'text-blue-600'
                : isOpen
                ? 'text-gray-400'
                : 'text-black'
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-8 bg-white rounded-button shadow-[0_2px_10px_rgba(0,0,0,0.25)] p-12 z-12 flex flex-col">
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`group relative flex items-center gap-10 justify-between pb-10 cursor-pointer ${
                index === 0 ? '' : 'pt-10'
              } ${
                index < options.length - 1
                  ? 'border-b border-black'
                  : ''
              }`}
            >
              {/* 호버 시 회색 배경 - 구분선과 분리 */}
              <div className={`absolute -inset-x-4 bg-gray-100 rounded-button -z-10 opacity-0 group-hover:opacity-100 transition-opacity ${
                index === 0 ? '-top-4 bottom-4' : 'inset-y-4'
              }`} />
              <p className="font-body-1-r text-black whitespace-nowrap">{option.label}</p>
              {isSelected(option.value) ? (
                <CheckboxOnIcon className="w-32 h-32 flex-shrink-0" />
              ) : (
                <CheckboxIcon className="w-32 h-32 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
