const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

export const validateNewPassword = (password: string) => {
  if (password.length === 0) return '';
  if (!PASSWORD_REGEX.test(password)) {
    return '새 비밀번호는 8~20자, 영문+숫자를 포함해야 합니다.';
  }
  return '';
};

export const validatePasswordConfirm = (newPassword: string, confirmPassword: string) => {
  if (confirmPassword.length === 0) return '';
  if (newPassword !== confirmPassword) return '새 비밀번호가 일치하지 않습니다.';
  return '';
};
