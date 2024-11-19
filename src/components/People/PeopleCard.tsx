import { AssignmentPeople } from "@/models";
import { BulletSeparator } from "@/pages/Product/Components/ProductCard";
import Avvvatars from "avvvatars-react";

interface PeopleCardProps {
  people: AssignmentPeople;
}

export default function PeopleCard({ people }: PeopleCardProps) {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center justify-start gap-2">
        <Avvvatars value={people.name} />
        <div className="flex flex-col justify-center items-start">
          <h1 className="font-bold">{people.name}</h1>
          <span className="flex items-center gap-1">
            <h2>{people.email}</h2>
            <BulletSeparator />
            <h3>{people.phone}</h3>
          </span>
        </div>
      </div>
    </div>
  );
}
