'use client'

import React, { createContext, useState, useContext } from 'react'

interface AppContextType {
  TeamOpen: boolean
  SetTeamOpen: (open: boolean) => void,
  TaskOpen: boolean,
  SetTaskOpen: (open: boolean) => void,
  SelectTeam: any,
  SetSelectTeam: (team: any) => void
}

const AppContext = createContext<AppContextType | null>(null)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [TeamOpen, SetTeamOpen] = useState(false)
  const [SelectTeam, SetSelectTeam] = useState(null)
  const [TaskOpen, SetTaskOpen] = useState(false)

  return (
    <AppContext.Provider value={{ TeamOpen, SetTeamOpen, SelectTeam, SetSelectTeam, TaskOpen, SetTaskOpen }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }
  return context
}
