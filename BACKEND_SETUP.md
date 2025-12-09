# Backend Integration Guide

## Overview
This guide explains how to integrate your React frontend with the Node.js backend and n8n workflows.

## Backend Setup

### 1. Install Dependencies
```bash
npm install
npm install express cors body-parser dotenv nodemon --save-dev
```

### 2. Environment Variables
Create a `.env` file in the root directory (copy from `.env.example`):

```env
# Frontend
REACT_APP_OPENROUTER_API_KEY=your_api_key_here
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_FRONTEND_URL=http://localhost:3000

# Backend
PORT=5000
OPENROUTER_API_KEY=your_api_key_here
NODE_ENV=development

# N8N Integration (optional)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/...
N8N_API_KEY=your_n8n_api_key_here
```

**Get your OpenRouter API key:**
1. Go to https://openrouter.ai
2. Sign up for free
3. Copy your API key from settings
4. Add it to your `.env` file

### 3. Running the Server

**Development mode with auto-reload:**
```bash
npm run server:dev
```

**Production mode:**
```bash
npm run server
```

The backend will run on `http://localhost:5000`

## API Endpoints

### 1. Chat Endpoint
Used by the DetailedInput component to get advice from Google Gemini 2.0 Flash.

**POST** `/api/chat`

Request body:
```json
{
  "message": "How to build confidence before a first date?",
  "conversationHistory": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

Response:
```json
{
  "success": true,
  "message": "Here's the advice...",
  "usage": {
    "prompt_tokens": 150,
    "completion_tokens": 300
  }
}
```

### 2. Voice Agent Webhook
Use this endpoint to integrate with n8n for voice processing.

**POST** `/api/webhook/voice-agent`

Request body:
```json
{
  "message": "transcribed text from voice",
  "sessionId": "unique-session-id",
  "metadata": {
    "confidence": 0.95,
    "language": "en"
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Webhook processed successfully",
  "sessionId": "unique-session-id",
  "timestamp": "2024-12-08T..."
}
```

### 3. Health Check
**GET** `/api/health`

Response:
```json
{
  "status": "Backend is running",
  "timestamp": "2024-12-08T..."
}
```

## N8N Integration Setup

### 1. Create a Workflow in n8n
1. Log in to your n8n instance
2. Create a new workflow
3. Add a Webhook trigger node
4. Configure the webhook to POST to your webhook endpoint

### 2. Configure Voice Processing
```
Webhook (voice input)
    ↓
Speech-to-Text (convert audio to text)
    ↓
Call Backend Chat API (get advice)
    ↓
Text-to-Speech (optional)
    ↓
Return response to VoiceAgent component
```

### 3. Update VoiceAgent.js
In `src/components/VoiceAgent.js`, integrate the webhook:

```javascript
const handleVoiceInput = async (audioData) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/webhook/voice-agent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: transcribedText,
        sessionId: sessionId,
        metadata: { confidence: 0.95 }
      })
    }
  );
  const data = await response.json();
  // Handle response
};
```

## Frontend Integration

### 1. DetailedInput Component
The component uses `src/services/openrouterService.js` to communicate with the backend:

```javascript
import { sendMessage } from '../services/openrouterService';

// Send a message
const response = await sendMessage('Your question here', conversationHistory);
console.log(response.message); // AI's response
```

### 2. VoiceAgent Integration (TODO)
Add webhook integration to VoiceAgent.js:

```javascript
const webhookURL = `${process.env.REACT_APP_BACKEND_URL}/api/webhook/voice-agent`;
// When user speaks, transcribe and send to webhook
```

## Deployment Notes

### Frontend (Vercel/Netlify)
1. Set environment variables in deployment settings
2. Build: `npm run build`
3. Deploy the `build/` folder

### Backend (Heroku/Railway/Render)
1. Deploy the entire project
2. Set environment variables
3. Run: `npm run server`

### CORS Configuration
The backend allows requests from your frontend URL. Update `server.js` if deploying to production:

```javascript
app.use(cors({
  origin: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

## Troubleshooting

### "API key not configured" error
- Check if `.env` file exists in root directory
- Verify `REACT_APP_OPENROUTER_API_KEY` is set correctly
- Restart the development server after changing .env

### CORS errors
- Make sure backend is running on http://localhost:5000
- Check that `REACT_APP_BACKEND_URL` matches your backend URL
- Frontend should run on http://localhost:3000

### Chat not responding
- Test the API: `curl http://localhost:5000/api/health`
- Check browser console for errors
- Verify OpenRouter API key is valid

## Next Steps

1. ✅ Backend server setup
2. ✅ Chat API integration
3. ✅ Environment variables configured
4. 🔄 Integrate n8n webhook for voice
5. 🔄 Add voice processing to VoiceAgent.js
6. 🔄 Add conversation history persistence
7. 🔄 Deploy to production
