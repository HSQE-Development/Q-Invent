import { Product } from "@/models";

interface AssignPeopleProps {
  product: Product;
}

export default function AssignPeople({ product }: AssignPeopleProps) {
  return <div className="w-full grid grid-cols-4">AssignPeople</div>;
}
