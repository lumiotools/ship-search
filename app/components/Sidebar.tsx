"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Layers,
  Users2,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";

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
  const [isMobileOpen] = React.useState(false);

  const pathname = usePathname();
  const isChatPage = pathname.startsWith("/chat/");

  React.useEffect(() => {
    setIsCollapsed(isChatPage);
  }, [isChatPage]);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "bg-black transition-all duration-300",
        isCollapsed ? "w-20" : "w-52",
        "lg:block", 
        isMobileOpen ? "block" : "hidden", 
        "lg:relative", 
      )}
    >
      <SidebarProvider>
        <Sidebar
          className={cn(
            "text-white mt-16 border-none transition-all duration-300",
            isCollapsed ? "w-20" : "w-52",
            "bg-black"
          )}
        >
          <SidebarContent className="bg-black border-none">
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-center w-full py-2 transition-all duration-300 bg-transparent hover:bg-gray-800"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-300" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              )}
            </Button>

            <SidebarMenu className="mt-12">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveItem(item.id)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-5 text-base text-gray-300 rounded-lg transition-all duration-300 hover:bg-gray-800",
                      isCollapsed ? "justify-center" : "",
                      activeItem === item.id ? "": ""
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