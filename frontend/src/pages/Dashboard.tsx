import { SidebarProvider } from "../components/ui/sidebar";
import { DashboardSidebar } from "../components/app-sidebar";
import { Button } from "../components/ui/button";
import { Bell, Plus, Menu } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

export default function Dashboard() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50/50">
        {/* Sidebar for desktop */}
        {!isMobile && (
          <div className="w-64 flex-shrink-0">
            <DashboardSidebar />
          </div>
        )}

        {/* Mobile Sheet for Sidebar */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 left-4 z-50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <DashboardSidebar />
            </SheetContent>
          </Sheet>
        )}

        {/* MAIN CONTENT */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900"></h1>
                <p className="text-sm text-gray-600">Manage teams and track progress</p>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Team
                </Button>
              </div>
            </div>
          </header>

          {/* Body */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="h-full flex flex-col space-y-6">
              <p className="text-gray-600 text-center">Dashboard content goes here.</p>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
