import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser || !currentUser) return;
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
        );
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        toast.error("Failed to load messages");
      }
    };

    fetchMessages();
    setMessages([]);
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setSending(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/messages/send/${
          selectedUser._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({ text: input }),
        }
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send message");
      }
      const savedMessage = await res.json();
      setMessages((prev) => [...prev, savedMessage]);
      setInput("");
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[85vh] w-full max-w-[700px] bg-[#1e1e1e]/90 rounded-3xl shadow-xl border border-[#333] backdrop-blur-md text-white">
      {/* Header */}
      <div className="p-6 border-b border-[#333] bg-[#111] flex items-center gap-3 rounded-t-3xl">
        <img
          src={
            selectedUser.profilePic ||
            `https://i.pravatar.cc/150?u=${selectedUser._id}`
          }
          alt={selectedUser.username}
          className="w-12 h-12 rounded-full object-cover border border-cyan-400"
        />
        <span className="font-semibold text-xl text-cyan-400">
          {selectedUser.username}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#111]/80">
        {messages.slice(-12).map((msg, index) => {
          const senderId =
            typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
          const isCurrentUser = senderId === currentUser._id;
          const senderPic = isCurrentUser
            ? currentUser?.profilePic
            : selectedUser?.profilePic;
          const time = new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={msg._id ?? msg.id ?? index}
              className={`flex flex-col ${
                isCurrentUser ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`flex items-end gap-3 ${
                  isCurrentUser ? "flex-row-reverse" : ""
                }`}
              >
                <img
                  src={senderPic || `https://i.pravatar.cc/150?u=${senderId}`}
                  alt="Sender"
                  className="w-9 h-9 rounded-full border border-gray-700"
                />
                <div
                  className={`max-w-xs px-5 py-3 rounded-2xl text-sm ${
                    isCurrentUser
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black"
                      : "bg-[#333] text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5">{time}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-[#333] bg-[#111] flex gap-4 rounded-b-3xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-[#1a1a1a] text-white placeholder-gray-500 rounded-xl px-5 py-3 border border-[#444] focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm caret-white"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          disabled={sending}
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black px-8 py-3 rounded-xl font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!input.trim() || sending}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
