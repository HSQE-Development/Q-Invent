import ChecboxCard from "@/components/ui/checkbox-card";
import { useCountContext } from "@/context/CountContext";
import { CircleAlert, Rows4 } from "lucide-react";

export default function ProductStatusFilter() {
  const { allCount, activeCount, inactiveCount } = useCountContext();
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
          checked
          isCheckFilter
          dataFilter={allCount}
        />
        <ChecboxCard
          icon={"A"}
          label="Activos"
          name="all"
          id="all"
          className="col-span-1"
          isCheckFilter
          dataFilter={activeCount}
        />
        <ChecboxCard
          icon={<CircleAlert />}
          label="Inactivos"
          name="all"
          id="all"
          className="col-span-2"
          isCheckFilter
          dataFilter={inactiveCount}
        />
      </div>
    </div>
  );
}
