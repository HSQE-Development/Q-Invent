import { Button, Input } from "@/components";
import { useDebounce } from "@/hooks";
import { useProductStore } from "@/store/productStore";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchProduct() {
  const { setFilters } = useProductStore();
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
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <Input
        type="email"
        placeholder="Buscar producto."
        className="w-[95%] bg-white"
        value={inputValue}
        onChange={handleChange}
      />
      <div className="flex items-center justify-center flex-1">
        <Button variant={"secondary"} className="rounded-r-none">
          <Ellipsis />
        </Button>
        <Button variant={"secondary"} className="rounded-l-none">
          <Ellipsis />
        </Button>
      </div>
    </div>
  );
}
