import DropMenu, { MenuItem } from "@/components/DropMenu/DropMenu";
import { SideSheet } from "@/components/SideSheet";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/hooks";
import { cn } from "@/lib";
import { Product } from "@/models";
import {
  CircleX,
  Ellipsis,
  Info,
  MapPin,
  PackageSearch,
  Pencil,
  TimerReset,
  UserRoundPlus,
} from "lucide-react";
import { useMemo, useState } from "react";
import ProductForm from "./ProductForm";
import { Button, Modal } from "@/components";
import { toast } from "sonner";
import { useProductStore } from "@/store/productStore";

function BulletSeparator() {
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
      <div className="flex items-center gap-4">
        <PackageSearch className="border h-12 w-12 p-2 rounded-lg " />
        <div className="flex flex-col items-start justify-start">
          <span className="flex items-center gap-2">
            <h1 className="group-hover:underline">{product.name}</h1>
            <BulletSeparator />
            <Badge
              className={cn(
                product.active === "A" &&
                  "bg-violet-300 border-2 border-violet-800 text-violet-900",
                ""
              )}
            >
              {product.active === "A" ? "Activo" : "Inactivo"}
            </Badge>
          </span>
          <div className="flex items-center justify-start gap-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <p>{product.ubication}</p>
            </span>
            <BulletSeparator />
            <span className="flex items-center gap-1">
              <Info className="w-4 h-4" />
              <p>{product.observation ?? "Sin Observación"}</p>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          {product.totalQuantity && (
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                product.totalQuantity == 0 && "bg-red-500",
                product.totalQuantity <= 2 && "bg-red-500",
                product.totalQuantity <= 6 &&
                  product.totalQuantity > 2 &&
                  "bg-orange-500",
                product.totalQuantity > 6 && "bg-green-500"
              )}
            />
          )}
          <h2 className="text-zinc-400 text-2xl">
            {product.totalQuantity} {product.quantityType}
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
          <div>Asignar</div>
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
