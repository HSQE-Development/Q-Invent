import React from "react";
import { motion } from "framer-motion";
import { Circle, CircleCheck } from "lucide-react";
import { cn } from "@/lib";
type CheckboxCardProps = {
  icon: React.ReactNode;
  label: string;
  desc?: string;
  id: string; // ID para el input
  name: string; // Nombre para el input
  checked?: boolean; // Indica si el input está marcado
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Función para manejar el cambio
  className?: string;
  isCheckFilter?: boolean;
  dataFilter?: any;
};

export default function ChecboxCard({
  icon,
  label,
  desc,
  name,
  id,
  checked,
  onChange,
  className,
  isCheckFilter,
  dataFilter,
}: CheckboxCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className={"relative w-full min-w-full " + className}
    >
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange} // Maneja el cambio
        className="absolute h-full w-full m-0 cursor-pointer z-10 opacity-0 checked:bg-zinc-700 checked:shadow-lg group "
      />
      <div
        className={`h-full w-full border ${
          checked ? "border-2 border-violet-800" : "border-zinc-200 "
        } rounded-lg transition-all px-4 py-2 flex gap-2 overflow-hidden`}
      >
        {!isCheckFilter && (
          <span className="bg-zinc-100 rounded-full p-2 h-8 w-8  flex items-center justify-center">
            {icon}
          </span>
        )}
        <div className="flex-1 flex flex-col">
          <div className="w-full flex justify-between items-center">
            <h4 className="text-sm font-semibold">{label}</h4>
            {!isCheckFilter && (
              <span>
                {!checked ? (
                  <Circle />
                ) : (
                  <CircleCheck className="text-violet-900" />
                )}
              </span>
            )}
            {isCheckFilter && (
              <span className={cn("bg-zinc-100 p-1 px-2 rounded-md ")}>
                {dataFilter}
              </span>
            )}
          </div>
          {desc && (
            <p className="text-left text-sm text-muted-foreground">{desc}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
