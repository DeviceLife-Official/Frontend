// 카테고리 ID를 API deviceType으로 변환
export const getCategoryDeviceType = (categoryId: number | null): string | undefined => {
  if (!categoryId) return undefined;
  const mapping: Record<number, string> = {
    1: 'SMARTPHONE',
    2: 'LAPTOP',
    3: 'TABLET',
    4: 'SMARTWATCH',
    5: 'AUDIO',
    6: 'KEYBOARD',
    7: 'MOUSE',
    8: 'CHARGER',
  };
  return mapping[categoryId];
};

// sortOption을 API sortType으로 변환
export const getSortType = (sortOption: string) => {
  const mapping: Record<string, 'LATEST' | 'NAME_ASC' | 'PRICE_ASC' | 'PRICE_DESC'> = {
    'latest': 'LATEST',
    'alphabetical': 'NAME_ASC',
    'price-low': 'PRICE_ASC',
    'price-high': 'PRICE_DESC',
  };
  return mapping[sortOption] ?? 'LATEST';
};
