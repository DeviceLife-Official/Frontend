import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import GNB from '@/components/Home/GNB';
import ProductCard from '@/components/ProductCard/ProductCard';
import PrimaryButton from '@/components/Button/PrimaryButton';
import CombinationTag from '@/components/Combination/CombinationTag';
import CombinationDeviceCard from '@/components/Combination/CombinationDeviceCard';
import ProductLife from '@/components/ProductCard/ProductLife';
import FilterDropdown from '@/components/Filter/FilterDropdown';
import SortDropdown from '@/components/Filter/SortDropdown';
import SearchIcon from '@/assets/icons/search.svg?react';
import FilterIcon from '@/assets/icons/filter.svg?react';
import TopIcon from '@/assets/icons/top.svg?react';
import XIcon from '@/assets/icons/X.svg?react';
import BackIcon from '@/assets/icons/back.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';
import MoreIcon from '@/assets/icons/more.svg?react';
import SaveIcon from '@/assets/icons/save.svg?react';

import {
  DEVICE_CATEGORIES,
  SORT_OPTIONS,
  PRICE_OPTIONS,
  BRAND_OPTIONS,
  SCROLL_CONSTANTS,
} from '@/constants/devices';
import { MOCK_PRODUCTS, MOCK_COMBINATIONS, MOCK_COMBINATION_DEVICES } from '@/constants/mockData';
import { type AuthStatus, type ModalView } from '@/types/devices';

const DeviceSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProductId = searchParams.get('productId');

  // 추후 Zustand/Context에서 인증 상태 가져오기
  const [authStatus] = useState<AuthStatus>('login'); // 테스트로 login으로 변경. 추후 logout으로 변경.
  const [modalView, setModalView] = useState<ModalView>('device');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState('latest');
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [selectedCombinationId, setSelectedCombinationId] = useState<number | null>(null);
  const [showAllDevices, setShowAllDevices] = useState(false);
  const [showSaveCompleteModal, setShowSaveCompleteModal] = useState(false);

  const productGridRef = useRef<HTMLDivElement>(null);

  // 페이지 마운트 시 상단으로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* 선택된 제품 찾기 */
  const selectedProduct = selectedProductId
    ? MOCK_PRODUCTS.find(p => p.id === Number(selectedProductId))
    : null;

  /* 모달 닫기 */
  const handleCloseModal = () => {
    searchParams.delete('productId');
    setSearchParams(searchParams);
    setModalView('device');
    setSelectedCombinationId(null);
    setShowAllDevices(false);
  };

  /* 내 조합에 담기 */
  const handleAddToCombination = () => {
    if (authStatus === 'logout') {
      // 로그인 페이지로 이동
      return;
    }

    // 조합이 1개면 바로 저장
    if (MOCK_COMBINATIONS.length === 1) {
      // API 호출 - 바로 저장
      console.log('바로 저장:', MOCK_COMBINATIONS[0].id);
      setShowSaveCompleteModal(true);
      return;
    }

    // 조합이 2개 이상이면 선택 모달 표시
    setModalView('combination');
  };

  /* 조합 선택 - 기기 리스트 보기 */
  const handleSelectCombination = (combinationId: number) => {
    setSelectedCombinationId(combinationId);
    setShowAllDevices(false);
    setModalView('combinationDetail');
  };

  /* 조합에 기기 담기 */
  const handleAddDeviceToCombination = () => {
    if (selectedCombinationId) {
      // API 호출 - 선택한 조합에 기기 추가
      console.log('조합에 기기 추가:', selectedCombinationId);
      setModalView('device'); // combinationDetail 모달 숨김
      setShowSaveCompleteModal(true);
    }
  };

  /* 저장 완료 모달 자동 닫기 */
  useEffect(() => {
    if (showSaveCompleteModal) {
      const timer = setTimeout(() => {
        setShowSaveCompleteModal(false);
        handleCloseModal();
      }, 800); // 0.8초
      return () => clearTimeout(timer);
    }
  }, [showSaveCompleteModal]);

  /* 선택된 조합 정보 */
  const selectedCombination = selectedCombinationId
    ? MOCK_COMBINATIONS.find(c => c.id === selectedCombinationId)
    : null;

  /* 선택된 조합의 기기 리스트 */
  const combinationDevices = selectedCombinationId
    ? MOCK_COMBINATION_DEVICES[selectedCombinationId] || []
    : [];

  /* 선택된 조합에 이미 담긴 기기인지 확인 */
  const isAlreadyInSelectedCombination = selectedCombinationId && selectedProductId
    ? combinationDevices.some(device => device.id === Number(selectedProductId))
    : false;

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

  /* 모달 열렸을 때 y 스크롤 방지 */
  useEffect(() => {
    if (selectedProduct) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'auto';
    }
    return () => {
      document.documentElement.style.overflowY = 'auto';
    };
  }, [selectedProduct]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-white relative ${isAtBottom ? 'bg-effect-fade-bottom' : ''}`}>
      <GNB />

      {/* Main Content */}
      {/* <div className="pt-108"> */}
        {/* Search + Categories Container */}
        <div className="flex justify-center pt-80">
          <div className="w-860 2xl:w-1142 flex flex-col items-center gap-36 2xl:gap-56">
            {/* Search Bar */}
            <div className="w-600 h-72 bg-blue-100 rounded-button px-12 py-20 flex items-center gap-12">
              <SearchIcon className="w-28 h-28 flex-shrink-0 text-black" />
              <input
                type="text"
                placeholder="기기명으로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent font-body-1-r text-gray-300 outline-none placeholder:text-gray-300"
              />
            </div>

            {/* Device Categories */}
            <div className="w-full flex items-center justify-between">
              {DEVICE_CATEGORIES.map((category) => {
                const { Icon } = category;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex flex-col items-center gap-12 cursor-pointer transition-colors ${
                      isSelected
                        ? 'text-blue-600'
                        : 'text-black hover:text-blue-500 active:text-blue-600'
                    }`}
                  >
                    <div className="w-50 h-50 2xl:w-60 2xl:h-60 flex items-center justify-center">
                      <Icon className="w-50 h-50 2xl:w-60 2xl:h-60" />
                    </div>
                    <p className="font-body-3-sm 2xl:font-body-2-sm whitespace-nowrap">{category.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-8 opacity-50 bg-gradient-to-t from-[#EEEEF0] to-[#E4E4E7] mt-84" />

        {/* Filter Section */}
        <div className="mx-auto px-160 2xl:px-200 pt-32">

          {/* Filters */}
          <div className="flex items-center gap-0">
            {/* Filter Icon */}
            <button className="w-48 h-48 flex items-center justify-center">
              <FilterIcon className={`w-48 h-48 ${selectedPrice.length > 0 || selectedBrand !== null ? 'text-blue-600' : 'text-black'}`} />
            </button>

            {/* Price Filter */}
            <div className="ml-72">
              <FilterDropdown
                label="가격대"
                options={PRICE_OPTIONS}
                selectedValue={selectedPrice}
                onSelect={(value) => setSelectedPrice(Array.isArray(value) ? value : [])}
                multiple
              />
            </div>

            {/* Brand Filter */}
            <div className="ml-32">
              <FilterDropdown
                label="브랜드"
                options={BRAND_OPTIONS}
                selectedValue={selectedBrand}
                onSelect={(value) => setSelectedBrand(value as string | null)}
              />
            </div>
          </div>

            <div className="flex items-center justify-between pt-80">
            {/* Left side - Result count */}
            <div className="flex items-center gap-2">
              <p className="font-body-1-sm text-black">40</p>
              <p className="font-body-1-r text-black">개 결과</p>
            </div>

            {/* Right side - Sort dropdown */}
            <SortDropdown
              options={SORT_OPTIONS}
              selectedValue={sortOption}
              onSelect={setSortOption}
             />
          </div>
        </div>

        {/* Product Grid */}
        <div ref={productGridRef} className="mx-auto px-120 2xl:px-160">
          <div className="grid grid-cols-3 2xl:grid-cols-4 gap-x-28 gap-y-164">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => {
                  searchParams.set('productId', product.id.toString());
                  setSearchParams(searchParams);
                }}
              />
            ))}
          </div>
        </div>

        {/* Top Button - 3행이 보일 때만 표시 */}
        {showTopButton && (
          <button
            onClick={handleScrollToTop}
            className="fixed right-48 bottom-48 w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300"
            aria-label="맨 위로 이동"
          >
            <TopIcon className="w-48 h-48 text-gray-300" />
          </button>
        )}

        {/* Bottom Spacing */}
        <div className="h-268" />
      {/* </div> */}

      {/* Device Detail Modal */}
      {selectedProduct && !showSaveCompleteModal && (
        <>
          {/* Background Overlay - HomeIndicator보다 높게 설정 */}
          <div
            className="fixed inset-0 bg-black/50 z-60"
            onClick={handleCloseModal}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex justify-center items-center z-72 pointer-events-none">
            {/* Device Info Modal */}
            {modalView === 'device' && (
              <div className="flex flex-col items-end gap-20 pointer-events-auto">
                {/* Close Button - 카드 바깥 */}
                <button
                  onClick={handleCloseModal}
                  className="w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label="닫기"
                >
                  <XIcon className="w-48 h-48 text-white" />
                </button>

                {/* Card */}
                <div
                  className="bg-white rounded-card px-56 py-40"
                  style={{
                    width: 'clamp(903px, calc(903px + (100vw - 1440px) * 0.245833), 1021px)',
                    height: '697px',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Content */}
                  <div className="flex items-start justify-between gap-56">
                    {/* Left Section */}
                    <div className="w-400 flex flex-col gap-32">
                      {/* Name & Price + Image */}
                      <div className="flex flex-col gap-20">
                        {/* Name & Price */}
                        <div className="flex flex-col gap-12">
                          <p className="font-heading-1 text-black">{selectedProduct.name}</p>
                          <div className="flex items-center gap-8 font-heading-2 text-blue-600">
                            <p>₩</p>
                            <p>{selectedProduct.price.toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="w-full h-360 bg-gray-200 relative">
                        </div>
                      </div>

                      {/* Button */}
                      <PrimaryButton
                        text={authStatus === 'logout' ? '로그인하고 내 조합에 담기' : '내 조합에 담기'}
                        onClick={handleAddToCombination}
                        className="w-full bg-blue-500 hover:bg-blue-400 transition-colors"
                      />
                    </div>

                    {/* Right Section */}
                    <div className="w-302 flex flex-col gap-56 pt-126">
                      {/* Product Info Table */}
                      <div className="flex flex-col justify-between h-360 pl-16">
                        <div className="flex items-center gap-80">
                          <p className="font-body-1-r text-gray-400">모델명</p>
                          <p className="font-body-1-r text-black">{selectedProduct.name}</p>
                        </div>
                        <div className="flex items-center gap-58">
                          <p className="font-body-1-r text-gray-400">카테고리</p>
                          <p className="font-body-1-r text-black">{selectedProduct.category}</p>
                        </div>
                        <div className="flex items-center gap-78">
                          <p className="font-body-1-r text-gray-400">브랜드</p>
                          <p className="font-body-1-r text-black">Apple</p>
                        </div>
                        <div className="flex items-center gap-100">
                          <p className="font-body-1-r text-gray-400">색상</p>
                          <p className="font-body-1-r text-black">내추럴 티타늄</p>
                        </div>
                        <div className="flex items-center gap-100">
                          <p className="font-body-1-r text-gray-400">가격</p>
                          <div className="flex items-center gap-4 font-body-1-r text-black">
                            <p>{selectedProduct.price.toLocaleString()}</p>
                            <p>원</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-56">
                          <p className="font-body-1-r text-gray-400">충전방식</p>
                          <p className="font-body-1-r text-black">USB-C</p>
                        </div>
                        <div className="flex items-center gap-80">
                          <p className="font-body-1-r text-gray-400">출시일</p>
                          <p className="font-body-1-r text-black">2023년 9월</p>
                        </div>
                      </div>

                      {/* Hashtags */}
                      <div className="flex items-center gap-16">
                        <ProductLife label="office" />
                        <ProductLife label="portability" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Combination Selection Modal */}
            {modalView === 'combination' && (
              <div className="flex flex-col items-end gap-20 pointer-events-auto">
                <div className="flex items-center justify-between w-full">
                  <button
                    onClick={() => setModalView('device')}
                    className="w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    aria-label="뒤로가기"
                  >
                    <BackIcon className="w-48 h-48" />
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    aria-label="닫기"
                  >
                    <XIcon className="w-48 h-48 text-white" />
                  </button>
                </div>

                {/* Card */}
                <div
                  className="bg-white rounded-card shadow-[0_0_10px_rgba(0,0,0,0.25)]"
                  style={{
                    width: 'clamp(903px, calc(903px + (100vw - 1440px) * 0.245833), 1021px)',
                    height: '697px',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Combination List */}
                  <div className="flex flex-col mx-20">
                    {MOCK_COMBINATIONS.map((combo) => (
                      <button
                        key={combo.id}
                        onClick={() => handleSelectCombination(combo.id)}
                        className="flex items-center justify-between pl-20 pr-36 py-24 hover:bg-gray-50 transition-colors border-b border-gray-200 cursor-pointer"
                      >
                        {/* 좌측: 조합 정보 */}
                        <div className="flex flex-col gap-24 items-start">
                          {/* 조합 번호 + 조합명 */}
                          <div className="flex flex-col gap-8 items-start">
                            <p className="font-body-3-r text-gray-400">{combo.label}</p>
                            {/* 조합명 + 대표조합 star */}
                            <div className="flex items-center gap-8">
                              <p className="font-body-1-sm text-black">{combo.name}</p>
                              {combo.isMain && <StarIcon className="w-27 h-27" />}
                            </div>
                          </div>
                          {/* Tags */}
                          <div className="flex gap-12">
                            {combo.tags.map((tag) => (
                              <CombinationTag key={tag.name} name={tag.name} status={tag.status} />
                            ))}
                          </div>
                        </div>

                        {/* 우측: More 아이콘 */}
                        <MoreIcon className="w-20 h-36 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Combination Detail Modal - 기기 리스트 */}
            {modalView === 'combinationDetail' && selectedCombination && (
              <div
                className="flex flex-col items-start gap-20 pointer-events-auto self-start"
                style={{ marginTop: 'calc((100vh - 765px) / 2)' }}
              >
                {/* Header: Back + X 버튼 */}
                <div className="flex items-center justify-between w-full">
                  <button
                    onClick={() => setModalView('combination')}
                    className="w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    aria-label="뒤로가기"
                  >
                    <BackIcon className="w-48 h-48" />
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    aria-label="닫기"
                  >
                    <XIcon className="w-48 h-48 text-white" />
                  </button>
                </div>

                {/* Card */}
                <div
                  className="bg-white rounded-card shadow-[0_0_10px_rgba(0,0,0,0.25)] relative"
                  style={{
                    width: 'clamp(903px, calc(903px + (100vw - 1440px) * 0.245833), 1021px)',
                    height: showAllDevices
                      ? 'clamp(700px, calc(700px + (100vw - 1440px) * 0.0625), 730px)'
                      : '697px',
                    transition: 'height 0.3s ease',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* 조합 정보 + 기기 그리드 */}
                  <CombinationDeviceCard
                    combination={selectedCombination}
                    devices={combinationDevices}
                    columns={3}
                    defaultRows={3}
                    expanded={showAllDevices}
                    onExpand={() => setShowAllDevices(true)}
                    showExpandButton={true}
                    showGradient={true}
                    className="px-56 pt-40 pb-158"
                  />

                  {/* 담기 버튼 - 하단 고정 */}
                  <div className="absolute bottom-56 right-56">
                    <PrimaryButton
                      text={isAlreadyInSelectedCombination ? '이미 담은 상품입니다.' : `${selectedCombination.label} 에 담기`}
                      onClick={handleAddDeviceToCombination}
                      disabled={isAlreadyInSelectedCombination}
                      className={`w-280 ${isAlreadyInSelectedCombination ? '' : 'bg-blue-600 hover:bg-blue-500'}`}
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </>
      )}

      {/* 저장 완료 모달 - 독립적으로 표시 */}
      {showSaveCompleteModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-60" />
          <div className="fixed inset-0 flex items-center justify-center z-80">
            <div className="w-300 h-300 bg-white rounded-card shadow-[0_0_10px_rgba(0,0,0,0.25)] relative animate-fade-in">
              <SaveIcon className="w-100 h-100 text-blue-600 absolute left-1/2 -translate-x-1/2 top-64" />
              <p className="font-heading-3 text-blue-600 absolute left-1/2 -translate-x-1/2 top-206">저장 완료!</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeviceSearchPage;
