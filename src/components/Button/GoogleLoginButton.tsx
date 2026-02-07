import GoogleLogo from '@/assets/logos/google_noborder.svg?react';
import clsx from 'clsx';

type GoogleLoginButtonProps = {
  onClick?: () => void;
  className?: string;
};

const GOOGLE_OAUTH_URL = 'https://api.devicelife.site/oauth2/authorization/google';

const GoogleLoginButton = ({ onClick, className }: GoogleLoginButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Google OAuth 인증 페이지로 이동
      window.location.href = GOOGLE_OAUTH_URL;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        'flex items-center gap-24',
        'py-8 pl-0 pr-8',
        'bg-white cursor-pointer',
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
