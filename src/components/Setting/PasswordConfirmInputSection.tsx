import PasswordInputSection from '@/components/Setting/PasswordInputSection';

type PasswordConfirmInputSectionProps = {
  value: string;
  onChange: (next: string) => void;
  errorMessage?: string;
};

const PasswordConfirmInputSection = ({
  value,
  onChange,
  errorMessage,
}: PasswordConfirmInputSectionProps) => {
  return (
    <PasswordInputSection
      label="비밀번호 확인"
      value={value}
      onChange={onChange}
      errorMessage={errorMessage}
    />
  );
};

export default PasswordConfirmInputSection;
