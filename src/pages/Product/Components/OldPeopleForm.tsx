import { PeopleCard } from "@/components/People";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssignmentPeopleStore } from "@/store/assignmentPeopleStore";
import { useEffect } from "react";
import QuantityCounter from "./QuantityCounter";
import { Button } from "@/components";
import { useProductStore } from "@/store/productStore";
import { toast } from "sonner";

export default function OldPeopleForm({
  productId,
  productQuantityAvailable,
}: {
  productId: number;
  productQuantityAvailable: number;
}) {
  const assignmentPeopleStore = useAssignmentPeopleStore();
  const productStore = useProductStore();

  useEffect(() => {
    assignmentPeopleStore.resetAssignment();
    assignmentPeopleStore.getAllAssignmentPeople();
  }, []);

  const handlePeopleChange = (id: number) => {
    assignmentPeopleStore.setAssignment({
      people_id: id,
    });
  };

  const handleAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (assignmentPeopleStore.assignment) {
        await productStore.assignment(
          productId,
          assignmentPeopleStore.assignment
        );
        toast.success("Cantidad Asignada correctamente", { closeButton: true });
      }
    } catch (error: any) {
      toast.error(error.data, { closeButton: true });
    }
  };

  return (
    <form
      className="w-full grid-cols-8 space-y-4 place-items-center"
      onSubmit={handleAssignment}
    >
      <Select
        name="poeple"
        onValueChange={(e) => {
          handlePeopleChange(parseInt(e));
        }}
      >
        <SelectTrigger className="col-span-8 !h-auto">
          <SelectValue placeholder="Selecciona una persona" />
        </SelectTrigger>
        <SelectContent className="w-full h-auto">
          {assignmentPeopleStore.assignmentPeoples.map((people) => (
            <SelectItem value={people.id.toString()} key={people.id}>
              <PeopleCard people={people} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <QuantityCounter className="col-span-8" />
      {(assignmentPeopleStore.assignment?.assigned_quantity || 0) >
        productQuantityAvailable && (
        <small className="text-red-500">
          La cantidad a asignar supera a la cantidad disponible del producto
        </small>
      )}
      <Button
        className="w-full"
        loading={productStore.loadingAssignment}
        disabled={
          (assignmentPeopleStore.assignment?.assigned_quantity || 0) >
          productQuantityAvailable
        }
      >
        Asignar
      </Button>
    </form>
  );
}
