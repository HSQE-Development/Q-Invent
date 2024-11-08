import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import { AnimatedBackground } from "@/pages/Login/Login";

export default function Layout() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="w-ful h-full flex flex-col relative items-center justify-start ">
        <AnimatedBackground position="top" />

        <Navbar />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
