import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sendMessage, sendQuickQuery } from '../services/geminiService';
import './DetailedInput.css';

// Using your common user needs as the detailed input options
const popularQueries = [
  "How to build confidence before a first date?",
  "What are the red flags I should watch out for?",
  "What's the best way to handle being ghosted?",
  "Advice for dating while on the autism spectrum.",
  "How to communicate boundaries in a new relationship?",
  "Tips for a smooth post-breakup no-contact rule.",
];

const DetailedInput = () => {
  const [conversations, setConversations] = useState({});
  const [activeConversation, setActiveConversation] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // Scroll only the messages container, not the entire page
    const container = messagesEndRef.current?.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations, activeConversation]);

  const startNewConversation = async (query) => {
    const conversationId = Date.now().toString();
    setActiveConversation(conversationId);
    setLoading(true);
    setError(null);

    // --- FIX: Scroll fix part 1 (Delay scroll on initial chat pop) ---
    // This gives the chat container time to render before forcing scroll
    setTimeout(scrollToBottom, 50); 
    // -----------------------------------------------------------------

    try {
      // Initialize with user message and empty assistant placeholder
      setConversations(prev => ({
        ...prev,
        [conversationId]: [
          { role: 'user', content: query },
          { role: 'assistant', content: '' }
        ]
      }));

      // Get the response
      const result = await sendQuickQuery(query);
      
      // Update with the assistant response
      setConversations(prev => ({
        ...prev,
        [conversationId]: [
          { role: 'user', content: query },
          { role: 'assistant', content: result.message }
        ]
      }));
    } catch (err) {
      setError(err.message || 'Failed to get response. Check your API key.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    if (!activeConversation) {
      // Start new conversation if none exists
      await startNewConversation(inputValue);
      setInputValue('');
      return;
    }

    const message = inputValue;
    setInputValue('');
    setLoading(true);
    setError(null);

    // --- FIX: Scroll fix part 2 (Delay scroll on new message) ---
    setTimeout(scrollToBottom, 50); 
    // -------------------------------------------------------------

    try {
      const currentMessages = conversations[activeConversation] || [];
      
      // Initialize the assistant message with empty content
      const updatedMessages = [
        ...currentMessages,
        { role: 'user', content: message },
        { role: 'assistant', content: '' }
      ];
      
      setConversations(prev => ({
        ...prev,
        [activeConversation]: updatedMessages
      }));

      // Get the response
      const result = await sendMessage(message, currentMessages);
      
      // Update with the assistant response
      setConversations(prev => ({
        ...prev,
        [activeConversation]: [
          ...currentMessages,
          { role: 'user', content: message },
          { role: 'assistant', content: result.message }
        ]
      }));
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  const currentMessages = activeConversation ? conversations[activeConversation] || [] : [];

  return (
    <section className="input-section">
      {!activeConversation ? (
        <>
          <h2 className="input-heading">Or, Start with a Common Query</h2>
          <p className="input-subtext">Click any prompt to instantly get advice from Clarity, your AI coach.</p>
          
          <motion.div 
            className="query-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {popularQueries.map((query, index) => (
              <motion.button 
                key={index}
                className="query-card"
                variants={cardVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(255, 107, 107, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startNewConversation(query)}
                disabled={loading}
              >
                {query}
              </motion.button>
            ))}
          </motion.div>

          <div className="live-input-bar">
            <input 
              type="text" 
              placeholder="Or ask something specific..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
              disabled={loading}
            />
            <button 
              className="send-btn"
              onClick={handleSendMessage}
              disabled={loading || !inputValue.trim()}
            >
              {loading ? 'Thinking...' : 'Ask Now'}
            </button>
          </div>
        </>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Chat with Clarity</h3>
            <button 
              className="new-chat-btn"
              onClick={() => {
                setActiveConversation(null);
                setInputValue('');
                setError(null);
              }}
            >
              ✕ New Chat
            </button>
          </div>

          <div className="messages-container">
            {currentMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-content">
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message assistant loading">
                <div className="message-content typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <form className="chat-input-bar" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Type your follow-up question..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit"
              className="send-btn"
              disabled={loading || !inputValue.trim()}
            >
              {loading ? '...' : '→'}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default DetailedInput;