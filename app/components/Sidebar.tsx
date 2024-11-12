"use client";

import * as React from "react";
import { LayoutDashboard, Layers, Users2, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "spaces", icon: Layers, label: "Spaces", badge: 1 },
  { id: "agents", icon: Users2, label: "My Agents" },
  { id: "community", icon: Users, label: "Community" },
  { id: "settings", icon: Settings, label: "My Settings" },
];

export function SidebarComponent() {
  const [activeItem, setActiveItem] = React.useState("dashboard");
  console.log(activeItem);
  return (
    <div className="w-60 bg-black">
      <SidebarProvider>
        <Sidebar className="text-white mt-16 border-none w-60">
          <SidebarContent className="bg-black">
            <SidebarMenu className="mt-16">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveItem(item.id)}
                    className={cn(
                      "mt-3 w-full flex items-center gap-5 px-6 py-4 text-base text-gray-300 rounded-lg hover:text-white hover:bg-transparent"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium">
                        {item.badge}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
