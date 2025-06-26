'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

interface AppContextType {
  TeamOpen: boolean
  SetTeamOpen: (open: boolean) => void
  TaskOpen: boolean
  SetTaskOpen: (open: boolean) => void
  SelectTeam: any
  SetSelectTeam: (team: any) => void
  UpdateTaskData: any
  SetUpdateTaskData: (data: any) => void
  isAuthenticated: boolean | null
  setIsAuthenticated: (val: boolean) => void
}

const AppContext = createContext<AppContextType | null>(null)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [TeamOpen, SetTeamOpen] = useState(false)
  const [TaskOpen, SetTaskOpen] = useState(false)
  const [SelectTeam, SetSelectTeam] = useState(null)
  const [UpdateTaskData, SetUpdateTaskData] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/check-auth', {
          withCredentials: true, 
        })
        console.log(res.data)
        setIsAuthenticated(res.data.authenticated)
      } catch (err) {
        console.error('Auth check failed:', err)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

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
        setIsAuthenticated
      }}
    >
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
