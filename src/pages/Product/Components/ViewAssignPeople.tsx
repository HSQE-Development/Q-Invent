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
import { useEffect, useMemo, useState } from "react";
import { Button, Input } from "@/components";
import { Delete, Minus, Plus } from "lucide-react";
import { useAssignmentPeopleStore } from "@/store/assignmentPeopleStore";
import { useProductStore } from "@/store/productStore";
import { toast } from "sonner";
import MainPopover from "@/components/Popover/MainPopover";
import { Textarea } from "@/components/ui/textarea";

interface ViewAssignPeopleProps {
  product: Product;
}

export default function ViewAssignPeople({ product }: ViewAssignPeopleProps) {
  const { setAssignments, assignments, clearAssignments } =
    useAssignmentPeopleStore();
  const [hasChanges, setHasChanges] = useState(false);
  const productStore = useProductStore();
  const [isFullest, setIsFullest] = useState(false);
  const [observation, setObservation] = useState("");

  const sumaAsignadaInicial = product.assignmentPeople.reduce(
    (total, people) => total + (people.assignedQuantity || 0),
    0
  );

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
      const currentQuantity =
        assignments.find((a) => a.people_id === peopleId)?.assigned_quantity ||
        product.assignmentPeople.find((p) => p.id === peopleId)
          ?.assignedQuantity ||
        0;

      const nuevaSumaAsignada =
        sumaAsignadaInicial - currentQuantity + (newQuantity || 0);

      if (
        newQuantity > currentQuantity &&
        nuevaSumaAsignada > product.quantityAvailable
      ) {
        setIsFullest(true);
      } else {
        setIsFullest(false);
      }
      setAssignments({ people_id: peopleId, assigned_quantity: newQuantity });
      setHasChanges(true); // Marcar cambios como pendientes
    }
  };

  const checkForChanges = () => {
    return product.assignmentPeople.some((people) => {
      const originalQuantity = people.assignedQuantity || 0;
      const currentQuantity =
        assignments.find((a) => a.people_id === people.id)?.assigned_quantity ??
        originalQuantity;
      return originalQuantity !== currentQuantity;
    });
  };

  useEffect(() => {
    setHasChanges(checkForChanges());
  }, [assignments, product.assignmentPeople]);

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
      await productStore.unAssignment(productId, peopleId, observation);
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
      {isFullest && (
        <span className="text-red-400 mt-4">
          Superas la cantidad disponible para habilitar
        </span>
      )}
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
                          Math.max(0, currentQuantity - 1)
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
                  <MainPopover
                    content={
                      <div className="flex flex-col gap-4">
                        <Textarea
                          id="observation"
                          name="observation"
                          placeholder="Observaciones"
                          onChange={(e) => {
                            setObservation(e.target.value);
                          }}
                        />
                        <Button
                          type="button"
                          loading={productStore.loadingUnAssignment}
                          onClick={() => {
                            handleUnAssignment(product.id, people.id);
                          }}
                        >
                          Devolución
                        </Button>
                      </div>
                    }
                  >
                    <Button type="button" variant={"secondary"}>
                      <Delete />
                    </Button>
                  </MainPopover>
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
      {hasChanges && !isFullest && (
        <Button loading={productStore.loadingAssignment} disabled={isFullest}>
          Guardar Cambios
        </Button>
      )}
    </form>
  );
}
