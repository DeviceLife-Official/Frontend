import { forwardRef } from 'react';

const CombinationStyleProbe = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="fixed -left-10000 -top-10000 flex flex-col justify-center items-center gap-8 w-600 h-72 p-20 rounded-button bg-white border-shadow-blue font-heading-2 text-black"
    >
      probe
    </div>
  );
});

CombinationStyleProbe.displayName = 'CombinationStyleProbe';

export default CombinationStyleProbe;
