'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface AppContextType {
  TeamOpen: boolean;
  SetTeamOpen: (open: boolean) => void;
  TaskOpen: boolean;
  SetTaskOpen: (open: boolean) => void;
  SelectTeam: any;
  SetSelectTeam: (team: any) => void;
  UpdateTaskData: any;
  SetUpdateTaskData: (data: any) => void;
  isAuthenticated: boolean | null;
  setIsAuthenticated: (val: boolean | null) => void; 
  user: any;
  setUser: (user: any) => void;
  InviteOpen: boolean;
  SetInviteOpen: (val: boolean) => void
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [TeamOpen, SetTeamOpen] = useState(false);
  const [TaskOpen, SetTaskOpen] = useState(false);
  const [InviteOpen, SetInviteOpen] = useState(false);
  const [SelectTeam, SetSelectTeam] = useState(null);
  const [UpdateTaskData, SetUpdateTaskData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res1 = await axios.get('https://4843cb49-1974-4419-8905-97420a96b80d-00-1kal2br4fska4.sisko.replit.dev/api/auth/check-auth', {
          withCredentials: true,
        });
        console.log('check-auth:', res1.data);
        setIsAuthenticated(res1.data.authenticated);

        if (res1.data.authenticated) {
          const res2 = await axios.get('https://4843cb49-1974-4419-8905-97420a96b80d-00-1kal2br4fska4.sisko.replit.dev/api/auth/get-auth', {
            withCredentials: true,
          });
          console.log('get-auth:', res2.data);
          setUser(res2.data.user || null);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AppContext.Provider
      value={{
        TeamOpen,
        SetTeamOpen,
        TaskOpen,
        SetTaskOpen,
        SelectTeam,
        SetSelectTeam,
        UpdateTaskData,
        SetUpdateTaskData,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        InviteOpen,
        SetInviteOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return context;
};
