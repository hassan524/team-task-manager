import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Code, Server, Palette, Bug, } from 'lucide-react';
import type { LucideIcon } from "lucide-react"
import { useAppContext } from '@/context/context';

interface Team {
  id: number;
  name: string;
  membercount: number;
  icon: LucideIcon;
  color: string;
}

const icons = [Code, Server, Palette, Bug];
const colors = [
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
  'bg-orange-100 text-orange-600'
];

export default function TeamsContainer({ onSelectTeam }: any) {
  const [teams, setTeams] = useState<Team[]>([]);
  const {SetSelectTeam} = useAppContext()

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/teams/GetTeams', {
          withCredentials: true,
        });

        const fetchedTeams = res.data.teams || [];

        const enhanced: Team[] = fetchedTeams.map((team: any) => {
          const randomIcon = icons[Math.floor(Math.random() * icons.length)];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return {
            ...team,
            icon: randomIcon,
            color: randomColor,
            membercount: team.membercount || 0,
          };
        });

        setTeams(enhanced);
      } catch (err) {
        console.error('Error fetching teams:', err);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="w-full lg:w-1/2 h-[50vh] bg-white border p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Teams</h2>
        <Search className="h-4 w-4 text-gray-500" />
      </div>
      {teams.map((team) => (
        <div
          key={team.id}
          className="p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-50 flex items-center"
          onClick={() => SetSelectTeam(team)}
        >
          <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${team.color}`}>
            <team.icon className="h-4 w-4" />
          </div>
          <div className="ml-3 flex-1">
            <h4 className="font-medium text-gray-900">{team.name}</h4>
            <p className="text-xs text-gray-500">{team.membercount} members</p>
          </div>
        </div>
      ))}
    </div>
  );
}
