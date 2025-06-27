import { useState, useEffect } from "react";
import { SidebarProvider } from "../components/ui/sidebar";
import { DashboardSidebar } from "../components/app-sidebar";
import { Button } from "../components/ui/button";
import DashboardNav from "@/components/DashboardNav";
import { useIsMobile } from "../hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import TeamsContainer from "@/components/Teams-container";
import TeamMembersContainer from "@/components/Teams-member-container";
import { TasksContainer } from "@/components/Tasks-container";
import { CreateTeamDialog } from "@/components/CreateTeam";
import { useAppContext } from "@/context/context";
import { CreateTask } from "@/components/CreateTask";
import { useNavigate } from "react-router-dom";
import Mobilesidebar from "@/components/Mobile-sidebar";
import { InviteModel } from "@/components/InviteModel";

export default function Dashboard() {
    const navigate = useNavigate();
    const [selectedTeam, setSelectedTeam] = useState<any>(null);
    const isMobile = useIsMobile();
    const { SetTeamOpen, TeamOpen, isAuthenticated, user } = useAppContext()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth/signup");
        }
    }, [])


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

                        <SheetContent
                            side="left"
                            className="p-0 w-64 !h-screen !max-h-screen overflow-y-auto bg-white"
                        >
                            <Mobilesidebar />
                        </SheetContent>
                    </Sheet>
                )}

                <div className="flex flex-col flex-1 min-w-0">

                    <DashboardNav />


                    <main className="flex-1 overflow-y-auto">
                        <div className="px-4 pt-4 pb-8 flex flex-col gap-8 min-h-full md:mt-0 mt-5">
                            {/* Page header */}
                            <div className="flex flex-col gap-1">
                                <h1 className={`text-2xl ${!isMobile ? "hidden" : "block"} text-gray-900`}>
                                    Hi {user.name}!
                                </h1>
                                <h1 className={`text-3xl ${!isMobile ? "hidden" : "block"} font-semibold text-gray-900`}>
                                    Manage Your Team And Tasks
                                </h1>
                            </div>

                            {/* Team cards */}
                            <div className="flex flex-col md:gap-5 gap-7">
                                <div className="flex lg:flex-row flex-col md:gap-5 gap-7">
                                    <TeamsContainer onSelectTeam={setSelectedTeam} />
                                    <TeamMembersContainer team={selectedTeam} />
                                </div>

                                {/* Tasks */}
                                <TasksContainer />
                            </div>
                        </div>
                    </main>

                </div>
            </div>

            <CreateTeamDialog />
            <InviteModel />
            <CreateTask />
        </SidebarProvider>
    );
}
