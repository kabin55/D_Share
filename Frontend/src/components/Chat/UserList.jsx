import React, { useEffect, useState } from 'react'

const UserList = ({ onSelectUser, selectedUser }) => {
  const [users, setUsers] = useState([])

  const currentUser = JSON.parse(localStorage.getItem('authUser'))
  const currentUserId = currentUser?._id
  const profilePic = currentUser?.profilePic
  // console.log(currentUserId)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users?exclude=${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        )
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        console.error('Failed to fetch users:', err)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">
        <div className="p-4 border-b border-gray-200 bg-blue-100 flex items-center gap-3">
          {profilePic || (selectedUser && selectedUser._id) ? (
            <img
              src={
                profilePic ||
                (selectedUser
                  ? `https://i.pravatar.cc/150?u=${selectedUser._id}`
                  : null)
              }
              alt={selectedUser?.username || 'User'}
              className="w-10 h-10 rounded-full object-cover border border-blue-300"
            />
          ) : null}
          {currentUser?.username}
        </div>
        Chats
      </h2>

      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => onSelectUser(user)}
          className={`flex items-center gap-3 p-2 mb-2 rounded cursor-pointer hover:bg-blue-100 ${
            selectedUser?._id === user._id ? 'bg-blue-200' : ''
          }`}
        >
          <img
            src={user.profilePic || `https://i.pravatar.cc/150?u=${user._id}`}
            alt={user.username}
            className="w-10 h-10 rounded-full"
          />
          <span>{user.username}</span>
        </div>
      ))}
    </div>
  )
}

export default UserList
