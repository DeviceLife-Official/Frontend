// 가격대 문자열을 minPrice, maxPrice로 변환
export const convertPriceRanges = (priceRanges: string[]): { minPrice?: number; maxPrice?: number } => {
  if (priceRanges.length === 0) return {};

  const prices: number[] = [];

  priceRanges.forEach(range => {
    switch (range) {
      case 'under-100':
        prices.push(0, 1000000);
        break;
      case '100-150':
        prices.push(1000000, 1500000);
        break;
      case '150-200':
        prices.push(1500000, 2000000);
        break;
      case 'over-200':
        prices.push(2000000, Infinity);
        break;
    }
  });

  const minPrice = Math.min(...prices.filter(p => p !== Infinity));
  const maxPrice = Math.max(...prices);

  return {
    minPrice: minPrice === 0 ? undefined : minPrice,
    maxPrice: maxPrice === Infinity ? undefined : maxPrice,
  };
};

// 정렬 옵션을 sortType으로 변환
export const convertSortType = (sortOption: string): 'LATEST' | 'NAME_ASC' | 'PRICE_ASC' | 'PRICE_DESC' => {
  switch (sortOption) {
    case 'latest':
      return 'LATEST';
    case 'alphabetical':
      return 'NAME_ASC';
    case 'price-low':
      return 'PRICE_ASC';
    case 'price-high':
      return 'PRICE_DESC';
    default:
      return 'LATEST';
  }
};
