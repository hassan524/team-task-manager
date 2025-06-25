'use client'

import React, { createContext, useState, useContext } from 'react'

interface AppContextType {
  TeamOpen: boolean
  SetTeamOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | null>(null)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [TeamOpen, SetTeamOpen] = useState(false)

  return (
    <AppContext.Provider value={{ TeamOpen, SetTeamOpen }}>
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
