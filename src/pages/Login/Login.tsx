import { LoginForm } from "./Components";
import { motion } from "framer-motion";
import LOGO_COLOR from "/LOGO_COLOR.png";

export interface LoginInterface {}

export const AnimatedBackground: React.FC<{ position: "top" | "bottom" }> = ({
  position,
}) => {
  const gradientColors =
    position === "top" ? "from-violet-800/80" : "from-violet-800/50";
  const height = position === "top" ? "h-8 top-0" : "h-8";
  const width = position === "top" ? "w-[25%]" : "w-[55%]";

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={`absolute rounded-full blur-2xl ${position}-0 bg-gradient-radial ${gradientColors} ${width} ${height}`}
      aria-hidden={true}
    />
  );
};

const Login: React.FC<LoginInterface> = () => {
  return (
    <div className="overflow-x-clip bg-white dark:bg-app-background w-screen h-screen">
      <main className="h-full">
        <section className="flex flex-col md:flex-row w-full h-full relative overflow-hidden mx-auto items-center justify-around">
          <AnimatedBackground position="top" />
          <AnimatedBackground position="bottom" />

          <div className="w-full h-32 md:w-1/2 md:h-full bg_patterns flex items-center justify-center">
            <h1 className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-slate-700/90 to-violet-700 bg-clip-text text-transparent z-10">
              Q-Invent
            </h1>
          </div>
          <div className="w-full md:w-1/2 h-full flex items-center justify-center md:shadow-2xl">
            <div className="flex flex-col items-center md:justify-center md:border px-4 py-8 rounded-2xl gap-8 h-full md:h-80 w-full md:w-[60%] bg-white transition">
              <h1 className="dark:text-white font-bold text-5xl ">
                Iniciar Sesion
              </h1>
              <LoginForm />
            </div>
          </div>
          <picture className="absolute bottom-0 ">
            <source srcSet={LOGO_COLOR} type="image/png" />
            <img src={LOGO_COLOR} alt="Logo" width={150} loading="lazy" />
          </picture>
        </section>
      </main>
    </div>
  );
};

export default Login;
