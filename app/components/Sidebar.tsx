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
import { usePathname } from "next/navigation";

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "spaces", icon: Layers, label: "Spaces", badge: 1 },
  { id: "agents", icon: Users2, label: "My Agents" },
  { id: "community", icon: Users, label: "Community" },
  { id: "settings", icon: Settings, label: "My Settings" },
];

export function SidebarComponent() {
  const [activeItem, setActiveItem] = React.useState("dashboard");
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  console.log(activeItem);

  const pathname = usePathname();

  const isChatPage = pathname.startsWith("/chat/");

  React.useEffect(() => {
    setIsCollapsed(isChatPage);
  }, [isChatPage]);

  return (
    <div className={cn("bg-black", isCollapsed ? "w-20" : "w-52")}>
      <SidebarProvider>
        <Sidebar
          className={cn(
            "text-white mt-16 border-none transition-all duration-300",
            isCollapsed ? "w-20" : "w-52",
            "bg-black"
          )}
        >
          <SidebarContent className="bg-black border-none">
            {/* <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center justify-center py-2 transition-all duration-300"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-300" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              )}
            </button> */}
            <SidebarMenu className="mt-12">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveItem(item.id)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-5 text-base text-gray-300 rounded-lg transition-all duration-300",
                      isCollapsed ? "justify-center" : ""
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                    {!isCollapsed && item.badge && (
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
