
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Leaf, Database, LineChart, Tractor, Users, FileSpreadsheet, 
  ScrollText, FileText, HelpCircle, Settings, Sun, Moon 
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function AppSidebar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const mainMenuItems = [
    {
      title: "Dashboard",
      icon: LineChart,
      url: "/",
    },
    {
      title: "Centre de données",
      icon: Database,
      url: "/data-center",
    },
    {
      title: "Cultures",
      icon: Leaf,
      url: "/crops",
    },
    {
      title: "Élevage",
      icon: Tractor,
      url: "/livestock",
    },
    {
      title: "Aide à la décision",
      icon: HelpCircle,
      url: "/decision-support",
    },
    {
      title: "Financement",
      icon: FileSpreadsheet,
      url: "/financing",
    },
  ];

  const secondaryMenuItems = [
    {
      title: "Documents",
      icon: ScrollText,
      url: "/documents",
    },
    {
      title: "Rapports",
      icon: FileText,
      url: "/reports",
    },
    {
      title: "Paramètres",
      icon: Settings,
      url: "/settings",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-md p-1.5">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div className="font-bold text-xl">AgriPilot+</div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Data Hub</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    active={isActive(item.url)}
                    className={isActive(item.url) ? "bg-primary/10" : ""}
                  >
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Gestion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    active={isActive(item.url)}
                    className={isActive(item.url) ? "bg-primary/10" : ""}
                  >
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-gentle"></div>
            <span className="text-xs text-muted-foreground">Connecté</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
