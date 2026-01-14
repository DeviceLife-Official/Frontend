import { useState, useEffect, useRef } from 'react';
import HomeIndicator from '@/components/Home/HomeIndicator';
import ProductCard from '@/components/ProductCard/ProductCard';
import CheckboxIcon from '@/assets/icons/checkbox.svg?react';
import CheckboxOnIcon from '@/assets/icons/checkbox_on.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import DropdownIcon from '@/assets/icons/dropdown.svg?react';
import FilterIcon from '@/assets/icons/filter.svg?react';
import TopIcon from '@/assets/icons/top.svg?react';

import {
  DEVICE_CATEGORIES,
  SORT_OPTIONS,
  PRICE_OPTIONS,
  BRAND_OPTIONS,
  SCROLL_CONSTANTS,
} from '@/constants/devices';
import { MOCK_PRODUCTS } from '@/constants/mockData';

const DeviceSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState('latest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  const productGridRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      /* 맨 마지막 스크롤 도달 여부 체크 */
      const reachedBottom =
        scrollTop + windowHeight >= documentHeight - SCROLL_CONSTANTS.BOTTOM_BUFFER;
      setIsAtBottom(reachedBottom);

      /* 3행이 완전히 보일 때 Top 버튼 표시 */
      if (productGridRef.current) {
        const gridTop = productGridRef.current.offsetTop;
        const thirdRowVisible =
          scrollTop + windowHeight >= gridTop + SCROLL_CONSTANTS.TOP_BUTTON_THRESHOLD;
        setShowTopButton(thirdRowVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* 드롭다운 외부 클릭 처리 */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setShowPriceFilter(false);
      }
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setShowBrandFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-white relative ${isAtBottom ? 'bg-effect-fade-bottom' : ''}`}>
      <HomeIndicator />

      {/* Main Content */}
      {/* <div className="pt-108"> */}
        {/* Search Bar */}
        <div className="flex justify-center pt-156">
          <div className="w-600 h-72 bg-blue-100 rounded-button px-10 py-20 flex items-center gap-12">
            <SearchIcon className="w-28 h-28 flex-shrink-0 text-black" />
            <input
              type="text"
              placeholder="기기명으로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent font-body-1-r text-gray-300 outline-none placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Device Categories */}
        <div className="w-full pt-80">
          <div className="w-1100 mx-auto 2xl:w-full 2xl:px-[328px] flex items-center justify-between">
            {DEVICE_CATEGORIES.map((category) => {
              const { Icon } = category;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center gap-12 cursor-pointer transition-colors ${
                    selectedCategory === category.id ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="w-60 h-60 flex items-center justify-center">
                    <Icon className="w-60 h-60" />
                  </div>
                  <p className="font-body-2-sm text-black whitespace-nowrap">{category.name}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-10 opacity-50 bg-gradient-to-t from-[#EEEEF0] to-[#E4E4E7] mt-88" />

        {/* Filter Section */}
        <div className="max-w-1600 mx-auto px-160 pt-68">
          
          {/* Filters */}
          <div className="flex items-center gap-0 pt-10">
            {/* Filter Icon */}
            <button className="w-48 h-48 flex items-center justify-center">
              <FilterIcon className="w-48 h-48 text-black" />
            </button>

            {/* Price Filter */}
            <div ref={priceRef} className="relative flex flex-col gap-16 ml-72">
              <button
                onClick={() => setShowPriceFilter(!showPriceFilter)}
                className={`flex items-center justify-center gap-[15px] pl-16 pr-10 py-10 rounded-button cursor-pointer ${
                  selectedPrice
                    ? 'border-2 border-blue-600'
                    : showPriceFilter
                    ? 'border border-gray-400'
                    : 'border border-black'
                }`}
              >
                <p className={`font-body-1-sm whitespace-nowrap ${
                  selectedPrice
                    ? 'text-blue-600'
                    : showPriceFilter
                    ? 'text-gray-400'
                    : 'text-black'
                }`}>
                  {selectedPrice ? PRICE_OPTIONS.find(opt => opt.value === selectedPrice)?.label : '가격대'}
                </p>
                <div className="flex items-center justify-center">
                  <DropdownIcon
                    className={`w-40 h-40 transition-transform ${
                      showPriceFilter ? 'rotate-180' : 'rotate-0'
                    } ${
                      selectedPrice
                        ? 'text-blue-600'
                        : showPriceFilter
                        ? 'text-gray-400'
                        : 'text-black'
                    }`}
                  />
                </div>
              </button>

              {showPriceFilter && (
                <div className="absolute left-0 top-full mt-6 bg-white rounded-button shadow-[0_2px_10px_rgba(0,0,0,0.25)] p-12 z-10 flex flex-col gap-16">
                  {PRICE_OPTIONS.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedPrice(selectedPrice === option.value ? null : option.value);
                        setShowPriceFilter(false);
                      }}
                      className={`flex items-center gap-12 justify-between pb-20 hover:bg-gray-100 transition-colors ${
                        index < PRICE_OPTIONS.length - 1
                          ? 'border-b border-black'
                          : ''
                      }`}
                    >
                      <p className="font-body-1-r text-black whitespace-nowrap">{option.label}</p>
                      {selectedPrice === option.value ? (
                        <CheckboxOnIcon className="w-32 h-32 flex-shrink-0" />
                      ) : (
                        <CheckboxIcon className="w-32 h-32 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Brand Filter */}
            <div ref={brandRef} className="relative flex flex-col gap-16 ml-32">
              <button
                onClick={() => setShowBrandFilter(!showBrandFilter)}
                className={`flex items-center justify-center gap-[15px] pl-16 pr-10 py-10 rounded-button cursor-pointer ${
                  selectedBrand
                    ? 'border-2 border-blue-600'
                    : showBrandFilter
                    ? 'border border-gray-400'
                    : 'border border-black'
                }`}
              >
                <p className={`font-body-1-sm whitespace-nowrap ${
                  selectedBrand
                    ? 'text-blue-600'
                    : showBrandFilter
                    ? 'text-gray-400'
                    : 'text-black'
                }`}>
                  {selectedBrand ? BRAND_OPTIONS.find(opt => opt.value === selectedBrand)?.label : '브랜드'}
                </p>
                <div className="flex items-center justify-center">
                  <DropdownIcon
                    className={`w-40 h-40 transition-transform ${
                      showBrandFilter ? 'rotate-180' : 'rotate-0'
                    } ${
                      selectedBrand
                        ? 'text-blue-600'
                        : showBrandFilter
                        ? 'text-gray-400'
                        : 'text-black'
                    }`}
                  />
                </div>
              </button>

              {showBrandFilter && (
                <div className="absolute left-0 top-full mt-6 bg-white rounded-button shadow-[0_2px_10px_rgba(0,0,0,0.25)] p-12 z-10 flex flex-col gap-16">
                  {BRAND_OPTIONS.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedBrand(selectedBrand === option.value ? null : option.value);
                        setShowBrandFilter(false);
                      }}
                      className={`flex items-center gap-10 justify-between pb-10 hover:bg-gray-100 transition-colors ${
                        index < BRAND_OPTIONS.length - 1
                          ? 'border-b border-black'
                          : ''
                      }`}
                    >
                      <p className="font-body-1-r text-black whitespace-nowrap">{option.label}</p>
                      {selectedBrand === option.value ? (
                        <CheckboxOnIcon className="w-32 h-32 flex-shrink-0" />
                      ) : (
                        <CheckboxIcon className="w-32 h-32 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

            <div className="flex items-center justify-between pt-80">
            {/* Left side - Result count */}
            <div className="flex items-center gap-2">
              <p className="font-body-1-sm text-black">40</p>
              <p className="font-body-1-r text-black">개 결과</p>
            </div>

            {/* Right side - Sort dropdown */}
            <div ref={sortRef} className="relative flex flex-col items-end gap-16">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-6 cursor-pointer"
              >
                <p className="font-body-1-sm text-black whitespace-nowrap">
                  {SORT_OPTIONS.find(opt => opt.value === sortOption)?.label}
                </p>
                <div className="flex items-center justify-center">
                  <DropdownIcon
                    className={`w-40 h-40 transition-transform text-black ${
                      showSortDropdown ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </div>
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-6 bg-white rounded-button shadow-[0_2px_10px_rgba(0,0,0,0.25)] p-12 z-10 flex flex-col gap-16">
                  {SORT_OPTIONS.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortOption(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`font-body-1-sm text-black text-left pb-10 whitespace-nowrap hover:bg-gray-100 transition-colors ${
                        sortOption === option.value
                          ? 'bg-gray-100'
                          : ''
                      } ${
                        index < SORT_OPTIONS.length - 1
                          ? sortOption === option.value
                            ? 'border-b border-black'
                            : 'border-b border-black/50'
                          : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div ref={productGridRef} className="max-w-1600 mx-auto px-160 pt-68">
          <div className="grid grid-cols-4 gap-x-28 gap-y-164">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Top Button - 3행이 보일 때만 표시 */}
        {showTopButton && (
          <button
            onClick={handleScrollToTop}
            className="fixed right-48 top-184 w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300"
            aria-label="맨 위로 이동"
          >
            <TopIcon className="w-48 h-48 text-gray-300" />
          </button>
        )}

        {/* Bottom Spacing */}
        <div className="h-268" />
      {/* </div> */}
    </div>
  );
};

export default DeviceSearchPage;
