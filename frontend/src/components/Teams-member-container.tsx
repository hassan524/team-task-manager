import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '@/context/context';

interface Member {
  id: number;
  name: string;
  email: string;
}



export default function TeamMembersContainer({ }: any) {
  const [members, setMembers] = useState<Member[]>([]);
    const {SelectTeam} = useAppContext()

  useEffect(() => {
    const fetchMembers = async () => {
      if (!SelectTeam) return;

      try {
        const res = await axios.post(
          'http://localhost:3000/api/teams/GetTeamsMember',
          { teamid: SelectTeam.id },
          { withCredentials: true }
        );

        setMembers(res.data.members || []);
      } catch (err) {
        console.error('Error fetching team members:', err);
      }
    };

    fetchMembers();
  }, [SelectTeam]);

  if (!SelectTeam) {
    return (
      <div className="w-full lg:w-1/2 h-[50vh] bg-white shadow-sm rounded-2xl scroll-none border p-4 flex items-center justify-center text-gray-500">
        Select a team to view its members
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/2 h-[50vh] bg-white border p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Team Members</h2>
       <i className="text-2xl bi bi-person-add"></i>
      </div>
      {members.length === 0 ? (
        <p className="text-sm text-gray-400">No members in this team.</p>
      ) : (
        members.map((member) => {
          const initials = member.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={member.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold">
                {initials}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                <p className="text-xs text-gray-500">{member.email}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
