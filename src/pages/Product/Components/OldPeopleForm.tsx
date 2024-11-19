import { PeopleCard } from "@/components/People";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssignmentPeopleStore } from "@/store/assignmentPeopleStore";
import { useEffect } from "react";
import QuantityCounter from "./QuantityCounter";

export default function OldPeopleForm() {
  const assignmentPeopleStore = useAssignmentPeopleStore();

  useEffect(() => {
    assignmentPeopleStore.getAllAssignmentPeople();
  }, []);
  return (
    <div className="w-full grid-cols-8 space-y-4">
      <Select>
        <SelectTrigger className="col-span-8 !h-auto">
          <SelectValue placeholder="Selecciona una persona" />
        </SelectTrigger>
        <SelectContent className="w-full h-auto">
          {assignmentPeopleStore.assignmentPeoples.map((people) => (
            <SelectItem value={people.name}>
              <PeopleCard people={people} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <QuantityCounter className="col-span-8" />
    </div>
  );
}
