import { useAuthStore } from "@/store";
import Avvvatars from "avvvatars-react";
import React from "react";

export interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
  const { authUser } = useAuthStore();
  return (
    <div className="flex items-center justify-center w-full h-20 ">
      <div className="flex items-center justify-between w-[60%]  py-1 px-8 rounded-3xl border">
        <h1 className="font-extrabold text-3xl bg-gradient-to-r from-slate-700/90 to-violet-700 bg-clip-text text-transparent">
          Q-Invent
        </h1>
        <div className="flex items-center justify-around"></div>
        {authUser && (
          <Avvvatars
            style="character"
            size={40}
            value={authUser.user.firstName}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;