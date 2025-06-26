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

export function InviteModel() {


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
                        Create a new Task
                    </DialogTitle>
                    <DialogDescription>
                        Fill out the form to create a new task
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div className="flex flex-col space-y-3">
                        <Input
                            placeholder="Enter Task Name"
                        />
                    </div>

                    <Button className="w-full">
                        Invite
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
