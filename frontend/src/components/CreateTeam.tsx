'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppContext } from '@/context/context'

export function CreateTeamDialog() {
  const [teamName, setTeamName] = useState("")

  const { SetTeamOpen, TeamOpen } = useAppContext()

  const handleCreateTeam = () => {
    console.log("Team Name:", teamName)
    setTeamName("")
  }

  return (
    <Dialog open={TeamOpen} onOpenChange={SetTeamOpen}>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new Team</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="team-name" className="text-sm font-medium text-gray-700">
              Team Name
            </label>
            <Input
              id="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
            />
          </div>

          <Button onClick={handleCreateTeam} className="w-full">
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
