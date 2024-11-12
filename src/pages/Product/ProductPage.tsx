import { Ellipsis } from "lucide-react";
import { Button } from "@/components";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ListProducts, SearchProduct } from "./Components";
import { AnimatedBackground } from "../Login/Login";

export default function ProductPage() {
  return (
    <section className="w-full h-full flex flex-col items-center overflow-hidden">
      <div className="w-full h-full grid grid-cols-12 gap-4">
        <div className="col-span-3 flex flex-col bg_patterns relative">
          <AnimatedBackground position="left" />

          <div className="flex items-baseline justify-between pl-2">
            <h1 className="text-3xl font-extrabold">Productos</h1>
            <Badge className="flex items-center gap-2 bg-white text-black border-2 border-black hover:bg-white">
              1708 <small>productos</small>
            </Badge>
          </div>
        </div>

        <div className="col-span-9 flex flex-col relative h-auto overflow-auto scrolling__container px-2">
          <div className="flex items-center justify-between gap-2 sticky top-0 z-10 bg-white py-2">
            <SearchProduct />
            <Separator orientation="vertical" className="h-[70%] " />
            <div className="flex items-center justify-evenly gap-2 h-full">
              <Button variant={"secondary"}>
                <Ellipsis />
              </Button>
              <Button>Agregar Producto</Button>
            </div>
          </div>
          <ListProducts />
        </div>
      </div>
    </section>
  );
}
