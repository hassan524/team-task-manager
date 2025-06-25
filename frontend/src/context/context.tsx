'use client';
import React, { createContext, useState, useContext } from 'react';

interface AppContextType {
  TeamOpen: boolean;
  SetTeamOpen: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  TeamOpen: false,
  SetTeamOpen: () => {},
});

export const AppProvider = ({ children }: { children: any }) => {
  const [TeamOpen, SetTeamOpen] = useState(Boolean);
 

  return (
    <AppContext.Provider
      value={{
        TeamOpen,
        SetTeamOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);