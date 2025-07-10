import React, { useState } from 'react'
import UserList from '../components/Chat/UserList'
import ChatWindow from '../components/Chat/ChatWindow'
import DashNav from '../components/DashNav'
import FloatingBackground from '../components/FloatingBackground'
import Sidebar from '../components/Sidebar'

const ChatLayout = () => {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans relative">
      <DashNav />
      <FloatingBackground />
      <div className="flex flex-1">
        <Sidebar active="chat" />
        <main className="flex-1 p-10">
          <div className="flex flex-col lg:flex-row gap-10 ">
            <div className="w-1/4 border-r border-blue-300">
              <UserList
                onSelectUser={setSelectedUser}
                selectedUser={selectedUser}
              />
            </div>
            <div className="w-3/4 h-full overflow-y-auto">
              <ChatWindow selectedUser={selectedUser} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ChatLayout
