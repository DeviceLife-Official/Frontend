type ProductLifeProps = {
  label: string;
};

const ProductLife = ({ label }: ProductLifeProps) => {
  return (
    <div className="inline-flex items-center justify-center px-20 py-10 rounded-full bg-blue-100 font-body-1-r text-black">
      #{label}
    </div>
  );
};

export default ProductLife;
