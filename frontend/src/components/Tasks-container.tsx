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
import { CreateTask } from "./CreateTask";

export function TasksContainer() {
  const { SetTaskOpen, SelectTeam, SetUpdateTaskData } = useAppContext();
  const [tasks, setTasks] = useState<any[]>([]);
  const [updateTask, setUpdateTask] = useState<any | null>(null);

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
      window.refreshTasks = refreshTasks;
    }
  }, [SelectTeam]);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col h-[60vh] overflow-y-auto">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Project Tasks</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            className={`h-8 px-3 text-sm cursor-pointer ${SelectTeam ? "flex" : "hidden"}`}
            onClick={() => {
              setUpdateTask(null); // clear update task
              SetTaskOpen(true);   // open dialog
            }}
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
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-sm font-semibold text-gray-900 break-words w-full max-w-[85%]">
                {task.task_name}
              </h3>

              {task.is_completed ? (
                <div className="h-6 w-6 shrink-0 rounded-full bg-green-500" />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="h-6 w-6 shrink-0 rounded-full bg-gray-400 hover:bg-gray-500 transition"
                    ></button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={async () => {
                        await axios.post(
                          "http://localhost:3000/api/tasks/toggle",
                          { task_id: task.id, is_completed: true },
                          { withCredentials: true }
                        );
                        window.refreshTasks?.();
                      }}
                    >
                      Complete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        await axios.post(
                          "http://localhost:3000/api/tasks/delete",
                          { task_id: task.id },
                          { withCredentials: true }
                        );
                        window.refreshTasks?.();
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        SetUpdateTaskData(task); // set current task to update
                        SetTaskOpen(true);   // open dialog
                      }}
                    >
                      Update
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-1 break-words whitespace-pre-wrap">
              {task.task_description}
            </p>
            <div className="text-xs text-gray-500 mt-2">
              Status: {task.is_completed ? "Completed" : "Pending"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
