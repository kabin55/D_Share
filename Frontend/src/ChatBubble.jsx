import { useState, useRef, useEffect } from 'react';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your DShare assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const styles = {
    chatContainer: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
    },
    chatBubble: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: isHovered ? '#3367d6' : '#4285f4',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    },
    chatWindow: {
      width: '350px',
      height: '500px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      marginBottom: '15px',
      transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
      opacity: isOpen ? 1 : 0,
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    chatHeader: {
      backgroundColor: '#4285f4',
      color: 'white',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '24px',
      cursor: 'pointer',
      padding: 0,
    },
    chatMessages: {
      flex: 1,
      padding: '16px',
      overflowY: 'auto',
      backgroundColor: '#f5f7fa',
    },
    message: {
      marginBottom: '12px',
      padding: '12px 16px',
      borderRadius: '18px',
      maxWidth: '80%',
      wordWrap: 'break-word',
      lineHeight: '1.4',
      fontSize: '14px',
      transition: 'opacity 0.3s',
      opacity: 1,
    },
    userMessage: {
      backgroundColor: '#4285f4',
      color: 'white',
      marginLeft: 'auto',
      borderBottomRightRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    aiMessage: {
      backgroundColor: 'white',
      color: '#333',
      marginRight: 'auto',
      borderBottomLeftRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e0e0e0',
    },
    chatInput: {
      display: 'flex',
      padding: '12px',
      borderTop: '1px solid #e0e0e0',
      backgroundColor: 'white',
    },
    chatInputField: {
      flex: 1,
      padding: '12px 16px',
      border: '1px solid #e0e0e0',
      borderRadius: '24px',
      outline: 'none',
      fontSize: '14px',
    },
    sendButton: {
      marginLeft: '12px',
      padding: '12px 16px',
      backgroundColor: '#4285f4',
      color: 'white',
      border: 'none',
      borderRadius: '24px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
    },
    typingIndicator: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px',
      backgroundColor: 'white',
      borderRadius: '18px',
      marginRight: 'auto',
      borderBottomLeftRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e0e0e0',
      width: 'fit-content',
    },
    typingDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#4285f4',
      borderRadius: '50%',
      margin: '0 2px',
      animation: 'typingAnimation 1.4s infinite ease-in-out',
    },
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsHovered(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(async () => {
      try {
        const aiResponse = await simulateAIResponse(inputValue);
        setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
      } catch (error) {
        setMessages(prev => [...prev, {
          text: "Sorry, I encountered an error. Please try again.",
          sender: 'ai'
        }]);
      } finally {
        setIsTyping(false);
      }
    }, 1000 + Math.random() * 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const simulateAIResponse = async (inputRaw) => {
    const input = inputRaw.toLowerCase();

    if (input.includes("dshare") || input.includes("what is this platform")) {
      return "DShare is a decentralized file-sharing platform that uses Blockchain, IPFS, and Smart Contracts to securely upload, scan, store, and retrieve files.";
    } else if (input.includes("login") || input.includes("metamask")) {
      return "Users log in securely using MetaMask, ensuring identity verification before accessing features.";
    } else if (input.includes("upload") || input.includes("file scan")) {
      return "Uploaded files are scanned using VirusTotal. If clean, they’re stored in IPFS with metadata logged on the blockchain.";
    } else if (input.includes("ipfs") || input.includes("storage")) {
      return "IPFS stores files in a decentralized manner. Each file has a CID (Content Identifier) that is stored on-chain.";
    } else if (input.includes("cid") || input.includes("download")) {
      return "Files are retrieved using their CIDs from IPFS. Smart contracts validate these identifiers before allowing download.";
    } else if (input.includes("admin") || input.includes("dashboard")) {
      return "Admins can monitor users, analyze scanned reports, block users, and see logs. They manage the platform through a dashboard.";
    } else if (input.includes("normal user") || input.includes("permissions")) {
      return "Normal users can upload/download files, report abuse, chat, and manage sharing permissions for their files.";
    } else if (input.includes("smart contract") || input.includes("blockchain")) {
      return "Smart Contracts in DShare manage file hashes and metadata, ensuring the uploaded content is securely verifiable.";
    } else if (input.includes("chat") || input.includes("message")) {
      return "Users can communicate through chat. Abusive content is logged for admin review, while normal messages are kept temporarily.";
    } else if (input.includes("ai") || input.includes("graph")) {
      return "DShare's AI module analyzes activity and generates performance and popularity graphs for users and admins.";
    } else if (input.includes("backend") || input.includes("node")) {
      return "The backend (Node.js) manages file scanning, database storage, smart contract calls, chat logic, and alerting.";
    } else if (input.includes("database") || input.includes("mongo")) {
      return "MongoDB stores alert logs, scanned file data, and chat history. It connects with both frontend and backend services.";
    } else if (input.includes("virus") || input.includes("malware")) {
      return "VirusTotal API integration ensures every file is scanned for threats before being accepted into the system.";
    } else {
      return "I'm here to help with DShare. You can ask about file uploads, smart contracts, IPFS, admin roles, or how our AI module works!";
    }
  };

  return (
    <div style={styles.chatContainer}>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>DShare Assistant</h3>
            <button style={styles.closeBtn} onClick={toggleChat}>×</button>
          </div>
          <div style={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.message,
                  ...(msg.sender === 'user' ? styles.userMessage : styles.aiMessage)
                }}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div style={styles.typingIndicator}>
                <div style={{ ...styles.typingDot, animationDelay: '0s' }} />
                <div style={{ ...styles.typingDot, animationDelay: '0.2s' }} />
                <div style={{ ...styles.typingDot, animationDelay: '0.4s' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} style={styles.chatInput}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about DShare..."
              autoFocus
              style={styles.chatInputField}
            />
            <button
              type="submit"
              style={{
                ...styles.sendButton,
                backgroundColor: inputValue.trim() ? '#4285f4' : '#cccccc',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              }}
              disabled={!inputValue.trim()}
            >
              Send
            </button>
          </form>
        </div>
      )}
      <button
        style={styles.chatBubble}
        onClick={toggleChat}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isOpen ? '✕' : '🤖'}
      </button>
    </div>
  );
};

export default ChatBubble;
