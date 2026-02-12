import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import GNB from '@/components/Home/GNB';
import ProductCard from '@/components/ProductCard/ProductCard';
import FilterDropdown from '@/components/Filter/FilterDropdown';
import SortDropdown from '@/components/Filter/SortDropdown';
import LoadingSpinner from '@/components/LoadingSpinner';
import DeviceDetailModal from '@/components/DeviceSearch/DeviceDetailModal';
import CombinationSelectModal from '@/components/DeviceSearch/CombinationSelectModal';
import CombinationDetailModal from '@/components/DeviceSearch/CombinationDetailModal';
import SaveCompleteModal from '@/components/DeviceSearch/SaveCompleteModal';
import SearchIcon from '@/assets/icons/search.svg?react';
import FilterIcon from '@/assets/icons/filter.svg?react';
import TopIcon from '@/assets/icons/top.svg?react';

import {
  DEVICE_CATEGORIES,
  SORT_OPTIONS,
  PRICE_OPTIONS,
} from '@/constants/devices';
import { mapSearchDeviceToProduct } from '@/utils/mapSearchDevice';
import { useDeviceSearch } from '@/hooks/useDeviceSearch';
import { useScrollState } from '@/hooks/useScrollState';
import { useAddToCombination } from '@/hooks/useAddToCombination';
import { useEffect } from 'react';

const DeviceSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProductId = searchParams.get('productId');

  // 검색/필터 상태
  const search = useDeviceSearch();

  const productGridRef = useRef<HTMLDivElement>(null);
  const scroll = useScrollState(productGridRef);

  /* 선택된 제품 찾기 */
  const selectedDevice = selectedProductId
    ? search.allDevices.find(d => d.deviceId === Number(selectedProductId))
    : null;
  const selectedProduct = selectedDevice ? mapSearchDeviceToProduct(selectedDevice) : null;

  // 조합 담기 + 모달 상태
  const combo = useAddToCombination({
    selectedProductId,
    selectedDeviceType: selectedDevice?.deviceType ?? null,
    selectedDeviceName: selectedDevice?.name ?? null,
    onCloseModal: () => {
      searchParams.delete('productId');
      setSearchParams(searchParams);
    },
  });

  /* 모달 열림 상태 확인 및 스크롤 잠금 (회색 배경이 보일 때와 동일한 조건) */
  const isModalOpen = (!!selectedProduct && !combo.showSaveCompleteModal) || combo.showSaveCompleteModal;

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <div className={`min-h-screen bg-white relative max-w-[100vw] overflow-x-hidden ${scroll.isAtBottom ? 'bg-effect-fade-bottom' : ''}`}>
      <GNB />

      {/* Search Bar */}
        <div className="flex justify-center pt-80">
          <div className="w-600 h-72 bg-blue-100 rounded-button px-12 py-20 flex items-center gap-12">
            <SearchIcon className="w-28 h-28 flex-shrink-0 text-black" />
            <input
              type="text"
              placeholder="기기명으로 검색"
              value={search.searchQuery}
              onChange={(e) => search.setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent font-body-1-r text-gray-500 outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Device Categories */}
        <div className="flex justify-center pt-36 2xl:pt-56">
          <div className="flex items-center justify-center gap-20 2xl:gap-56">
            {DEVICE_CATEGORIES.map((category) => {
              const { Icon } = category;
              const isSelected = search.selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => search.setSelectedCategory(search.selectedCategory === category.id ? null : category.id)}
                  className={`flex flex-col items-center gap-12 cursor-pointer transition-colors ${
                    category.id === 8 ? 'w-80' : 'w-110'
                  } ${
                    isSelected
                      ? 'text-blue-600'
                      : 'text-black hover:text-blue-500 active:text-blue-600'
                  }`}
                >
                  <div className="w-50 h-50 2xl:w-60 2xl:h-60 flex items-center justify-center">
                    <Icon className="w-50 h-50 2xl:w-60 2xl:h-60" />
                  </div>
                  <p className="font-body-1-sm whitespace-nowrap">{category.name}</p>
                </button>
              );
            })}
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
              <FilterIcon className={`w-48 h-48 ${search.selectedPrice.length > 0 || search.selectedBrand !== null ? 'text-blue-600' : 'text-black'}`} />
            </button>

            {/* Price Filter */}
            <div className="ml-40">
              <FilterDropdown
                label="가격대"
                options={PRICE_OPTIONS}
                selectedValue={search.selectedPrice}
                onSelect={(value) => search.setSelectedPrice(Array.isArray(value) ? value : [])}
                multiple
              />
            </div>

            {/* Brand Filter */}
            <div className="ml-20">
              <FilterDropdown
                label="브랜드"
                options={search.brandOptions}
                selectedValue={search.selectedBrand}
                onSelect={(value) => search.setSelectedBrand(value as string | null)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-80">
            {/* Left side - Result count */}
            <div className="flex items-center gap-2">
              <p className="font-body-1-sm text-black">{search.allDevices.length}</p>
              <p className="font-body-1-r text-black">개 결과</p>
            </div>

            {/* Right side - Sort dropdown */}
            <SortDropdown
              options={SORT_OPTIONS}
              selectedValue={search.sortOption}
              onSelect={search.setSortOption}
             />
          </div>
        </div>

        {/* Product Grid */}
        <div ref={productGridRef} className="mx-auto px-120 2xl:px-160">
          {/* 초기 로딩: 데이터가 없고 로딩 중일 때만 로딩 스피너 표시 */}
          {search.isSearchLoading && search.allDevices.length === 0 ? (
            <LoadingSpinner />
          ) : search.isSearchError && search.allDevices.length === 0 ? (
            <div className="flex justify-center items-center py-100">
              <p className="font-body-1-r text-red-500">검색 결과를 불러오는데 실패했습니다.</p>
            </div>
          ) : search.allDevices.length === 0 ? (
            <div className="flex justify-center items-center py-100">
              <p className="font-body-1-r text-gray-400">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 2xl:grid-cols-4 gap-x-28 gap-y-164">
              {search.allDevices.map((device) => (
                <ProductCard
                  key={device.deviceId}
                  product={mapSearchDeviceToProduct(device)}
                  onClick={() => {
                    searchParams.set('productId', device.deviceId.toString());
                    setSearchParams(searchParams);
                  }}
                />
              ))}
            </div>
          )}

          {/* 무한 스크롤 트리거 */}
          <div ref={search.targetRef} className="h-20" />

          {/* 로딩 인디케이터 */}
          {search.isFetchingNextPage && (
            <div className="flex justify-center py-40">
              <p className="font-body-1-r text-gray-400">더 불러오는 중...</p>
            </div>
          )}
        </div>

        {/* Top Button - 3행이 보일 때만 표시 */}
        {scroll.showTopButton && (
          <button
            onClick={scroll.handleScrollToTop}
            className="fixed right-48 bottom-48 w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300"
            aria-label="맨 위로 이동"
          >
            <TopIcon className="w-48 h-48 text-gray-300" />
          </button>
        )}

        {/* Bottom Spacing */}
        <div className="h-268" />
      {/* Device Detail Modal */}
      {selectedProduct && !combo.showSaveCompleteModal && (
        <>
          {/* Background Overlay - HomeIndicator보다 높게 설정 */}
          <div
            className="fixed inset-0 bg-black/50 z-60"
            onClick={combo.handleCloseModal}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex justify-center items-center z-72 pointer-events-none">
            {combo.modalView === 'device' && (
              <DeviceDetailModal
                product={selectedProduct}
                device={selectedDevice!}
                addToCombinationConfig={combo.addToCombinationConfig}
                isProfileLoading={combo.isProfileLoading}
                onClose={combo.handleCloseModal}
              />
            )}

            {combo.modalView === 'combination' && (
              <CombinationSelectModal
                combos={combo.combos}
                onSelectCombination={combo.handleSelectCombination}
                onBack={() => combo.setModalView('device')}
                onClose={combo.handleCloseModal}
              />
            )}

            {combo.modalView === 'combinationDetail' && combo.selectedCombination && (
              <CombinationDetailModal
                combination={combo.selectedCombination}
                devices={combo.combinationDevices}
                comboIndex={combo.combos.findIndex(c => c.comboId === combo.selectedCombinationId)}
                showAllDevices={combo.showAllDevices}
                onExpandChange={combo.setShowAllDevices}
                isAlreadyInCombination={combo.isAlreadyInSelectedCombination}
                duplicateReason={combo.duplicateReason}
                isAddingDevice={combo.isAddingDevice}
                onAddDevice={combo.handleAddDeviceToCombination}
                onBack={() => combo.setModalView('combination')}
                onClose={combo.handleCloseModal}
              />
            )}
          </div>
        </>
      )}

      {/* 저장 완료 모달 - 독립적으로 표시 */}
      {combo.showSaveCompleteModal && (
        <SaveCompleteModal isFadingOut={combo.isFadingOut} />
      )}
    </div>
  );
};

export default DeviceSearchPage;
