type EmailInputSectionProps = {
  value: string;
};

const EmailInputSection = ({ value }: EmailInputSectionProps) => {
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
        <p className="font-body-3-sm text-black">이메일</p>
        <div
          className="
            relative
            flex items-center
            w-500 h-64
            px-16
            rounded-button
            bg-gray-100
            border-2 border-transparent
            cursor-default
          "
        >
          <input
            type="text"
            value={value}
            disabled
            readOnly
            className="
              w-full h-full
              bg-transparent
              outline-none
              text-black
              font-body-1-r
              cursor-default
            "
          />
        </div>
      </div>
    </div>
  );
};

export default EmailInputSection;
