/**
 * 초 단위 숫자를 mm:ss 형식 문자열로 변환
 * @param seconds - 초 단위 시간 (0 이상)
 * @returns "MM:SS" 형식 문자열
 */
export function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}
