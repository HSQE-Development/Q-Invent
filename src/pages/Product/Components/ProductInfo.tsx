import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib";
import { Product } from "@/models";
import { Info, Layers, MapPin, PackageSearch } from "lucide-react";

export function BulletSeparator() {
  return <p className="font-extrabold text-2xl">•</p>;
}

interface ProductInfoProps {
  product: Product;
}
export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <PackageSearch className="border h-12 w-12 p-2 rounded-lg " />
      <div className="flex flex-col items-start justify-start">
        <span className="flex items-center gap-2">
          <h1 className="group-hover:underline">{product.name}</h1>
          <BulletSeparator />
          <Badge
            className={cn(
              product.active === "A" &&
                "bg-violet-300 border-2 border-violet-800 text-violet-900",
              ""
            )}
          >
            {product.active === "A" ? "Activo" : "Inactivo"}
          </Badge>
          <BulletSeparator />
          <div className="flex flex-row-reverse items-center justify-start gap-2">
            <Badge>{product.totalQuantity}</Badge>
            <small>Cantidad total</small>
          </div>
        </span>
        <div className="flex items-center justify-start gap-2">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <p>{product.ubication}</p>
          </span>
          <BulletSeparator />
          <span className="flex items-center gap-1">
            <Info className="w-4 h-4" />
            <p>{product.observation ?? "Sin Observación"}</p>
          </span>
          <BulletSeparator />
          <span
            className={cn(
              "flex items-center gap-1 border-2 px-2 rounded-lg overflow-hidden w-auto transition-all group-[spanquantity]",
              product.quantityAvailable <= 2 && "bg-red-50 border-red-300",
              product.quantityAvailable >= 5 &&
                product.quantityAvailable <= 10 &&
                "bg-orange-50 border-orange-300",
              product.quantityAvailable >= 10 && "bg-green-50 border-green-300"
            )}
          >
            <Layers className="w-4 h-4" />
            <p>{product.quantityAvailable}</p>
            <span className="text-nowrap opacity-0 group-[spanquantity]:hover:opacity-100 w-0 group-[spanquantity]:hover:w-auto">
              Cantidad disponible
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
