import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const dummyMembers = [
  {
    id: 1,
    name: "John Doe",
    position: "Frontend Developer",
    initials: "JD",
    status: "online",
    avatarColor: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    name: "Sarah Smith",
    position: "Backend Engineer",
    initials: "SS",
    status: "away",
    avatarColor: "from-purple-400 to-purple-600",
  },
  {
    id: 3,
    name: "Mike Brown",
    position: "Designer",
    initials: "MB",
    status: "offline",
    avatarColor: "from-pink-400 to-pink-600",
  },
  {
    id: 4,
    name: "Emily Wilson",
    position: "QA Analyst",
    initials: "EW",
    status: "online",
    avatarColor: "from-green-400 to-green-600",
  },
];

const statusColorMap = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  offline: "bg-gray-400",
};

export function TeamMembersContainer() {
  return (
    <Card className="bg-white w-full lg:w-[50%] h-[50vh] shadow-sm border border-gray-200/60 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Team Members</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 truncate">Frontend Team</span>
            <Button variant="ghost" size="icon">
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-0 pb-0 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-1">
            {dummyMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50/80 transition-colors"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback
                    className={cn(
                      "bg-gradient-to-br text-white font-medium text-xs",
                      member.avatarColor
                    )}
                  >
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">{member.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{member.position}</p>
                </div>
                <div className="flex items-center space-x-1.5">
                <span className={cn("w-2 h-2 rounded-full", statusColorMap[member.status as keyof typeof statusColorMap])}></span>
                  <span className="text-xs text-gray-500 capitalize">{member.status}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
