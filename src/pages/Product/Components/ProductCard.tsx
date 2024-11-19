import { Button, Modal } from "@/components";
import DropMenu, { MenuItem } from "@/components/DropMenu/DropMenu";
import { SideSheet } from "@/components/SideSheet";
import { useModal } from "@/hooks";
import { Product } from "@/models";
import { useProductStore } from "@/store/productStore";
import {
  CircleX,
  Ellipsis,
  Pencil,
  TimerReset,
  UserRoundPlus,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import AssignPeople from "./AssignPeople";
import ProductForm from "./ProductForm";
import ProductInfo from "./ProductInfo";

export function BulletSeparator() {
  return <p className="font-extrabold text-2xl">•</p>;
}

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const { open, close, isOpen } = useModal();
  const productStore = useProductStore();
  const {
    open: openModal,
    close: closeModal,
    isOpen: isModalOpen,
  } = useModal();

  const [productId, setProductId] = useState<number | null>(null);
  const [popoverShow, setPopoverShow] = useState(false);

  const handleHidePopover = () => {
    setPopoverShow(false);
  };

  const handleInactivate = async () => {
    try {
      if (productId) {
        await productStore.updateProduct(productId, {
          active: product.active === "I" ? "A" : "I",
        });
        toast.success("Inactivado correctamente");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const menuItems = useMemo<MenuItem[]>(() => {
    return [
      {
        icon: <UserRoundPlus />,
        label: "Asignar",
        separator: true,
        className: "text-violet-400 my-2",
        action: open,
      },
      {
        icon: <Pencil />,
        label: "Editar",
        className: "text-orange-500",
        action: () => {
          openModal();
          setProductId(product.id);
        },
      },
      {
        icon: product.active === "I" ? <TimerReset /> : <CircleX />,
        label: product.active === "I" ? "Activar" : "Inactivar",
        className: product.active === "I" ? "text-green-400" : "text-red-500",
        action: () => {
          setPopoverShow(true);
          setProductId(product.id);
        },
      },
    ];
  }, [product]);

  return (
    <div className="p-4 bg-white border-2 rounded-2xl flex items-center justify-between hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 group">
      <ProductInfo product={product} />
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 border-2 px-2 rounded-xl">
          Cantidad total
          <h2 className="text-zinc-600 text-2xl">
            <span className="bg-black text-white px-2 py-1 rounded-lg">
              {product.totalQuantity}
            </span>{" "}
            {product.quantityType}
          </h2>
        </div>
        <DropMenu items={menuItems} className="mr-12">
          <span className="hover:bg-gray-100 rounded-full flex items-center justify-center p-2">
            <Ellipsis />
          </span>
        </DropMenu>
        <SideSheet
          open={isOpen}
          openChange={close}
          title={`Asignar ${product.name}`}
          description="Aqui podras asignar el producto del inventario a una persona ;)"
        >
          <AssignPeople product={product} />
        </SideSheet>
        <Modal
          open={isModalOpen}
          openChange={closeModal}
          title="Editar Producto"
          desc="Editar la informacion del producto"
        >
          <ProductForm id={productId ?? undefined} className="mt-4" />
        </Modal>
        <Modal
          open={popoverShow}
          openChange={handleHidePopover}
          title={
            product.active === "I" ? "Activar producto" : "Inactivar producto"
          }
          desc={`¿Estás seguro que deseas ${
            product.active === "I" ? "activar" : "inactivar"
          } ?`}
        >
          <>
            <form className="flex gap-4">
              <Button
                onClick={handleInactivate}
                variant={"destructive"}
                type="button"
              >
                Confirmar
              </Button>
              <Button
                onClick={() => setPopoverShow(false)} // Cerrar el Popover si se cancela
                variant={"secondary"}
                type="button"
              >
                Cancelar
              </Button>
            </form>
          </>
        </Modal>
      </div>
    </div>
  );
}
