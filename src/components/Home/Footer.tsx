const Footer = () => {
  return (
    <footer className="bg-blue-900 h-508 px-160 py-100">
      <div className="flex flex-col items-start gap-72">
        <div className="flex flex-wrap items-start gap-96">
          <a
            href="https://lovely-potassium-7f2.notion.site/2f0c82f125c9807a8fdfdcdcaa204c5a?pvs=74"
            target="_blank"
            rel="noopener noreferrer"
            className="w-140 text-white"
          >
            <span className="font-body-1-sm link-underline">공지사항</span>
          </a>
          <a
            href="https://lovely-potassium-7f2.notion.site/2f0c82f125c980a5be42d20615f296b1?pvs=74"
            target="_blank"
            rel="noopener noreferrer"
            className="w-140 text-white"
          >
            <span className="font-body-1-sm link-underline">자주묻는질문</span>
          </a>
          <a
            href="https://lovely-potassium-7f2.notion.site/2f0c82f125c980949ebbf75f5e0797f7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-180 text-white"
          >
            <span className="font-body-1-sm link-underline">개인정보처리방침</span>
          </a>
          <a
            href="https://lovely-potassium-7f2.notion.site/2f0c82f125c980bea108c01efb702ef7?pvs=74"
            target="_blank"
            rel="noopener noreferrer"
            className="w-140 text-white"
          >
            <span className="font-body-1-sm link-underline">이용약관</span>
          </a>
          <a
            href="https://lovely-potassium-7f2.notion.site/2f0c82f125c980fa8fa0d2ef430bbe79?pvs=74"
            target="_blank"
            rel="noopener noreferrer"
            className="w-140 text-white"
          >
            <span className="font-body-1-sm link-underline">고객센터</span>
          </a>
        </div>
        <div className="flex flex-col gap-12 items-start w-fit">
          <p className="font-body-1-sm text-white">Team Device Life</p>
          <p className="font-body-3-r text-white">
            UMC 9th (University MakesUs Challenge) | 2025.09 ~ 2026.02
          </p>
          <p className="font-body-3-r text-white">Contact: ssy08042@kau.kr</p>
        </div>

        <p className="self-stretch font-body-3-r text-white">
          © 2026 Device Life, All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
