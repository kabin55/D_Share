import React, { useState } from 'react'
import UserList from '../components/Chat/UserList'
import ChatWindow from '../components/Chat/ChatWindow'

const ChatLayout = () => {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 border-r border-gray-300">
        <UserList onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      </div>
      <div className="w-3/4">
        <ChatWindow selectedUser={selectedUser} />
      </div>
    </div>
  )
}

export default ChatLayout
