/**
 * 기기명에서 용량과 색상 정보를 제거하여 베이스 모델명을 반환합니다.
 * 같은 모델의 다른 용량/색상 기기를 동일한 모델로 인식하기 위해 사용됩니다.
 *
 * @param name - 전체 기기명 (예: "iPhone 15 Pro 블랙 512GB")
 * @returns 베이스 모델명 (예: "iPhone 15 Pro")
 *
 * @example
 * getBaseModelName("iPhone 15 Pro 블랙 512GB") // "iPhone 15 Pro"
 * getBaseModelName("Samsung Galaxy S24 Ultra 화이트 256GB") // "Samsung Galaxy S24 Ultra"
 * getBaseModelName("MacBook Pro 14 1TB") // "MacBook Pro 14"
 */
export const getBaseModelName = (name: string): string => {
  if (!name) return '';

  let baseName = name;

  // 1. 용량 정보 제거 (512GB, 1TB, 256MB 등)
  baseName = baseName.replace(/\s*\d+\s*(GB|TB|MB)\s*/gi, ' ');

  // 2. 색상 정보 제거
  const colorPatterns = [
    // 한글 색상
    /\s*블랙\s*/gi,
    /\s*화이트\s*/gi,
    /\s*실버\s*/gi,
    /\s*골드\s*/gi,
    /\s*그레이\s*/gi,
    /\s*그린\s*/gi,
    /\s*블루\s*/gi,
    /\s*레드\s*/gi,
    /\s*핑크\s*/gi,
    /\s*퍼플\s*/gi,
    /\s*옐로우\s*/gi,
    /\s*오렌지\s*/gi,
    /\s*브라운\s*/gi,
    /\s*네이비\s*/gi,
    /\s*스페이스\s*그레이\s*/gi,
    /\s*미드나이트\s*/gi,
    /\s*스타라이트\s*/gi,

    // 영어 색상
    /\s*Black\s*/gi,
    /\s*White\s*/gi,
    /\s*Silver\s*/gi,
    /\s*Gold\s*/gi,
    /\s*Gray\s*/gi,
    /\s*Grey\s*/gi,
    /\s*Green\s*/gi,
    /\s*Blue\s*/gi,
    /\s*Red\s*/gi,
    /\s*Pink\s*/gi,
    /\s*Purple\s*/gi,
    /\s*Yellow\s*/gi,
    /\s*Orange\s*/gi,
    /\s*Brown\s*/gi,
    /\s*Navy\s*/gi,
    /\s*Space\s*Gray\s*/gi,
    /\s*Midnight\s*/gi,
    /\s*Starlight\s*/gi,
    /\s*Rose\s*Gold\s*/gi,
    /\s*로즈\s*골드\s*/gi,

    // 괄호로 감싸진 색상 (예: "(블랙)", "(Black)")
    /\s*\([^)]*\)\s*/g,
  ];

  colorPatterns.forEach(pattern => {
    baseName = baseName.replace(pattern, ' ');
  });

  // 3. 양 끝 공백 제거 및 연속된 공백을 하나로
  baseName = baseName.trim().replace(/\s+/g, ' ');

  return baseName;
};
