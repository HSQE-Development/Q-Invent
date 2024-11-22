import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib";

interface ModalProps {
  title: string;
  desc?: string;
  open: boolean;
  openChange: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Modal(props: ModalProps) {
  return (
    <Dialog open={props.open} onOpenChange={props.openChange}>
      <DialogContent className={cn("sm:w-[425px]", props.className)}>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          {props.desc && <DialogDescription>{props.desc}</DialogDescription>}
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}
