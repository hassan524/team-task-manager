import { useState } from "react";
import { SidebarProvider } from "../components/ui/sidebar";
import { DashboardSidebar } from "../components/app-sidebar";
import { Button } from "../components/ui/button";
import { Bell, Plus, Menu } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import TeamsContainer from "@/components/Teams-container";
import TeamMembersContainer from "@/components/Teams-member-container";
import { TasksContainer } from "@/components/Tasks-container";
import { CreateTeamDialog } from "@/components/CreateTeam";
import { useAppContext } from "@/context/context";

export default function Dashboard() {
     const [selectedTeam, setSelectedTeam] = useState<any>(null);
    const isMobile = useIsMobile();
    const { SetTeamOpen, TeamOpen } = useAppContext()
    console.log(TeamOpen)

    return (
        <SidebarProvider defaultOpen={!isMobile}>
            <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
                {!isMobile && (
                    <div className="w-64 flex-shrink-0">
                        <DashboardSidebar />
                    </div>
                )}

                {isMobile && (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 left-4 z-50"
                            >
                                <div className="flex items-center h-8 px-1 rounded-md bg-white space-x-2">
                                    <i className="bi bi-list text-gray-600 text-lg"></i>
                                </div>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <DashboardSidebar />
                        </SheetContent>
                    </Sheet>
                )}

                <div className="flex flex-col flex-1 min-w-0">
                    <header className="bg-white md:border-b md:border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className={`text-2xl ${!isMobile ? "block" : "hidden"} font-bold text-gray-900`}>
                                    Team Dashboard
                                </h1>
                                <p className={`text-sm ${!isMobile ? "block" : "hidden"} text-gray-600`}>
                                    Manage teams and track progress
                                </p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button className="bg-blue-600 md:flex hidden hover:bg-blue-700" onClick={() => {
                                    console.log("Button clicked!")
                                    SetTeamOpen(true)
                                }}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create New Team
                                </Button>

                                {isMobile && (
                                    <div className="flex items-center h-8 px-1 rounded-md bg-white space-x-2">
                                        <i className="bi bi-three-dots-vertical text-gray-600 text-lg"></i>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto">
                        <div className="px-4 pt-4 pb-8 flex flex-col gap-8 min-h-full md:mt-0 mt-5">
                            {/* Page header */}
                            <div className="flex flex-col gap-1">
                                <h1 className={`text-2xl ${!isMobile ? "hidden" : "block"} text-gray-900`}>
                                    Hi Hassan!
                                </h1>
                                <h1 className={`text-3xl ${!isMobile ? "hidden" : "block"} font-semibold text-gray-900`}>
                                    Manage Your Team And Tasks
                                </h1>
                            </div>

                            {/* Team cards */}
                            <div className="flex flex-col gap-5">
                                <div className="flex lg:flex-row flex-col gap-5">
                                    <TeamsContainer onSelectTeam={setSelectedTeam}/>
                                    <TeamMembersContainer team={selectedTeam}/>
                                </div>

                                {/* Tasks */}
                                <TasksContainer />
                            </div>
                        </div>
                    </main>

                </div>
            </div>

            <CreateTeamDialog />
        </SidebarProvider>
    );
}
