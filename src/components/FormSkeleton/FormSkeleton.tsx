import { Skeleton } from "../ui/skeleton";

export default function FormSkeleton() {
  return (
    <div className="w-full grid grid-cols-8 gap-4">
      <Skeleton className="col-span-4 w-full h-4" />
      <Skeleton className="col-span-4 w-full h-4" />
      <Skeleton className="col-span-8 w-full h-4" />
    </div>
  );
}
