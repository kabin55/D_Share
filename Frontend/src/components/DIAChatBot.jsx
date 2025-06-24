// src/components/DIAChatBot.jsx
import { useState, useRef, useEffect } from 'react';

const DIAChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm DIA, your DShare Intelligent Assistant. Ask me anything!", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(input);
      setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const getAIResponse = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('dshare')) return "DShare is a decentralized platform for secure file sharing using IPFS and blockchain.";
    if (text.includes('upload')) return "To upload a file, connect MetaMask, scan the file for viruses, and it will be saved to IPFS.";
    if (text.includes('download')) return "You can download files using their unique CID from IPFS.";
    if (text.includes('admin')) return "Admins can view logs, block users, and monitor file sharing activities.";
    if (text.includes('login')) return "Login is done via MetaMask for secure authentication.";
    return "I'm DIA – feel free to ask about uploads, blockchain, admin features, or anything related to DShare!";
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={styles.container}>
      {isOpen && (
        <div style={styles.chatBox}>
          <div style={styles.header}>
            <strong>DIA - DShare Assistant</strong>
            <button style={styles.closeBtn} onClick={toggleChat}>✖</button>
          </div>
          <div style={styles.chatContent}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? '#3b82f6' : '#e2e8f0',
                  color: msg.sender === 'user' ? '#fff' : '#1e293b'
                }}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && <div style={styles.typing}>DIA is typing...</div>}
            <div ref={chatRef} />
          </div>
          <form onSubmit={sendMessage} style={styles.inputSection}>
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.sendBtn}>Send</button>
          </form>
        </div>
      )}
      <button onClick={toggleChat} style={styles.toggleBtn}>
        {isOpen ? 'Close DIA' : '💬'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 9999,
  },
  chatBox: {
    width: 340,
    height: 480,
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginBottom: 12,
  },
  header: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    background: 'none',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  },
  chatContent: {
    flex: 1,
    padding: 12,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    backgroundColor: '#f1f5f9',
  },
  message: {
    padding: '10px 14px',
    borderRadius: '16px',
    maxWidth: '80%',
    fontSize: 14,
  },
  typing: {
    fontStyle: 'italic',
    color: '#6b7280',
    padding: 4,
    fontSize: 12,
  },
  inputSection: {
    display: 'flex',
    padding: 10,
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #cbd5e1',
    fontSize: 14,
    outline: 'none',
  },
  sendBtn: {
    marginLeft: 10,
    padding: '10px 14px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  toggleBtn: {
    padding: '12px 18px',
    fontSize: 18,
    backgroundColor: '#3b82f6',
    color: '#fff',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  }
};

export default DIAChatBot;
