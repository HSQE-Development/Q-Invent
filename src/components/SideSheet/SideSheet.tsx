import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SideSheetProps {
  open: boolean;
  openChange: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function SideSheet(props: SideSheetProps) {
  return (
    <Sheet onOpenChange={props.openChange} open={props.open}>
      <SheetContent>
        <SheetHeader>
          {props.title && <SheetTitle>{props.title}</SheetTitle>}
          {props.description && (
            <SheetDescription>{props.description}</SheetDescription>
          )}
        </SheetHeader>
        {props.children}
      </SheetContent>
    </Sheet>
  );
}
