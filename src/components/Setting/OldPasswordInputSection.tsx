import PasswordInputSection from '@/components/Setting/PasswordInputSection';

type OldPasswordInputSectionProps = {
  value: string;
  onChange: (next: string) => void;
  errorMessage?: string;
};

const OldPasswordInputSection = ({
  value,
  onChange,
  errorMessage,
}: OldPasswordInputSectionProps) => {
  return (
    <PasswordInputSection
      label="이전 비밀번호"
      value={value}
      onChange={onChange}
      errorMessage={errorMessage}
    />
  );
};

export default OldPasswordInputSection;
