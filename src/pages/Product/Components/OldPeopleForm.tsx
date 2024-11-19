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
import { Button } from "@/components";

export default function OldPeopleForm() {
  const assignmentPeopleStore = useAssignmentPeopleStore();

  useEffect(() => {
    assignmentPeopleStore.getAllAssignmentPeople();
  }, []);

  const handlePeopleChange = (id: number) => {
    assignmentPeopleStore.setAssignment({
      people_id: id,
    });
  };

  const handleAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(assignmentPeopleStore.assignment);
  };

  return (
    <form
      className="w-full grid-cols-8 space-y-4 place-items-center"
      onSubmit={handleAssignment}
    >
      <Select
        name="poeple"
        onValueChange={(e) => {
          handlePeopleChange(parseInt(e));
        }}
      >
        <SelectTrigger className="col-span-8 !h-auto">
          <SelectValue placeholder="Selecciona una persona" />
        </SelectTrigger>
        <SelectContent className="w-full h-auto">
          {assignmentPeopleStore.assignmentPeoples.map((people) => (
            <SelectItem value={people.id.toString()} key={people.id}>
              <PeopleCard people={people} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <QuantityCounter className="col-span-8" />
      <Button className="w-full">Asignar</Button>
    </form>
  );
}
