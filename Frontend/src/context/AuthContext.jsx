// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem('walletAddress') || ''
  )

  // Accept address and user data as arguments
  const login = (address, data) => {
    setWalletAddress(address)
    localStorage.setItem('walletAddress', address)
    if (data) {
      localStorage.setItem('authUser', JSON.stringify(data))
    }
  }

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include', // important to send cookies
      })
    } catch (err) {
      console.error('Logout failed:', err)
    }

    setWalletAddress('')
    localStorage.removeItem('walletAddress')
    localStorage.removeItem('authUser')
    localStorage.removeItem('profilePic')
  }

  return (
    <AuthContext.Provider value={{ walletAddress, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUserState] = useState(
    JSON.parse(localStorage.getItem('authUser')) || null
  )

  // Helper to set both state and localStorage
  const setAuthUser = (user) => {
    setAuthUserState(user)
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('authUser')
    }
  }

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}