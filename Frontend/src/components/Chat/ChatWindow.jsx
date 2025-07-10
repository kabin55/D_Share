import React, { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)
  const currentUser = JSON.parse(localStorage.getItem('authUser'))

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser || !currentUser) return

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/messages/${
            selectedUser._id
          }`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        )
        const data = await res.json()
        setMessages(data)
      } catch (err) {
        console.error('Error fetching messages:', err)
        toast.error('Failed to load messages')
      }
    }

    fetchMessages()
    setMessages([]) // Clear old messages
  }, [selectedUser])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    setSending(true)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/messages/send/${
          selectedUser._id
        }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({ text: input }),
        }
      )

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to send message')
      }

      const savedMessage = await res.json()
      setMessages((prev) => [...prev, savedMessage])
      setInput('')
    } catch (err) {
      toast.error('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        Select a user to start chatting
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white rounded shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-blue-100 flex items-center gap-3">
        <img
          src={
            selectedUser.profilePic ||
            `https://i.pravatar.cc/150?u=${selectedUser._id}`
          }
          alt={selectedUser.username}
          className="w-10 h-10 rounded-full object-cover border border-blue-300"
        />
        <span className="font-semibold text-lg text-blue-700">
          {selectedUser.username}
        </span>
      </div>

      {/* Message Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.slice(-6).map((msg, index) => {
          const senderId =
            typeof msg.sender === 'string' ? msg.sender : msg.sender?._id
          const isCurrentUser = senderId === currentUser._id
          const senderPic = isCurrentUser
            ? currentUser?.profilePic
            : selectedUser?.profilePic
          const time = new Date(msg.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })

          return (
            <div
              key={msg._id ?? msg.id ?? index}
              className={`flex flex-col ${
                isCurrentUser ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`flex items-end gap-2 ${
                  isCurrentUser ? 'flex-row-reverse' : ''
                }`}
              >
                <img
                  src={senderPic || `https://i.pravatar.cc/150?u=${senderId}`}
                  alt="Sender"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    isCurrentUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-0.5">{time}</span>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex gap-2 ">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
          placeholder="Type a message"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend()
          }}
          disabled={sending}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={!input.trim() || sending}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWindow
