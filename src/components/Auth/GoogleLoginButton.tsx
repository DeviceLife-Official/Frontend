import GoogleLogo from '@/assets/logos/google_noborder.svg?react';

type GoogleLoginButtonProps = {
  onClick?: () => void;
  className?: string;
};

const GoogleLoginButton = ({
  onClick,
  className = '',
}: GoogleLoginButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-24 py-8 pl-0 pr-8 bg-white
        ${className}
      `}
      style={{ boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.20)' }}
    >
      <GoogleLogo className="size-30" />
      <span className="font-body-3-r text-gray-400">Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;