"use client";

import * as React from "react";
import {
  BellDot,
  LayoutDashboard,
  Search,
  Settings,
  Settings2,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function Dashboard() {
  const [activeItem, setActiveItem] = React.useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      id: "spaces",
      icon: Settings2,
      label: "Spaces",
      badge: 1,
    },
    {
      id: "agents",
      icon: User,
      label: "My Agents",
    },
    {
      id: "community",
      icon: Users,
      label: "Community",
    },
    {
      id: "settings",
      icon: Settings,
      label: "My Settings",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#1A1A1A]">
        <header className="flex items-center justify-between px-5 py-3 bg-[#242424] border-b border-[#333]">

          <div className="relative flex-1 max-w-[500px] mx-4">
            <Input
              placeholder="Search..."
              className="w-full bg-[#333] border-none text-slate-300 placeholder:text-slate-500 pl-4 pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>

          <div className="flex items-center gap-5">
            <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white">
              + New Space
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-300">
              <BellDot className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-300">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-300">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <Sidebar className="w-64 border-r border-[#333] bg-[#1A1A1A]">
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveItem(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-[#333] rounded-lg transition-colors",
                        activeItem === item.id && "text-white bg-[#333]"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#0066FF] text-xs text-white">
                          {item.badge}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
              <div className="w-96 h-96 bg-[url('/placeholder.svg')] bg-center bg-no-repeat bg-contain opacity-50" />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
