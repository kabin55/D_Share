import React, { useEffect, useState } from 'react'

const UserList = ({ onSelectUser, selectedUser }) => {
  const [users, setUsers] = useState([])

  const currentUser = JSON.parse(localStorage.getItem('authUser'))
  const currentUserId = currentUser?._id
  const profilePic = currentUser?.profilePic

  useEffect(() => {
    const fetchUsersAndSort = async () => {
      try {
        // Fetch users
        const userRes = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/users?exclude=${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        )
        const userList = await userRes.json()

        // Fetch last messages
        const msgRes = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/messages/last-messages?userId=${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`,
            },
          }
        )
        const lastMessages = await msgRes.json()

        // Map userId to last message time
        const messageMap = {}
        lastMessages.forEach((entry) => {
          messageMap[entry.userId] = new Date(entry.lastMessage?.createdAt || 0)
        })

        // Sort users by latest message timestamp
        userList.sort((a, b) => {
          const aTime = messageMap[a._id] || 0
          const bTime = messageMap[b._id] || 0
          return bTime - aTime
        })

        setUsers(userList)
      } catch (err) {
        console.error('Failed to fetch users or messages:', err)
      }
    }

    fetchUsersAndSort()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">
        <div className="p-4 border-b border-gray-200 bg-blue-100 flex items-center gap-3">
          {profilePic ? (
            <img
              src={profilePic}
              alt={currentUser?.username}
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
