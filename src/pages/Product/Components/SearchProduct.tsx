import { Button, Input } from "@/components";
import { useDebounce } from "@/hooks";
import { useProductStore } from "@/store/productStore";
import { FolderDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export default function SearchProduct() {
  const { setFilters, exportInventoryData, loadingExport } = useProductStore();
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debouncedInputValue.trim() !== "") {
      setFilters({ productName: debouncedInputValue });
    } else {
      setFilters({ productName: "" });
    }
  }, [debouncedInputValue, setFilters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleExport = async () => {
    try {
      await exportInventoryData();
      toast.success("En breve se descagara el excel :)");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <Input
        type="email"
        placeholder="Buscar producto."
        className="w-[95%] bg-white"
        value={inputValue}
        onChange={handleChange}
      />
      <form
        className="flex items-center justify-center flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          handleExport();
        }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"secondary"}
                type="submit"
                className="rounded-r-none bg-green-100 border border-green-800 hover:bg-green-200"
                loading={loadingExport}
              >
                <FolderDown />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Exportar Informe</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </div>
  );
}
