import { Button } from "@/components";
import { Ellipsis } from "lucide-react";

function BulletSeparator() {
  return <p className="font-extrabold text-2xl">•</p>;
}

export default function ProductCard() {
  return (
    <div className="p-4 bg-white border-2 rounded-2xl flex items-center justify-between hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
      <div className="flex flex-col items-start justify-start">
        <h1>Product NAME</h1>
        <div className="flex items-center justify-start gap-2">
          <p>Cantidad Total</p>
          <BulletSeparator />
          <p>Cantidad Total</p>
          <BulletSeparator />
          <p>Cantidad Total</p>
          <BulletSeparator />
          <p>Cantidad Total</p>
          <BulletSeparator />
        </div>
      </div>
      <div className="flex items-center">
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
