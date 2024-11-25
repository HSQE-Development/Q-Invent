import { Ellipsis } from "lucide-react";
import { Button, FormSkeleton, Modal } from "@/components";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ListProducts, SearchProduct } from "./Components";
import { AnimatedBackground } from "../Login/Login";
import { useProductStore } from "@/store/productStore";
import { lazy, Suspense, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useModal } from "@/hooks";
import ProductStatusFilter from "./Components/Filters/ProductStatusFilter";
import { useCountContext } from "@/context/CountContext";
import { cn } from "@/lib";

const ProductForm = lazy(() => import("./Components/ProductForm"));

export default function ProductPage() {
  const productStore = useProductStore();

  useEffect(() => {
    productStore.getAllProducts();
  }, [productStore.filters]);

  const { open, close, isOpen } = useModal();

  const { allCount } = useCountContext();

  return (
    <section className="w-full h-full flex flex-col items-center overflow-hidden">
      <div className="w-full h-full grid grid-cols-12 gap-4">
        <div className="col-span-3 flex flex-col relative h-auto bg_patterns overflow-auto scrolling__container ">
          <AnimatedBackground position="left" />

          <div className="flex items-baseline justify-between pl-2 sticky top-0">
            <h1 className="text-3xl font-extrabold">Productos</h1>
            <Badge className="flex items-center gap-2 bg-white text-black border-2 border-black hover:bg-white">
              {allCount} <small>productos</small>
            </Badge>
          </div>
          <div className="my-8 flex flex-col gap-8 px-4">
            <ProductStatusFilter />
          </div>
        </div>
        <Modal
          title="Añadir producto"
          open={isOpen}
          openChange={close}
          desc="Aqui podras añadir un nuevo producto a tu inventario :)"
        >
          <Suspense fallback={<FormSkeleton />}>
            <ProductForm className="my-2" />
          </Suspense>
        </Modal>

        <div className="col-span-9 flex flex-col relative h-auto overflow-auto scrolling__container px-2">
          <div className="flex items-center justify-between gap-2 sticky top-0 z-10 bg-white py-2">
            <SearchProduct />
            <Separator orientation="vertical" className="h-[70%] " />
            <div className="flex items-center justify-evenly gap-2 h-full">
              <Button variant={"secondary"}>
                <Ellipsis />
              </Button>
              <Button onClick={open}>Agregar Producto</Button>
            </div>
          </div>
          {productStore.loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                className="h-20 rounded-2xl my-2 border flex flex-col items-start justify-center p-4 gap-4"
                key={index}
              >
                <Skeleton className="h-4 w-16 " />
                <Skeleton className="h-4 w-48 " />
              </div>
            ))}
          {!productStore.loading && (
            <ListProducts products={productStore.products} />
          )}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (productStore.products.current_page > 1) {
                      productStore.setFilters({
                        page: (
                          productStore.products.current_page - 1
                        ).toString(),
                      });
                    }
                  }}
                  className={cn(
                    !productStore.products.previous_page_url &&
                      "pointer-events-none text-zinc-400"
                  )}
                />
              </PaginationItem>
              {Array.from(
                { length: productStore.products.last_page },
                (_, i) => i + 1
              ).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => {
                      productStore.setFilters({ page });
                    }}
                    // onClick={() => fetchPage(page)}
                    isActive={page === productStore.products.current_page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {productStore.products.last_page > 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  //href={productStore.products.next_page_url || ""}
                  onClick={() => {
                    if (
                      productStore.products.current_page <
                      productStore.products.last_page
                    ) {
                      productStore.setFilters({
                        page: (
                          productStore.products.current_page + 1
                        ).toString(),
                      });
                    }
                  }}
                  // ={!productStore.products.next_page_url}
                  className={cn(
                    !productStore.products.next_page_url &&
                      "pointer-events-none text-zinc-400"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
