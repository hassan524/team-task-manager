import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "./ui/sidebar";
import {
  BarChart3,
  Users,
  ClipboardList,
  TrendingUp,
  Settings,
  Check
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const navigation = [
  {
    title: "Dashboard",
    icon: TrendingUp,
    href: "/",
    isActive: true
  },
  {
    title: "Teams",
    icon: Users,
    href: "/teams"
  },
  {
    title: "Tasks",
    icon: ClipboardList,
    href: "/tasks"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings"
  }
];

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Check className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900">TaskFlow</h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 overflow-y-auto">
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                className="w-full justify-start"
              >
                <a href={item.href} className="flex items-center space-x-3 px-3 py-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm">
              JS
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900">John Smith</p>
            <p className="text-xs text-slate-500">Project Manager</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
