import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/models";
import ProductInfo from "./ProductInfo";
import { PeopleCard } from "@/components/People";
import { useMemo, useState } from "react";
import { Button, Input } from "@/components";
import { Delete, Minus, Plus } from "lucide-react";
import { useAssignmentPeopleStore } from "@/store/assignmentPeopleStore";
import { useProductStore } from "@/store/productStore";
import { toast } from "sonner";

interface ViewAssignPeopleProps {
  product: Product;
}

export default function ViewAssignPeople({ product }: ViewAssignPeopleProps) {
  const { setAssignments, assignments, clearAssignments } =
    useAssignmentPeopleStore();
  const [hasChanges, setHasChanges] = useState(false);
  const productStore = useProductStore();

  const assignmentCount = useMemo(() => {
    return product.assignmentPeople.reduce(
      (i, people) => i + (people.assignedQuantity || 0),
      0
    );
  }, [product.assignmentPeople]);

  const handleQuantityChange = (
    peopleId: number,
    newQuantity: number | undefined
  ) => {
    if (newQuantity !== undefined && newQuantity >= 0) {
      setAssignments({ people_id: peopleId, assigned_quantity: newQuantity });
      setHasChanges(true); // Marcar cambios como pendientes
    }
  };
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productStore.bulkAssignment(product.id, assignments);
      toast.success("Cambios Guardados correctamente.");
      clearAssignments();
    } catch (error: any) {
      toast.error(error.data, { closeButton: true });
    }
  };

  const handleUnAssignment = async (productId: number, peopleId: number) => {
    try {
      await productStore.unAssignment(productId, peopleId);
      toast.success("Cambios Guardados correctamente.");
    } catch (error: any) {
      toast.error(error.data, { closeButton: true });
    }
  };
  return (
    <form
      className="flex flex-col items-center justify-start w-full max-h-full"
      onSubmit={handleSaveChanges}
    >
      <ProductInfo product={product} />
      <Table>
        <TableCaption>
          Lista de personas que se les ha asignado este producto.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Persona</TableHead>
            <TableHead className="text-right">Cantidad Asignada</TableHead>
            <TableHead className="w-[100px] text-right">Devolver</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product.assignmentPeople.map((people) => {
            const currentQuantity =
              assignments.find((a) => a.people_id === people.id)
                ?.assigned_quantity ||
              people.assignedQuantity ||
              0;
            return (
              <TableRow key={people.id}>
                <TableCell>
                  <PeopleCard people={people} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant={"outline"}
                      type="button"
                      onClick={() =>
                        handleQuantityChange(
                          people.id,
                          (currentQuantity || 0) - 1
                        )
                      }
                    >
                      <Minus />
                    </Button>
                    <Input
                      type="number"
                      className="w-16 text-center border rounded"
                      value={currentQuantity || 0}
                      onChange={(e) =>
                        handleQuantityChange(people.id, Number(e.target.value))
                      }
                    />
                    <Button
                      variant={"outline"}
                      type="button"
                      onClick={() =>
                        handleQuantityChange(
                          people.id,
                          (currentQuantity || 0) + 1
                        )
                      }
                    >
                      <Plus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    loading={productStore.loadingUnAssignment}
                    onClick={() => {
                      handleUnAssignment(product.id, people.id);
                    }}
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>TotalAsignado</TableCell>
            <TableCell className="text-right">{assignmentCount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {hasChanges && (
        <Button loading={productStore.loadingAssignment}>
          Guardar Cambios
        </Button>
      )}
    </form>
  );
}
