import React, { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)
  const currentUser = JSON.parse(localStorage.getItem('authUser'))

  // Fetch messages based on receiverId (case1 logic)
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser || !currentUser) return

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/messages/${selectedUser._id}`,
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
    setMessages([]) // Clear messages when user changes
  }, [selectedUser])

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    setSending(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/messages/send/${selectedUser._id}`,
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
        console.error(error)
        throw new Error('Failed to send message')
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
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
        {messages.map((msg, index) => {
          const senderId =
            typeof msg.sender === 'string' ? msg.sender : msg.sender?._id
          const isCurrentUser = senderId === currentUser._id

          return (
            <div
              key={msg._id ?? msg.id ?? index}
              className={`max-w-xs px-4 py-2 rounded-lg ${
                isCurrentUser
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-gray-300 text-black self-start'
              }`}
            >
              {msg.text}
            </div>
          )
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
          placeholder="Type a message"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend()
            }
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
