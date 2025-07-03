// src/context/AuthContext.jsx
import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem('walletAddress') || ''
  )

  const login = (address) => {
    setWalletAddress(address)
    localStorage.setItem('walletAddress', address)
  }

  const logout = () => {
    setWalletAddress('')
    localStorage.removeItem('walletAddress')
  }

  return (
    <AuthContext.Provider value={{ walletAddress, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
import { createContext, useContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem('chat-user')) || null
  )

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}
