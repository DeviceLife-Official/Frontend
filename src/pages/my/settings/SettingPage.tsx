import { useNavigate } from 'react-router-dom';
import SettingRow from '@/components/Setting/SettingRow';

const SettingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="px-160 mt-92 flex flex-col gap-32">
      <p className="font-heading-2 text-black">설정</p>
      <div className="flex flex-col gap-8">
        <SettingRow title="프로필 수정" onClick={() => navigate('/my/settings/profile')} />
        <SettingRow title="공지사항" onClick={() => navigate('/support/notices')} />
        <SettingRow
          title="고객센터/문의하기"
          onClick={() => navigate('/support/customer-center')}
        />
        <SettingRow title="서비스 이용약관" onClick={() => navigate('/support/terms')} />
        <SettingRow title="개인정보 처리방침" onClick={() => navigate('/support/privacy-policy')} />
      </div>
    </div>
  );
};

export default SettingPage;
