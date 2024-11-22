import MainTabs from "@/components/MainTabs/MainTabs";
import { Product } from "@/models";
import { lazy, Suspense } from "react";
import { FormSkeleton } from "@/components";
import ProductInfo from "./ProductInfo";

const NewPeopleForm = lazy(() => import("./NewPeopleForm"));
const OldPeopleForm = lazy(() => import("./OldPeopleForm"));

interface AssignPeopleProps {
  product: Product;
}

export default function AssignPeople({ product }: AssignPeopleProps) {
  return (
    <div className="w-full grid grid-cols-4 my-8 space-y-4">
      <div className="col-span-8 flex items-center">
        <ProductInfo product={product} />
      </div>
      <MainTabs
        defaultValue="new"
        className="col-span-4"
        tabsLists={[
          {
            label: "Nueva persona",
            value: "new",
          },
          {
            label: "Persona existente",
            value: "old",
          },
        ]}
        tabsContent={[
          {
            value: "new",
            render: (
              <Suspense fallback={<FormSkeleton />}>
                <NewPeopleForm
                  productId={product.id}
                  productQuantityAvailable={product.quantityAvailable}
                />
              </Suspense>
            ),
          },
          {
            value: "old",
            render: (
              <Suspense fallback={<FormSkeleton />}>
                <OldPeopleForm
                  productId={product.id}
                  productQuantityAvailable={product.quantityAvailable}
                />
              </Suspense>
            ),
          },
        ]}
      />
    </div>
  );
}
