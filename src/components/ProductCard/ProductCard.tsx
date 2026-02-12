import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      className="px-40 py-32 cursor-pointer group"
      onClick={onClick}
    >
      {/* Image - 정사각형 */}
      <div className="w-full aspect-square bg-gray-200 mb-20 overflow-hidden relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-16">
        {/* Name & Category */}
        <div className="flex flex-col gap-4">
          <p className="font-heading-4 text-black group-hover:text-blue-600 transition-colors">
            {product.name.length > 19 ? `${product.name.slice(0, 19)}...` : product.name}
          </p>
          <p className="font-body-2-sm text-gray-300">{product.category}</p>
        </div>

        {/* Price */}
        <p className="font-body-1-sm text-gray-500">
          {(product.price ?? 0).toLocaleString()}
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
