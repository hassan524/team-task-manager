import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/context/context";
import axios from "axios";

export function TasksContainer() {
  const { SetTaskOpen, SelectTeam } = useAppContext();
  const [tasks, setTasks] = useState<any[]>([]);

  const refreshTasks = async () => {
    if (!SelectTeam) return;
    try {
      const res = await axios.get(
        `http://localhost:3000/api/tasks/getTasks?teamId=${SelectTeam.id}`,
        { withCredentials: true }
      );
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    if (SelectTeam) refreshTasks();
  }, [SelectTeam]);

  useEffect(() => {
    if (SelectTeam) {
      // @ts-ignore
      window.refreshTasks = refreshTasks;
    }
  }, [SelectTeam]);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col h-[60vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Project Tasks</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            className={`h-8 px-3 text-sm cursor-pointer ${SelectTeam ? "flex" : "hidden"}`}
            onClick={() => SetTaskOpen(true)}
          >
            + Task
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                <i className="bi bi-three-dots-vertical text-gray-700 text-base"></i>
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
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-3">
        {tasks.map((task: any) => (
          <div
            key={task.id}
            className="w-full p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            {/* Task title + menu */}
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-sm font-semibold text-gray-900 break-words w-full max-w-[85%] capitalize">
                {task.task_name}
              </h3>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`h-6 w-6 shrink-0 rounded-full transition ${
                      task.is_completed
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    disabled={task.is_completed}
                    aria-label="Open task options"
                  ></button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!task.is_completed && (
                    <DropdownMenuItem
                      onClick={async () => {
                        try {
                          await axios.post(
                            "http://localhost:3000/api/tasks/toggle",
                            {
                              task_id: task.id,
                              is_completed: true,
                            },
                            { withCredentials: true }
                          );
                          window.refreshTasks?.();
                        } catch (err) {
                          alert("Failed to mark complete");
                        }
                      }}
                    >
                      Complete
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={async () => {
                      const confirm = window.confirm("Are you sure to delete?");
                      if (!confirm) return;
                      try {
                        await axios.post(
                          "http://localhost:3000/api/tasks/delete",
                          {
                            task_id: task.id,
                          },
                          { withCredentials: true }
                        );
                        window.refreshTasks?.();
                      } catch (err) {
                        alert("Failed to delete task");
                      }
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Task Description */}
            <p className="text-xs text-gray-600 mt-1 break-words whitespace-pre-wrap capitalize">
              {task.task_description}
            </p>

            {/* Status */}
            <div className="text-xs text-gray-500 mt-2">
              Status: {task.is_completed ? "Completed" : "Pending"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
