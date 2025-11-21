import { createContext, ReactNode } from 'react'
import axiosInstance from 'axios'

const AxiosContext = createContext(axiosInstance)

const AxiosProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  )
}

export default AxiosProvider