import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import { AnimatedBackground } from "@/pages/Login/Login";
import { CounProductsProvider } from "@/context/CountContext";

export default function Layout() {
  return (
    <CounProductsProvider>
      <div className="w-screen h-screen overflow-hidden">
        <div className="w-ful h-full flex flex-col relative items-center justify-start ">
          <AnimatedBackground position="top" />

          <Navbar />
          <main className="w-full h-full px-4 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </CounProductsProvider>
  );
}
