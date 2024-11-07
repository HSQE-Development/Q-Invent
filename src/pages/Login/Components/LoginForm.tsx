import { Button, Input } from "@/components";
import FloatLabel from "@/components/float-label";

export default function LoginForm() {
  return (
    <form className="w-full">
      <div className="col-span-4 w-full  justify-center grid grid-cols-4 gap-8">
        <FloatLabel label="Email" for="email" className="col-span-4">
          <Input type="email" id="email" />
        </FloatLabel>
        <FloatLabel label="Contraseña" for="password" className="col-span-4">
          <Input id="password" type="password" />
        </FloatLabel>
        <Button type="button" className="col-span-4">
          Ingresar
        </Button>
      </div>
    </form>
  );
}
