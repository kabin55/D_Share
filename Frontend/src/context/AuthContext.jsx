// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem('walletAddress') || ''
  )

  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem('authUser')) || null
  )

  const login = (address, userData) => {
    setWalletAddress(address)
    localStorage.setItem('walletAddress', address)

    if (userData) {
      setAuthUser(userData)
      localStorage.setItem('authUser', JSON.stringify(userData))
    }
  }

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (err) {
      console.error('Logout failed:', err)
    }

    setWalletAddress('')
    setAuthUser(null)

    localStorage.removeItem('walletAddress')
    localStorage.removeItem('authUser')
    localStorage.removeItem('profilePic') // Optional: if you’re storing a separate profile pic
  }

  return (
    <AuthContext.Provider value={{ walletAddress, authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
