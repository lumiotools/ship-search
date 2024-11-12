import Image from "next/image";
import React from "react";
import logo from "../../public/orchestro logo.png";
import { Input } from "@/components/ui/input";
import { BellDot, Search, SettingsIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="fixed w-full flex items-center justify-between gap-10 shadow-md bg-navbar-bg px-5 py-3">
      <div className="flex items-center justify-between gap-10">
        <Image
          src={logo}
          alt="log"
          className="w-10 h-10 object-contain"
        ></Image>
        <p className="text-white">Hi, Nicolas!</p>
      </div>
      <div className="relative flex items-center shadow-md">
        <Input
          className="placeholder:text-slate-400 text-slate-400 w-[500px] bg-search-bg outline-none border-none pr-10"
          placeholder="Search..."
        />
        <span className="absolute right-3 text-slate-200">
          <Search className="w-4 h-4" />
        </span>
      </div>
      <div className="flex items-center justify-between gap-5">
        <Button className="bg-blue-1 hover:bg-blue-1">+ New Space</Button>
        <div>
          <BellDot className="text-slate-200 w-5 h-5"></BellDot>
        </div>
        <div className="">
          <SettingsIcon className="text-slate-200 w-5 h-5"></SettingsIcon>
        </div>
        <div>
          <User className="text-slate-200 w-5 h-5"></User>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
