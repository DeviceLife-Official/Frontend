import { useState, useRef, useEffect } from 'react';
import DropdownIcon from '@/assets/icons/dropdown.svg?react';
import type { FilterOption } from '@/constants/devices';

interface SortDropdownProps {
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const SortDropdown = ({
  options,
  selectedValue,
  onSelect,
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label;

  return (
    <div ref={dropdownRef} className="relative flex flex-col items-end gap-16">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-8 cursor-pointer"
      >
        <p className="font-body-1-sm text-black whitespace-nowrap">
          {selectedLabel}
        </p>
        <div className="flex items-center justify-center">
          <DropdownIcon
            className={`w-40 h-40 transition-transform text-black ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-8 bg-white rounded-button shadow-[0_2px_10px_rgba(0,0,0,0.25)] px-8 z-12 flex flex-col"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              className={`relative font-body-1-sm text-black text-left py-12 whitespace-nowrap cursor-pointer ${
                index < options.length - 1
                  ? 'border-b border-black/50'
                  : ''
              }`}
            >
              {/* 회색 배경 (선택 또는 호버 시) - 구분선과 분리 */}
              {((hoveredIndex === null && selectedValue === option.value) || hoveredIndex === index) && (
                <div className="absolute -inset-x-4 inset-y-4 bg-gray-100 rounded-button -z-10" />
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
