import { FormSkeleton } from "@/components";
import { Product } from "@/models";
import { useProductStore } from "@/store/productStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfo, {
  BulletSeparator,
} from "../Product/Components/ProductInfo";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDateInWords } from "@/lib/format-date-in-words";
import { cn } from "@/lib";

export default function ProductHistoryPage() {
  const [product, setProduct] = useState<Product | null>(null);
  let { productId } = useParams();
  const { getProductById, loading } = useProductStore();

  useEffect(() => {
    const handleFetch = async () => {
      if (productId) setProduct(await getProductById(parseInt(productId)));
    };
    handleFetch();
  }, [productId]);

  if (loading) {
    return <FormSkeleton />;
  }
  return (
    <section
      aria-label="Hisotrial del producto"
      className="w-full h-full flex flex-col border rounded-2xl p-4"
    >
      {product && <ProductInfo product={product} />}

      {product && (
        <Table>
          <TableCaption>Historial de movimientos del producto.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Persona</TableHead>
              <TableHead>Accion</TableHead>
              <TableHead>Observacion</TableHead>
              <TableHead>Fecha Asignación</TableHead>
              <TableHead>Fecha Devolución</TableHead>
              <TableHead className="text-right">Cantidad Asignada</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.productHistories.map((history) => {
              return (
                <TableRow key={history.id}>
                  <TableCell>
                    <div className="flex flex-col items-start">
                      {history.peopleName === null && <span></span>}
                      {history.peopleName !== null && (
                        <>
                          <h1 className="font-bold">{history.peopleName}</h1>
                          <span className="flex items-center gap-2">
                            {history.peopleEmail} <BulletSeparator />{" "}
                            {history.peoplePhone}
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        history.assignDate &&
                          !history.devolutionDate &&
                          "bg-orange-50 text-orange-900 hover:bg-orange-100",

                        history.devolutionDate &&
                          !history.assignDate &&
                          "bg-green-50 text-green-900 hover:bg-green-100",

                        history.assignDate &&
                          history.devolutionDate &&
                          "bg-green-50 text-green-900 hover:bg-green-100"
                      )}
                    >
                      {history.assignDate &&
                        !history.devolutionDate &&
                        "Asignación"}
                      {history.devolutionDate &&
                        !history.assignDate &&
                        "Devolución"}
                      {history.assignDate &&
                        history.devolutionDate &&
                        "Devolución"}
                    </Badge>
                  </TableCell>
                  <TableCell>{history.observation}</TableCell>
                  <TableCell>
                    {history.assignDate &&
                      formatDateInWords(history.assignDate)}
                  </TableCell>
                  <TableCell>
                    {history.devolutionDate &&
                      formatDateInWords(history.devolutionDate)}
                  </TableCell>
                  <TableCell className="text-center">
                    {history.assignmentQuantity && (
                      <Badge className="text-xl">
                        {history.assignmentQuantity}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
