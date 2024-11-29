import { Button, Modal } from "@/components";
import DropMenu, { MenuItem } from "@/components/DropMenu/DropMenu";
import { SideSheet } from "@/components/SideSheet";
import { useModal } from "@/hooks";
import { Product } from "@/models";
import { useProductStore } from "@/store/productStore";
import {
  CircleX,
  Ellipsis,
  History,
  Pencil,
  TimerReset,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import AssignPeople from "./AssignPeople";
import ProductForm from "./ProductForm";
import ProductInfo from "./ProductInfo";
import ViewAssignPeople from "./ViewAssignPeople";
import { useAuthStore } from "@/store";
import { useNavigate } from "react-router-dom";

export function BulletSeparator() {
  return <p className="font-extrabold text-2xl">•</p>;
}

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const productStore = useProductStore();
  const { open, close, isOpen } = useModal();
  const {
    open: openModal,
    close: closeModal,
    isOpen: isModalOpen,
  } = useModal();
  const {
    open: openViewAssignmentModal,
    close: closeViewAssignmentModal,
    isOpen: isViewAssignmentModalOpen,
  } = useModal();

  const [productId, setProductId] = useState<number | null>(null);
  const [popoverShow, setPopoverShow] = useState(false);

  const { authUser } = useAuthStore();

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
  const navigate = useNavigate();

  const menuItems = useMemo<MenuItem[]>(() => {
    return [
      {
        icon: <History />,
        label: "Ver Historial",
        action: () => navigate(`/inventory/product/${product.id}/history`),
      },
      {
        icon: <UserRound />,
        label: "Ver Asignaciones",
        action: openViewAssignmentModal,
      },
      {
        icon: <UserRoundPlus />,
        label: "Asignar",
        separator: !authUser?.user.isSuperUser ? false : true,
        className: "text-violet-400 my-2",
        action: open,
      },
      {
        icon: <Pencil />,
        label: "Editar",
        className: `text-orange-500 ${!authUser?.user.isSuperUser && "hidden"}`,
        action: () => {
          openModal();
          setProductId(product.id);
        },
      },
      {
        icon: product.active === "I" ? <TimerReset /> : <CircleX />,
        label: product.active === "I" ? "Activar" : "Inactivar",
        className: `${
          product.active === "I" ? "text-green-400" : "text-red-500"
        }  ${!authUser?.user.isSuperUser && "hidden"}`,
        action: () => {
          setPopoverShow(true);
          setProductId(product.id);
        },
      },
    ];
  }, [product]);

  return (
    <>
      <div className="p-4 bg-white border-2 rounded-2xl flex items-center justify-between hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-all ease-out duration-200 group">
        <ProductInfo product={product} />
        <div className="flex items-center gap-8">
          <div className="opacity-0 group-hover:opacity-100 flex items-center justify-around w-36">
            <Button
              variant={"outline"}
              className="w-10 h-10  hover:bg-zinc-100 active:bg-zinc-200 rounded-full p-3 text-zinc-800 text-center"
              title="Ver Historial"
              aria-label="Open Product History"
              onClick={() =>
                navigate(`/inventory/product/${product.id}/history`)
              }
            >
              <History />
            </Button>
            <Button
              variant={"outline"}
              className="w-10 h-10  hover:bg-zinc-100 active:bg-zinc-200 rounded-full p-3 text-zinc-800 text-center"
              title="Ver asignaciones"
              aria-label="Open Views Assignment"
              onClick={openViewAssignmentModal}
            >
              <UserRound />
            </Button>
            <Button
              variant={"outline"}
              className="w-10 h-10 bg-violet-100 hover:bg-violet-200 active:bg-violet-300 rounded-full p-3 text-violet-800 text-center"
              title="Asignar"
              aria-label="Open Assignment"
              onClick={open}
            >
              <UserRoundPlus />
            </Button>
          </div>
          <DropMenu items={menuItems} className="mr-12">
            <span className="hover:bg-gray-100 rounded-full flex items-center justify-center p-2">
              <Ellipsis />
            </span>
          </DropMenu>
        </div>
      </div>
      <SideSheet
        open={isOpen}
        openChange={close}
        title={`Asignar ${product.name}`}
        description="Aqui podras asignar el producto del inventario a una persona ;)"
      >
        <AssignPeople product={product} />
      </SideSheet>
      {/**Modal view assignment product */}
      <Modal
        open={isViewAssignmentModalOpen}
        openChange={closeViewAssignmentModal}
        title="Asignaciones"
        desc="Editar las asignaciones del producto"
        className="md:w-full"
      >
        <ViewAssignPeople product={product} />
      </Modal>
      {/**Modal Edit product */}
      <Modal
        open={isModalOpen}
        openChange={closeModal}
        title="Editar Producto"
        desc="Editar la informacion del producto"
      >
        <ProductForm id={productId ?? undefined} className="mt-4" />
      </Modal>
      {/**Modal inactivate product */}
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
    </>
  );
}
