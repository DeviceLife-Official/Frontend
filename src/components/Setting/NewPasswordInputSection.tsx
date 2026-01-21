import PasswordInputSection from '@/components/Setting/PasswordInputSection';

type NewPasswordInputSectionProps = {
  value: string;
  onChange: (next: string) => void;
  errorMessage?: string;
};

const NewPasswordInputSection = ({
  value,
  onChange,
  errorMessage,
}: NewPasswordInputSectionProps) => {
  return (
    <PasswordInputSection
      label="새 비밀번호"
      value={value}
      onChange={onChange}
      errorMessage={errorMessage}
    />
  );
};

export default NewPasswordInputSection;
