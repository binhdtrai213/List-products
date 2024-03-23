import { Product } from "../../types/product.type";

export default function CardProduct({ product }: { product: Product }) {
  return (
    <div
      className="flex gap-9 items-center px-6 py-5 bg-neutral-8 rounded-lg border-[1px] border-transparent hover:border-primary-30 transition-all"
    >
      <img src={product.thumbnail} alt={product.title} className="w-16 h-16 rounded-lg" />
      <div>
        <p className="headline-4 px-3 py-[6px] text-text-0">{product.title}</p>
        <p className="body-2 px-3 mt-3 text-text-1">$ {product.price}</p>
      </div>
    </div>
  );
}
