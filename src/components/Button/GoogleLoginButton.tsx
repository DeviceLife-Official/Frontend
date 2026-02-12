import GoogleLogo from '@/assets/logos/google_noborder.svg?react';
import clsx from 'clsx';
import { OAUTH } from '@/constants/auth';

type GoogleLoginButtonProps = {
  onClick?: () => void;
  className?: string;
};

const GoogleLoginButton = ({ onClick, className }: GoogleLoginButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Google OAuth 인증 페이지로 이동
      window.location.href = OAUTH.google;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        'flex items-center gap-24',
        'py-8 pl-0 pr-8',
        'bg-white cursor-pointer hover:bg-gray-100',
        className
      )}
      style={{ boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.20)' }}
    >
      <GoogleLogo className="size-30" />
      <span className="font-body-3-r text-gray-400">Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
