import { useState, useEffect, useMemo } from 'react';
import type { FilterOption } from '@/constants/devices';
import { getCategoryDeviceType, getSortType } from '@/constants/deviceMapping';
import { useSearchDevices } from '@/apis/devices/searchDevices';
import { useGetBrands } from '@/apis/devices/getBrands';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export const useDeviceSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState('latest');
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // 브랜드 API 조회 - 선택된 카테고리에 따라 deviceType 전달
  const { data: brandsData } = useGetBrands(getCategoryDeviceType(selectedCategory));

  // API 데이터를 FilterOption 형식으로 변환
  const brandOptions: FilterOption[] = useMemo(() => {
    if (!brandsData?.result) return [];
    return brandsData.result.map(brand => ({
      value: brand.brandId.toString(),
      label: brand.brandName,
    }));
  }, [brandsData]);

  // 기기 검색 API 파라미터 구성
  const apiSearchParams = useMemo(() => {
    const deviceType = getCategoryDeviceType(selectedCategory);

    // 가격대 필터를 minPrice/maxPrice로 변환
    let minPrice: number | undefined = undefined;
    let maxPrice: number | undefined = undefined;

    if (selectedPrice.length > 0) {
      const prices = selectedPrice.map(value => {
        switch (value) {
          case 'under-100':
            return { min: 0, max: 1000000 };
          case '100-150':
            return { min: 1000000, max: 1500000 };
          case '150-200':
            return { min: 1500000, max: 2000000 };
          case 'over-200':
            return { min: 2000000, max: Infinity };
          default:
            return { min: 0, max: Infinity };
        }
      });

      // 선택된 모든 가격대에서 최소값과 최대값 계산
      const calculatedMin = Math.min(...prices.map(p => p.min));
      const calculatedMax = Math.max(...prices.map(p => p.max));

      minPrice = calculatedMin > 0 ? calculatedMin : undefined;
      maxPrice = calculatedMax < Infinity ? calculatedMax : undefined;
    }

    // 가격 정렬은 클라이언트에서 처리하므로 API에는 기본 정렬 사용
    const apiSortType = (sortOption === 'price-low' || sortOption === 'price-high')
      ? 'LATEST'
      : getSortType(sortOption);

    return {
      keyword: searchQuery || undefined,
      size: 24,
      sortType: apiSortType,
      deviceTypes: deviceType ? [deviceType] : undefined,
      brandIds: selectedBrand ? [Number(selectedBrand)] : undefined,
      minPrice,
      maxPrice,
    };
  }, [searchQuery, selectedCategory, sortOption, selectedBrand, selectedPrice]);

  // 기기 검색 API 호출
  const {
    data: searchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useSearchDevices(apiSearchParams);

  // 전체 기기 목록 (모든 페이지 결합 + 클라이언트 사이드 정렬)
  const allDevices = useMemo(() => {
    const devices = searchData?.pages.flatMap(page => page.devices) ?? [];

    // 가격 정렬은 클라이언트에서 처리 (백엔드 미지원 시)
    if (sortOption === 'price-low') {
      return [...devices].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      return [...devices].sort((a, b) => b.price - a.price);
    }

    return devices;
  }, [searchData, sortOption]);

  // 무한 스크롤 트리거
  const { targetRef, isIntersecting } = useIntersectionObserver({ rootMargin: '100px' });

  // 스크롤 감지 시 다음 페이지 로드
  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 카테고리 변경 시 선택된 브랜드 초기화
  useEffect(() => {
    setSelectedBrand(null);
  }, [selectedCategory]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    selectedPrice,
    setSelectedPrice,
    selectedBrand,
    setSelectedBrand,
    brandOptions,
    allDevices,
    isSearchLoading,
    isSearchError,
    isFetchingNextPage,
    hasNextPage,
    targetRef,
  };
};
