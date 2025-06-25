'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, Code, Server, Palette, Bug } from 'lucide-react'
import { cn } from '@/lib/utils'

const icons = [Code, Server, Palette, Bug]
const colors = [
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
  'bg-orange-100 text-orange-600'
]

export function TeamsContainer() {
  const [teams, setTeams] = useState<any[]>([])

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/teams/GetTeams', {
          withCredentials: true
        }) // adjust endpoint if needed
        const fetchedTeams = res.data.teams || []
        console.log('got teams', res)

        const enhanced = fetchedTeams.map((team: any) => {
          const randomIcon = icons[Math.floor(Math.random() * icons.length)]
          const randomColor = colors[Math.floor(Math.random() * colors.length)]
          return {
            ...team,
            icon: randomIcon,
            color: randomColor,
            memberCount: team.member_count || 0,
            status: 'active'
          }
        })

        setTeams(enhanced)
      } catch (err) {
        console.error('❌ Error fetching teams:', err)
      }
    }

    fetchTeams()
  }, [])

  return (
    <Card className="bg-white lg:w-[50%] w-full h-[50vh] shadow-sm border border-gray-200/60 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Teams</CardTitle>
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-0 pb-0 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-1">
            {teams.map((team) => (
              <div
                key={team.id}
                className="p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center',
                      team.color
                    )}
                  >
                    <team.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {team.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {team.membercount} members
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      'text-xs px-2 py-0.5',
                      team.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    )}
                  >
                    {team.status === 'active' ? 'Active' : 'Hold'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
