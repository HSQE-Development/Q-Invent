import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  desc?: string;
  open: boolean;
  openChange: () => void;
  children: React.ReactNode;
}

export default function Modal(props: ModalProps) {
  return (
    <Dialog open={props.open} onOpenChange={props.openChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          {props.desc && <DialogDescription>{props.desc}</DialogDescription>}
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}
