import { Button, Input } from "@/components";
import { Ellipsis } from "lucide-react";

export default function SearchProduct() {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <Input
        type="email"
        placeholder="Buscar producto."
        className="w-[95%] bg-white"
      />
      <div className="flex items-center justify-center flex-1">
        <Button variant={"secondary"} className="rounded-r-none">
          <Ellipsis />
        </Button>
        <Button variant={"secondary"} className="rounded-l-none">
          <Ellipsis />
        </Button>
      </div>
    </div>
  );
}
