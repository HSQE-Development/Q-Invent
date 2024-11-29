import { Button, Input } from "@/components";
import { cn, convertFileToBase64, removeBase64Prefix } from "@/lib";
import { useProductStore } from "@/store/productStore";
import { useState } from "react";
import { toast } from "sonner";

interface ProudctUploadExcelProps {
  className?: string;
}

export default function ProudctUploadExcel({
  className,
}: ProudctUploadExcelProps) {
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const productStore = useProductStore();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertFileToBase64(file);
      const base64WithoutPrefix = removeBase64Prefix(base64);
      setFileBase64(base64WithoutPrefix);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (fileBase64) await productStore.importProducts(fileBase64);
      toast.success("Se han cargado los productos");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form
      className={cn("w-full h-full grid grid-cols-8 gap-4 gap-y-8", className)}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col col-span-8">
        <label>Cargar excel</label>
        <Input
          id="name"
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex flex-col col-span-8">
        <Button
          disabled={!fileBase64}
          type="submit"
          loading={productStore.loadingMassiveImport}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
}
