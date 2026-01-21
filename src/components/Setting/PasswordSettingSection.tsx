import { useNavigate } from 'react-router-dom';

const PasswordSettingSection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
        navigate('/my/settings/password');
  };

  return (
    <div
      className="
        flex flex-col items-start
        gap-10
        pt-20 px-30 pb-30
        self-stretch
        rounded-card
        bg-white
        border-shadow-black
      "
    >
      <div className="flex flex-col gap-10">
        <p className="font-body-3-sm text-black">비밀번호</p>
        <button
          type="button"
          onClick={handleClick}
          className="
            relative
            flex items-center
            w-500 h-64
            px-14
            rounded-button
            bg-gray-100
            border-2 border-transparent
            cursor-pointer
          "
        >
          <p className="font-body-1-r text-black">********</p>
        </button>
      </div>
    </div>
  );
};

export default PasswordSettingSection;
