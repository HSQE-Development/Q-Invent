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
        "w-full h-ful  flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="flex items-center justify-around space-x-2">
        <Button
          variant={"outline"}
          className="rounded-full w-1"
          type="button"
          disabled={
            (assignmentPeopleStore.assignment?.assigned_quantity || 0) === 0
          }
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
            value={assignmentPeopleStore.assignment?.assigned_quantity || 0}
            className="w-40 h-full border-0 text-center !text-7xl"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                assignmentPeopleStore.setAssignment({ assigned_quantity: 0 });
              } else if (/^\d+$/.test(value)) {
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
