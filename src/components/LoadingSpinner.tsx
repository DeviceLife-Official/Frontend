import { ClipLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <ClipLoader size={50} color="#0069f0" />
    </div>
  );
};

export default LoadingSpinner;
