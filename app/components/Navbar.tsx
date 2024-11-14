"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "../../public/orchestro logo.png";
import { Input } from "@/components/ui/input";
import { BellDot, Search, SettingsIcon, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="z-50 fixed w-full flex items-center justify-between gap-2 md:gap-10 shadow-md bg-navbar-bg px-3 md:px-5 py-3">
      <div className="flex items-center justify-between gap-2 md:gap-10">
        <div className="block lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
        <Image
          src={logo}
          alt="log"
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
        />
        <p className="hidden md:block text-white">Hi, Nicolas!</p>
      </div>

      <div className="relative flex-1 md:flex-none flex items-center shadow-md w-[130px] md:w-[450px]">
        <Input
          className="placeholder:text-slate-400 text-slate-400 w-full md:w-[500px] bg-search-bg outline-none border-none pr-10"
          placeholder="Search..."
        />
        <span className="absolute right-3 text-slate-200">
          <Search className="w-4 h-4" />
        </span>
      </div>

      <div className="flex items-center justify-end gap-3 md:gap-5">
        <Button className="hidden md:flex bg-blue-1 hover:bg-blue-1 p-2">
          + New Space
        </Button>
        <Button className="md:hidden bg-blue-1 hover:bg-blue-1 px-3">+</Button>
        <div className="hidden sm:block">
          <BellDot className="text-slate-200 w-5 h-5" />
        </div>
        <div className="hidden sm:block">
          <SettingsIcon className="text-slate-200 w-5 h-5" />
        </div>
        <div>
          <User className="text-slate-200 w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;