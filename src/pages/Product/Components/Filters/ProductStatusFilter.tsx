import ChecboxCard from "@/components/ui/checkbox-card";
import { useCountContext } from "@/context/CountContext";
import { ProductStatus } from "@/models";
import { useProductStore } from "@/store/productStore";
import { CircleAlert, Rows4 } from "lucide-react";
import { useState } from "react";

export default function ProductStatusFilter() {
  const { allCount, activeCount, inactiveCount } = useCountContext();
  const { setFilters } = useProductStore();
  const [checkValue, setCheckValue] = useState<ProductStatus | null>(null);
  return (
    <div className="w-full h-52 bg-white border rounded-3xl flex flex-col">
      <h1 className="text-zinc-500 font-extrabold text-xl p-4">Estado</h1>
      <div className="w-full grid grid-cols-2 gap-2 px-4">
        <ChecboxCard
          icon={<Rows4 />}
          label="Todos"
          name="all"
          id="all"
          className="col-span-1"
          checked={checkValue == null}
          isCheckFilter
          dataFilter={allCount}
          onChange={() => {
            setCheckValue(null);
            setFilters({
              productStatus: "",
            });
          }}
        />
        <ChecboxCard
          icon={"A"}
          label="Activos"
          name="all"
          id="all"
          className="col-span-1"
          checked={checkValue == ProductStatus.Active}
          isCheckFilter
          dataFilter={activeCount}
          onChange={() => {
            setCheckValue(ProductStatus.Active);
            setFilters({
              productStatus: ProductStatus.Active,
            });
          }}
        />
        <ChecboxCard
          icon={<CircleAlert />}
          label="Inactivos"
          name="all"
          id="all"
          className="col-span-2"
          checked={checkValue == ProductStatus.Inactive}
          isCheckFilter
          dataFilter={inactiveCount}
          onChange={() => {
            setCheckValue(ProductStatus.Inactive);
            setFilters({
              productStatus: ProductStatus.Inactive,
            });
          }}
        />
      </div>
    </div>
  );
}
