/**
 * Google Gemini API Service
 * Handles all communication with Google's Gemini 2.5 Flash model via backend
 */

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

console.log('📡 Gemini Service initialized with API_BASE_URL:', API_BASE_URL);

/**
 * Send a message to the AI
 * @param {string} userMessage - The user's message
 * @param {Array} conversationHistory - Previous messages for context
 * @returns {Promise<Object>} - The AI's response
 */
export const sendMessage = async (userMessage, conversationHistory = []) => {
  try {
    console.log('📤 Sending message to backend:', API_BASE_URL + '/api/chat');
    
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory: conversationHistory
      })
    });

    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Backend error:', errorData);
      throw new Error(errorData.error || `Backend error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Response received:', data);
    return data;
  } catch (error) {
    console.error('❌ Chat Service Error:', error);
    throw new Error(error.message || 'Failed to fetch response. Make sure backend is running on port 5000');
  }
};

/**
 * Send a quick preset query (for popular queries in DetailedInput)
 * @param {string} query - The preset query
 * @returns {Promise<Object>} - The AI's response
 */
export const sendQuickQuery = async (query) => {
  // Uses the standard sendMessage without conversation history for simplicity
  return sendMessage(query, []);
};

/**
 * Generate advice for a specific topic
 * @param {string} topic - The relationship topic
 * @param {string} context - Additional context
 * @returns {Promise<Object>} - Advice response
 */
export const getAdvice = async (topic, context = '') => {
  const message = context 
    ? `I need advice on ${topic}. Additional context: ${context}`
    : `I need advice on ${topic}.`;
  
  return sendMessage(message, []);
};

const apiService = {
  sendMessage,
  sendQuickQuery,
  getAdvice
};

export default apiService;