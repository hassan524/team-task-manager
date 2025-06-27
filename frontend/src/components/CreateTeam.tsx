declare global {
  interface Window {
    fetchTeams: () => void;
  }
}

import { useState } from 'react'
import axios from 'axios'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppContext } from '@/context/context'

export function CreateTeamDialog() {
  const [teamName, setTeamName] = useState("")
  const { SetTeamOpen, TeamOpen } = useAppContext()
  const [loading, setLoading] = useState(false)

  const handleCreateTeam = async () => {
    if (!teamName.trim()) return

    try {
      setLoading(true)

      const response = await axios.post(
        'https://4843cb49-1974-4419-8905-97420a96b80d-00-1kal2br4fska4.sisko.replit.dev/api/teams/create',
        { name: teamName },
        {
          withCredentials: true, 
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      console.log("Team created:", response.data.team)

      setTeamName("")
      SetTeamOpen(false) 
      window.fetchTeams?.();
    } catch (err: any) {
      console.error("Error creating team:", err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
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

          <Button onClick={handleCreateTeam} className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
