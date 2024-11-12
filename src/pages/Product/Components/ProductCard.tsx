import { Button } from "@/components";
import { cn, extractNumberOfString } from "@/lib";
import { Product } from "@/models";
import { Ellipsis, Info, MapPin, PackageSearch } from "lucide-react";

function BulletSeparator() {
  return <p className="font-extrabold text-2xl">•</p>;
}

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const quantityNumber = extractNumberOfString(product.totalQuantity);
  return (
    <div className="p-4 bg-white border-2 rounded-2xl flex items-center justify-between hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
      <div className="flex items-center gap-4">
        <PackageSearch className="border h-12 w-12 p-2 rounded-lg " />
        <div className="flex flex-col items-start justify-start">
          <h1>{product.name}</h1>
          <div className="flex items-center justify-start gap-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <p>{product.ubication}</p>
            </span>
            <BulletSeparator />
            <span className="flex items-center gap-1">
              <Info className="w-4 h-4" />
              <p>{product.observation}</p>
            </span>
            {/* <BulletSeparator />
            <p>Cantidad Total</p>
            <BulletSeparator />
            <p>Cantidad Total</p>
            <BulletSeparator /> */}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          {quantityNumber && (
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                quantityNumber <= 2 && "bg-red-500",
                quantityNumber <= 6 && quantityNumber > 2 && "bg-orange-500",
                quantityNumber > 6 && "bg-green-500"
              )}
            />
          )}
          <h2 className="text-zinc-400 text-2xl">{product.totalQuantity}</h2>
        </div>
        <Button
          variant={"secondary"}
          className="bg-transparent border shadow-none"
        >
          <Ellipsis />
        </Button>
      </div>
    </div>
  );
}
