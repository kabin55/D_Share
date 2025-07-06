import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Navbar from '../../components/DashNav'
import Sidebar from '../../components/Sidebar'
import FloatingBackground from '../../components/FloatingBackground'

export default function UserSettings() {
  const { walletAddress } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('authUser'))
    if (user) {
      setUsername(user.username || '')
      setGender(user.gender || '')
    }
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setMessage('')
    setSuccess(false)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/update`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ walletAddress, username, gender }),
        }
      )

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem(
          'authUser',
          JSON.stringify({
            ...data,
          })
        )
        setSuccess(true)
        setMessage('Profile updated successfully.')
      } else {
        setMessage(data.message || 'Failed to update profile.')
      }
    } catch (err) {
      console.error(err)
      setMessage('Server error.')
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative">
      <Navbar />
      <FloatingBackground />
      <div className="flex flex-1">
        <Sidebar active="Settings" />

        <main className="flex-1 p-10">
          <h1 className="text-3xl font-bold text-cyan-400 mb-6">User Settings</h1>

          <form
            onSubmit={handleUpdate}
            className="bg-[#1a1a1a] p-6 rounded-2xl shadow-xl border border-[#2a2a2a] w-full max-w-xl space-y-6"
          >
            {message && (
              <div
                className={`text-sm p-2 rounded-md ${
                  success ? 'text-green-400' : 'text-red-500'
                }`}
              >
                {message}
              </div>
            )}

            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Gender</label>
              <div className="flex gap-6 mt-1">
                {['male', 'female', 'Other'].map((g) => (
                  <label key={g} className="flex items-center gap-2 capitalize">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={gender === g}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-cyan-500"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Wallet Address</label>
              <input
                type="text"
                value={walletAddress}
                disabled
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-400 border border-gray-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-md"
            >
              Save Changes
            </button>
          </form>

          <div className="mt-10 space-y-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md"
            >
              🔒 Logout & Clear Data
            </button>

            {/* Future: Theme toggle / delete account */}
          </div>
        </main>
      </div>
    </div>
  )
}
