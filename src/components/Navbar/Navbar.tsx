"use client";

import { useAuthStore } from "@/store";
import Avvvatars from "avvvatars-react";
import React from "react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { House } from "lucide-react";
import { cn } from "@/lib";

export interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
  const { authUser, logout } = useAuthStore();

  const location = useLocation();

  return (
    <div className="flex items-center justify-center w-full h-20 ">
      <div className="flex items-center justify-between w-[60%]  py-1 px-8 rounded-3xl border">
        <h1 className="font-extrabold text-3xl bg-gradient-to-r from-slate-700/90 to-violet-700 bg-clip-text text-transparent">
          Q-Invent
        </h1>

        <div className="flex items-center justify-around">
          <nav>
            <ul className="flex items-center justify-center">
              <li>
                <Link
                  to={"/"}
                  className={cn(
                    "flex items-center gap-2 border px-2 py-1 rounded-2xl w-full h-full",
                    location.pathname === "/inventory" && "bg-black text-white"
                  )}
                >
                  <House className="w-4 h-4" />
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {authUser && (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={"link"}
              onClick={async () => {
                await logout();
              }}
            >
              Cerrar Sesión
            </Button>
            <Avvvatars
              style="character"
              size={40}
              value={authUser.user.firstName}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
