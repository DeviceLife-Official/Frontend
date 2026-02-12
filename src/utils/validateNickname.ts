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

  const allowedRegex = /^[가-힣a-zA-Z ]+$/;
  if (!allowedRegex.test(nickname)) {
    return '닉네임은 한글, 영어, 공백만 사용할 수 있어요.';
  }
  const length = nickname.length;
  const hasKorean = /[가-힣]/.test(nickname);
  const hasEnglish = /[a-zA-Z]/.test(nickname);

  if (hasKorean && hasEnglish) {
    if (length > 6) {
      return '한글과 영어를 함께 사용할 경우 최대 6자까지 가능해요.';
    }
  } else if (hasKorean) {
    if (length > 5) {
      return '한글 닉네임은 최대 5자까지 가능해요.';
    }
  } else if (hasEnglish) {
    if (length > 7) {
      return '영어 닉네임은 최대 7자까지 가능해요.';
    }
  }

  return '';
};
