import type { Product } from '@/constants/mockData';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      className="px-40 py-32 cursor-pointer"
      onClick={onClick}
    >
      {/* Image - 직사각형 */}
      <div className="w-full h-340 bg-gray-200 mb-24" />

      {/* Content */}
      <div className="flex flex-col gap-24">
        {/* Name & Category */}
        <div className="flex flex-col gap-4">
          <p className="font-heading-3 text-black">{product.name}</p>
          <p className="font-body-1-sm text-gray-300">{product.category}</p>
        </div>

        {/* Price */}
        <p className="font-heading-3 text-blue-600">
          {product.price.toLocaleString()}
        </p>

        {/* Color Chips */}
        {/* <div className="flex gap-8">
          {product.colors.map((color, idx) => (
            <div
              key={idx}
              className="w-40 h-40 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
