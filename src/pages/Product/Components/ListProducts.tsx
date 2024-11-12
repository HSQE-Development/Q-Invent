import { Pagination, Product } from "@/models";
import ProductCard from "./ProductCard";

interface ListProductsProps {
  products: Pagination<Product[]>;
}
export default function ListProducts({ products }: ListProductsProps) {
  return (
    <div className="flex flex-col gap-4 my-8">
      {products.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
