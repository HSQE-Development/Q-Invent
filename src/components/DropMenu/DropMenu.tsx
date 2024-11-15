import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib";
import { Separator } from "../ui/separator";

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  action?: () => void;
  children?: MenuItem[];
  className?: string;
  separator?: boolean;
}

interface DropMenuProps {
  children: React.ReactNode;
  label?: string;
  items: MenuItem[];
  className?: string;
}

export default function DropMenu(props: DropMenuProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>{props.children}</DropdownMenuTrigger>
        <DropdownMenuContent className={props.className + " w-60"}>
          <DropdownMenuLabel>{props.label ?? "Acciones"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {props.items.map((menu, i) => (
            <>
              <DropdownMenuItem
                onClick={menu.action}
                key={i}
                className={cn("flex items-center gap-2", menu.className)}
              >
                {menu.icon}
                {menu.label}
              </DropdownMenuItem>
              {menu.separator && <Separator orientation="horizontal" />}
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
