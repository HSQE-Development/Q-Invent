import ProductCard from "./ProductCard";

export default function ListProducts() {
  return (
    <div className="flex flex-col gap-4 my-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProductCard key={index} />
      ))}
    </div>
  );
}
