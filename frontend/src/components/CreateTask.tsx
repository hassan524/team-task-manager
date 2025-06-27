declare global {
  interface Window {
    refreshTasks?: () => void;
  }
}

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/context';
import axios from 'axios';

export function CreateTask() {
  const {
    TaskOpen,
    SetTaskOpen,
    SelectTeam,
    UpdateTaskData,
    SetUpdateTaskData
  } = useAppContext();

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (TaskOpen) {
      if (UpdateTaskData) {
        setTaskName(UpdateTaskData.task_name || '');
        setTaskDescription(UpdateTaskData.task_description || '');
      } else {
        setTaskName('');
        setTaskDescription('');
      }
    }
  }, [TaskOpen, UpdateTaskData]);

  const handleSubmit = async () => {
    if (!taskName || !taskDescription || !SelectTeam?.id) {
      alert('Please fill all fields and select a team.');
      return;
    }

    try {
      setLoading(true);

      if (UpdateTaskData?.id) {
        // ✅ Update logic
        await axios.post(
          'https://4843cb49-1974-4419-8905-97420a96b80d-00-1kal2br4fska4.sisko.replit.dev/api/tasks/update',
          {
            task_id: UpdateTaskData.id,
            task_name: taskName,
            task_description: taskDescription,
          },
          { withCredentials: true }
        );
      } else {
        // ✅ Create logic
        await axios.post(
          'https://4843cb49-1974-4419-8905-97420a96b80d-00-1kal2br4fska4.sisko.replit.dev/api/tasks/create',
          {
            task_name: taskName,
            task_description: taskDescription,
            team_id: SelectTeam.id,
          },
          { withCredentials: true }
        );
      }

      // Reset state
      SetTaskOpen(false);
      SetUpdateTaskData(null);
      setTaskName('');
      setTaskDescription('');
      window.refreshTasks?.();

    } catch (err) {
      console.error('Failed to save task', err);
      alert('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={TaskOpen}
      onOpenChange={(open) => {
        SetTaskOpen(open);
        if (!open) {
          setTaskName('');
          setTaskDescription('');
          SetUpdateTaskData(null);
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {UpdateTaskData ? 'Update Task' : 'Create a new Task'}
          </DialogTitle>
          <DialogDescription>
            {UpdateTaskData
              ? 'Edit your task details below.'
              : 'Fill out the form to create a new task.'}
          </DialogDescription>
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

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading
              ? UpdateTaskData
                ? 'Updating...'
                : 'Creating...'
              : UpdateTaskData
              ? 'Update'
              : 'Create'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
