import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PopoverProps {
  open?: boolean;
  onOpenChange?: () => void;
  children?: React.ReactNode;
  content?: React.ReactNode;
}

export default function MainPopover(props: PopoverProps) {
  return (
    <Popover open={props.open} onOpenChange={props.onOpenChange}>
      {props.children && <PopoverTrigger>{props.children}</PopoverTrigger>}

      <PopoverContent>{props.content}</PopoverContent>
    </Popover>
  );
}
