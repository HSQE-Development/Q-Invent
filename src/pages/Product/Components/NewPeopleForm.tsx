import { Button, Input } from "@/components";
import QuantityCounter from "./QuantityCounter";
import { useAssignmentPeopleStore } from "@/store/assignmentPeopleStore";
import { useProductStore } from "@/store/productStore";
import { toast } from "sonner";

export default function NewPeopleForm({
  productId,
  productQuantityAvailable,
}: {
  productId: number;
  productQuantityAvailable: number;
}) {
  const assignmentPeopleStore = useAssignmentPeopleStore();
  const productStore = useProductStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    assignmentPeopleStore.setAssignment({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (assignmentPeopleStore.assignment) {
        await productStore.assignment(
          productId,
          assignmentPeopleStore.assignment
        );
        toast.success("Cantidad Asignada correctamente", { closeButton: true });
        assignmentPeopleStore.resetAssignment();
      }
    } catch (error: any) {
      toast.error(error.data, { closeButton: true });
    }
  };
  return (
    <form
      className="w-full grid-cols-8 space-y-4 place-items-center"
      onSubmit={handleSubmit}
    >
      <div className="col-span-8 grid grid-cols-4 w-full gap-4">
        <div className="col-span-2 flex flex-col">
          <label htmlFor="name">
            Nombre <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={assignmentPeopleStore.assignment?.name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label htmlFor="phone">
            Telefono <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            name="phone"
            value={assignmentPeopleStore.assignment?.phone || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-4 flex flex-col">
          <label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={assignmentPeopleStore.assignment?.email || ""}
            onChange={handleChange}
          />
        </div>
      </div>
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
