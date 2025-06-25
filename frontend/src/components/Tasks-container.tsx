import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

const staticTasks = [
  {
    id: 1,
    title: "Design landing page",
    description: "Create responsive design for marketing site",
    status: "in-progress",
    priority: "high",
  },
  {
    id: 2,
    title: "API Integration",
    description: "Connect backend services",
    status: "completed",
    priority: "medium",
  },
  {
    id: 3,
    title: "Setup Database",
    description: "Configure PostgreSQL for development",
    status: "in-progress",
    priority: "low",
  },
  {
    id: 4,
    title: "QA Testing",
    description: "Test all user flows and edge cases",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: 5,
    title: "Deployment",
    description: "Push to production environment",
    status: "pending",
    priority: "high",
  },
];

export function TasksContainer() {
  return (
    <Card className="bg-white w-full max-w-full shadow-sm border border-gray-200/60 h-[60vh] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Project Tasks
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Tasks</DropdownMenuItem>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>High Priority</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-3 flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-3">
            {staticTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              >
                <h3 className="text-sm font-semibold text-gray-900">{task.title}</h3>
                <p className="text-xs text-gray-600">{task.description}</p>
                <div className="text-xs text-gray-500 mt-2 flex space-x-3">
                  <span>Status: {task.status}</span>
                  <span>Priority: {task.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
