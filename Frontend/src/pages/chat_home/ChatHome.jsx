import MessageContainer from '../../components/messages/MessageContainer'
import Sidebar1 from '../../components/sidebar/Sidebar'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/DashNav'
import FloatingBackground from '../../components/FloatingBackground'

const ChatHome = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
      <Navbar />
      <FloatingBackground />
      <div className="flex flex-1">
        <Sidebar active="chat" />
        <main className="flex-1 p-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <Sidebar1 />
            <MessageContainer />
          </div>
        </main>
      </div>
    </div>
  )
}
export default ChatHome
