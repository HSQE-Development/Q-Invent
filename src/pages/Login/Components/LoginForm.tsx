import { Button, Input } from "@/components";
import FloatLabel from "@/components/float-label";
import { useAuthStore } from "@/store";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const authStore = useAuthStore();

  const onSubmit: SubmitHandler<Inputs> = (data) => handleLogin(data);

  const handleLogin = async (data: Inputs) => {
    await authStore.signIn(data.email, data.password);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-4 w-full  justify-center grid grid-cols-4 gap-8">
        <div className="col-span-4">
          <FloatLabel label="Email" for="email">
            <Input
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
          </FloatLabel>
          {errors.email && (
            <span className="text-red-400">Esta fila es obligatoria</span>
          )}
        </div>

        <div className="col-span-4">
          <FloatLabel label="Contraseña" for="password">
            <Input
              id="password"
              type="password"
              {...register("password", { required: true })}
            />
          </FloatLabel>
          {errors.password && (
            <span className="text-red-400">Esta fila es obligatoria</span>
          )}
        </div>
        <Button
          type="submit"
          className="col-span-4"
          loading={authStore.loading}
        >
          Ingresar
        </Button>
      </div>
    </form>
  );
}
