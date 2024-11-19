import { Button, Input } from "@/components";
import { cn } from "@/lib";
import { useAssignmentPeopleStore } from "@/store/assignmentPeopleStore";
import { Minus, Plus } from "lucide-react";

interface QuantityCounterProps {
  className?: string;
}

export default function QuantityCounter({ className }: QuantityCounterProps) {
  const assignmentPeopleStore = useAssignmentPeopleStore();

  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="flex items-center justify-around space-x-2">
        <Button
          variant={"outline"}
          className="rounded-full w-1"
          type="button"
          onClick={() => {
            assignmentPeopleStore.setAssignment({
              assigned_quantity: Math.max(
                (assignmentPeopleStore.assignment?.assigned_quantity || 0) - 1,
                0
              ),
            });
          }}
        >
          <Minus />
        </Button>
        <div className="flex-1 text-cente !text-7xl">
          <Input
            value={assignmentPeopleStore.assignment?.assigned_quantity}
            className="w-40 h-40 border-0 text-center !text-7xl"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                // Si el campo está vacío, establece el valor como 0
                assignmentPeopleStore.setAssignment({ assigned_quantity: 0 });
              } else if (/^\d+$/.test(value)) {
                // Si el valor es un número válido, actualiza el estado
                assignmentPeopleStore.setAssignment({
                  assigned_quantity: parseInt(value, 10),
                });
              }
            }}
          />
        </div>
        <Button
          variant={"outline"}
          className="rounded-full w-1"
          type="button"
          onClick={() => {
            assignmentPeopleStore.setAssignment({
              assigned_quantity:
                (assignmentPeopleStore.assignment?.assigned_quantity || 0) + 1,
            });
          }}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
