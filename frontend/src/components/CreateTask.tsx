import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/context"

export function CreateTask() {
    const { TaskOpen, SetTaskOpen } = useAppContext()

    return (
        <Dialog open={TaskOpen} onOpenChange={SetTaskOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create a new Task</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div className="flex flex-col space-y-3">
                        <Input
                            id="team-name"
                            placeholder="Enter Task Name"
                        />
                        <Input
                            id="team-name"
                            placeholder="Enter Task description"
                        />
                    </div>

                    <Button className="w-full" >
                        Create
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
