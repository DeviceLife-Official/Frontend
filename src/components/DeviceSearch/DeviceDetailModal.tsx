import type { Product } from '@/types/product';
import type { SearchDevice } from '@/types/devices';
import PrimaryButton from '@/components/Button/PrimaryButton';
import XIcon from '@/assets/icons/X.svg?react';
import RoundedLifestyleTag from '@/components/Lifestyle/RoundedLifestyleTag';
import { getDeviceLifestyleTags } from '@/utils/tag/deviceLifestyleTags';

interface DeviceDetailModalProps {
  product: Product;
  device: SearchDevice;
  addToCombinationConfig: {
    text: string;
    handler: () => void;
    disabled?: boolean;
  };
  isProfileLoading: boolean;
  onClose: () => void;
}

const DeviceDetailModal = ({
  product,
  device,
  addToCombinationConfig,
  isProfileLoading,
  onClose,
}: DeviceDetailModalProps) => {
  const rawTags: string[] = getDeviceLifestyleTags(device);

  return (
    <div className="flex flex-col items-end gap-20 pointer-events-auto">
      {/* Close Button - 카드 바깥 */}
      <button
        onClick={onClose}
        className="w-48 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="닫기"
      >
        <XIcon className="w-48 h-48 text-white" />
      </button>

      {/* Card */}
      <div
        className="bg-white rounded-card px-56 py-40 overflow-y-auto scrollbar-minimal"
        style={{
          width: '907px',
          height: '670px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="flex flex-col gap-20">
          {/* Row 1: Name & Price */}
          <div className="w-400">
            {/* Name & Price */}
            <div className="flex flex-col gap-12">
              <p className="font-heading-1 text-blue-600">{product.name}</p>
              <div className="flex items-center gap-8 font-heading-2 text-black">
                <p>₩</p>
                <p>{(product.price ?? 0).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Row 2: Image + Specs */}
          <div className="flex items-start gap-56">
            {/* Image */}
            <div className="w-400 h-400 bg-gray-200 relative">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : null}
            </div>

            {/* Right Section - Specs */}
            <div className="w-303 flex flex-col pl-16">
              {/* Product Info Table */}
              <div className="flex flex-col gap-20 mb-40">
                <div className="flex items-center gap-24">
                  <p className="font-body-2-r text-gray-400 w-80 flex-shrink-0">모델명</p>
                  <p className="font-body-2-r text-black line-clamp-1">{product.name}</p>
                </div>
                <div className="flex items-center gap-24">
                  <p className="font-body-2-r text-gray-400 w-80">카테고리</p>
                  <p className="font-body-2-r text-black">{product.category}</p>
                </div>
                {device?.brandName && (
                  <div className="flex items-center gap-24">
                    <p className="font-body-2-r text-gray-400 w-80">브랜드</p>
                    <p className="font-body-2-r text-black">{device.brandName}</p>
                  </div>
                )}
                <div className="flex items-center gap-24">
                  <p className="font-body-2-r text-gray-400 w-80">가격</p>
                  <div className="flex items-center gap-4 font-body-2-r text-black">
                    <p>{(product.price ?? 0).toLocaleString()}</p>
                    <p>원</p>
                  </div>
                </div>
                {device?.specifications?.screenInch ? (
                  <div className="flex items-center gap-24">
                    <p className="font-body-2-r text-gray-400 w-80">인치</p>
                    <p className="font-body-2-r text-black">
                      {String(device.specifications.screenInch)}
                    </p>
                  </div>
                ) : null}
                {device?.specifications?.chargingPort ? (
                  <div className="flex items-center gap-24">
                    <p className="font-body-2-r text-gray-400 w-80">충전방식</p>
                    <p className="font-body-2-r text-black">
                      {String(device.specifications.chargingPort).replace('_', '-')}
                    </p>
                  </div>
                ) : null}
                {device?.releaseDate && (
                  <div className="flex items-center gap-24">
                    <p className="font-body-2-r text-gray-400 w-80">출시일</p>
                    <p className="font-body-2-r text-black">
                      {new Date(device.releaseDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                    </p>
                  </div>
                )}
              </div>

              {/* Lifestyle Tags */}
              {rawTags.length > 0 && (
                <div className="flex flex-wrap gap-12">
                  {rawTags.map((tag: string) => (
                    <RoundedLifestyleTag key={tag} label={`# ${tag}`} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Row 3: Button */}
          <div className="w-400">
            <PrimaryButton
              text={addToCombinationConfig.text}
              onClick={addToCombinationConfig.handler}
              disabled={isProfileLoading || addToCombinationConfig.disabled}
              className={`w-full ${
                (isProfileLoading || addToCombinationConfig.disabled)
                  ? ''
                  : 'bg-blue-500 hover:bg-blue-400'
              } transition-colors`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailModal;
