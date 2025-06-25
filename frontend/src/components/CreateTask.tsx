declare global {
  interface Window {
    refreshTasks?: () => void;
  }
}

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/context";
import axios from "axios";

export function CreateTask() {
  const { TaskOpen, SetTaskOpen, SelectTeam } = useAppContext();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [loading, setLoading] = useState(false);

const handleCreateTask = async () => {
  if (!taskName || !taskDescription || !SelectTeam?.id) {
    alert("Please fill all fields and select a team.");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:3000/api/tasks/create",
      {
        task_name: taskName,
        task_description: taskDescription,
        team_id: SelectTeam.id,
      },
      { withCredentials: true }
    );

    // Clear inputs
    setTaskName("");
    setTaskDescription("");

    SetTaskOpen(false);

    window.refreshTasks?.();

  } catch (err) {
    console.error("Failed to create task", err);
    alert("Failed to create task");
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog open={TaskOpen} onOpenChange={SetTaskOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex flex-col space-y-3">
            <Input
              placeholder="Enter Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Input
              placeholder="Enter Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>

          <Button
            className="w-full"
            onClick={handleCreateTask}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
