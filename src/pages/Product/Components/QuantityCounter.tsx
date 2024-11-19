import { Button, Input } from "@/components";
import { cn } from "@/lib";
import { Minus, Plus } from "lucide-react";

interface QuantityCounterProps {
  className?: string;
}

export default function QuantityCounter({ className }: QuantityCounterProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="flex items-center justify-around space-x-2">
        <Button variant={"outline"} className="rounded-full w-1">
          <Minus />
        </Button>
        <div className="flex-1 text-cente !text-7xl">
          <Input
            value={0}
            className="w-40 h-40 border-0 text-center !text-7xl"
          />
        </div>
        <Button variant={"outline"} className="rounded-full w-1">
          <Plus />
        </Button>
      </div>
    </div>
  );
}
