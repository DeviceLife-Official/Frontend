export const validateNickname = (nickname: string) => {
  if (nickname.length === 0) {
    return '닉네임을 입력해주세요.';
  }
  if (nickname.trim().length === 0) {
    return '공백만 입력할 수 없어요.';
  }
  if (nickname !== nickname.trim()) {
    return '닉네임은 공백으로 시작하거나 끝날 수 없어요.';
  }
  return '';
};
