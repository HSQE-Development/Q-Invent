import { Button, FormSkeleton, Input } from "@/components";
import FloatLabel from "@/components/float-label";
import { cn } from "@/lib";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductRequest } from "@/models";
import { useProductStore } from "@/store/productStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProductFormProps {
  id?: number;
  className?: string;
}
function ProductForm({ className, id }: ProductFormProps) {
  const [loadData, setLoadData] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductRequest>();

  const productStore = useProductStore();
  const onSubmit: SubmitHandler<ProductRequest> = (data) => {
    if (!id) {
      handleCreateProduct(data);
    } else {
      handleUpdateProduct(data);
    }
  };

  const handleUpdateProduct = async (data: Partial<ProductRequest>) => {
    try {
      if (id) {
        await productStore.updateProduct(id, data);
        toast.success("Actualizado correctamente");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCreateProduct = async (data: ProductRequest) => {
    await productStore.createProduct(data);
  };

  useEffect(() => {
    async function loadProductData(productId: number) {
      setLoadData(true);
      const product = await productStore.getProductById(productId);
      setLoadData(false);

      if (product) {
        setValue("name", product.name);
        setValue("total_quantity", product.totalQuantity.toString());
        setValue("quantity_type", product.quantityType);
        setValue("ubication", product.ubication);
        setValue("observation", product.observation);
        setValue("active", "A");
      }
    }

    if (id) {
      loadProductData(id);
    }
  }, [id, reset]);

  if (loadData) {
    return <FormSkeleton />;
  }

  return (
    <form
      className={cn("w-full h-full grid grid-cols-8 gap-4 gap-y-8", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col col-span-8">
        <FloatLabel label="Nombre" for="name" obligatory>
          <Input id="name" {...register("name", { required: true })} />
        </FloatLabel>
        {errors.name && (
          <span className="text-red-400">Esta fila es obligatoria</span>
        )}
      </div>
      <div className="flex flex-col col-span-4">
        <FloatLabel label="Cantidad" for="total_quantity" obligatory>
          <Input
            id="total_quantity"
            {...register("total_quantity", {
              required: "Esta fila es obligatoria",
              pattern: {
                value: /\d/,
                message:
                  "Debes poner al menos un numero (si no hay nada pon un 0)",
              },
            })}
          />
        </FloatLabel>
        {errors.total_quantity && (
          <span className="text-red-400">{errors.total_quantity.message}</span>
        )}
      </div>
      <div className="flex flex-col col-span-4">
        <FloatLabel label="Unidad" for="quantity_type" obligatory>
          <Input
            id="quantity_type"
            {...register("quantity_type", {
              required: "Esta fila es obligatoria",
            })}
          />
        </FloatLabel>
        {errors.quantity_type && (
          <span className="text-red-400">{errors.quantity_type.message}</span>
        )}
      </div>
      <div className="flex flex-col col-span-8">
        <FloatLabel label="Ubicación" for="ubication" obligatory>
          <Input
            id="ubication"
            {...register("ubication", { required: true })}
          />
        </FloatLabel>
        {errors.ubication && (
          <span className="text-red-400">Esta fila es obligatoria</span>
        )}
      </div>
      <div className="flex flex-col col-span-8">
        <FloatLabel label="Observación" for="observation">
          <Textarea
            id="observation"
            {...register("observation", { required: false })}
          />
        </FloatLabel>
      </div>
      <div className="flex flex-col col-span-8">
        <Button loading={productStore.loading} type="submit">
          Guardar
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
