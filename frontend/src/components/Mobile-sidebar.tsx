import {
  Check,
  TrendingUp,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { useAppContext } from "@/context/context";
import { logout } from "@/methods/logout"; 

const Mobilesidebar = () => {
  const { user, setUser, setIsAuthenticated } = useAppContext();
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";
  const fullName = user?.name || "Unknown User";

  const handleLogout = () => {
    logout({ setUser, setIsAuthenticated });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Check className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900">TaskFlow</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          <a href="/" className="flex items-center space-x-3 px-3 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>Dashboard</span>
          </a>
          <a href="/teams" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
            <Users className="h-4 w-4" />
            <span>Teams</span>
          </a>
          <a href="/tasks" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
            <ClipboardList className="h-4 w-4" />
            <span>Tasks</span>
          </a>
          <a href="/analytics" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </a>
          <a href="/settings" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center w-full space-x-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm">
              {firstLetter}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900">{fullName}</p>
            <p className="text-xs text-slate-500">Frontend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobilesidebar;
