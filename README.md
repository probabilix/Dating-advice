# DatingAdvice.io - AI Relationship Coach

A modern React application with voice and chat interfaces powered by Google Gemini 2.0 Flash, integrated with a Node.js backend and n8n webhooks.

## Features

✨ **Voice Agent** - Talk to Clarity via voice or chat
💬 **AI Chat** - Get relationship advice from Google Gemini 2.0 Flash
🎙️ **Voice Recognition** - Built-in speech-to-text support
🌙 **Dark/Light Mode** - Beautiful theme switching
📱 **Responsive Design** - Works on all devices
🔒 **Secure API Keys** - Environment variable protection

## Quick Start

### 1. Clone & Install Dependencies

```bash
cd dating-advice-site
npm install
```

### 2. Get Your OpenRouter API Key

1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Copy your API key
4. Create `.env` file in root directory:

```env
REACT_APP_OPENROUTER_API_KEY=your_api_key_here
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_FRONTEND_URL=http://localhost:3000
PORT=5000
OPENROUTER_API_KEY=your_api_key_here
NODE_ENV=development
```

### 3. Run Frontend + Backend

**Terminal 1 - Frontend:**
```bash
npm start
```
Opens on http://localhost:3000

**Terminal 2 - Backend:**
```bash
npm run server:dev
```
Runs on http://localhost:5000

## Components

### Frontend

- **Header** - Navigation with dark/light mode toggle
- **VoiceAgent** - Hero section with voice input (integrates with n8n webhook)
- **DetailedInput** - Chat interface powered by OpenRouter API
- **AdviceSection** - Display relationship advice pillars
- **Footer** - Footer information
- **ThemeContext** - Global theme management

### Backend API

**POST** `/api/chat` - Send chat messages to AI
```json
{
  "message": "How to build confidence?",
  "conversationHistory": []
}
```

**POST** `/api/webhook/voice-agent` - Voice webhook integration
```json
{
  "message": "transcribed text",
  "sessionId": "unique-id",
  "metadata": { "timestamp": "..." }
}
```

## N8N Integration

To integrate with n8n for advanced voice processing:

1. Create a webhook trigger in n8n
2. Point it to: `http://localhost:5000/api/webhook/voice-agent`
3. Add speech-to-text and processing nodes
4. Return response back to frontend

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed setup.

## Project Structure

```
dating-advice-site/
├── public/                    # Static files
├── src/
│   ├── components/           # React components
│   │   ├── Header.js
│   │   ├── VoiceAgent.js
│   │   ├── DetailedInput.js
│   │   ├── AdviceSection.js
│   │   └── Footer.js
│   ├── contexts/             # React context
│   │   └── ThemeContext.js
│   ├── services/             # API services
│   │   └── openrouterService.js
│   ├── data/                 # Static data
│   │   └── adviceTopics.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── server.js                 # Express backend
├── package.json
├── .env                      # Environment variables
└── BACKEND_SETUP.md          # Backend documentation
```

## Styling Features

- **Custom CSS Variables** for theme switching
- **Inter Font** for modern, clean typography
- **Playfair Display** for elegant headings
- **Smooth Animations** with Framer Motion
- **Responsive Grid Layouts**
- **Dark/Light Mode Support**

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_OPENROUTER_API_KEY` | OpenRouter API key | ✅ |
| `REACT_APP_BACKEND_URL` | Backend URL (dev: localhost:5000) | ✅ |
| `REACT_APP_FRONTEND_URL` | Frontend URL (dev: localhost:3000) | ✅ |
| `OPENROUTER_API_KEY` | Backend API key (same as frontend) | ✅ |
| `PORT` | Backend port (default: 5000) | ❌ |
| `NODE_ENV` | Environment (development/production) | ❌ |
| `N8N_WEBHOOK_URL` | n8n webhook URL | ❌ |
| `N8N_API_KEY` | n8n API key | ❌ |

## Troubleshooting

### "API Key not configured"
- Check `.env` file exists in root directory
- Verify `REACT_APP_OPENROUTER_API_KEY` is set
- Restart dev server after updating .env

### CORS Errors
- Ensure backend is running: `npm run server:dev`
- Check `REACT_APP_BACKEND_URL` matches backend URL
- Frontend must be on `http://localhost:3000`

### Voice Not Working
- Check browser supports Web Speech API (Chrome, Edge, Safari)
- Grant microphone permissions
- Check browser console for errors

### Chat Not Responding
- Test backend: `curl http://localhost:5000/api/health`
- Verify OpenRouter API key is valid
- Check network tab in browser dev tools

## Deployment

### Frontend (Vercel/Netlify)
1. Connect your GitHub repo
2. Set environment variables in deployment settings
3. Deploy branch: main

### Backend (Heroku/Railway)
1. Push to GitHub
2. Connect repo to deployment service
3. Set environment variables
4. Deploy

## Technologies Used

- **React 19** - UI Framework
- **Framer Motion** - Animations
- **Express.js** - Backend server
- **OpenRouter API** - AI Model (Google Gemini 2.0 Flash)
- **Web Speech API** - Voice input
- **CSS Variables** - Dynamic theming

## License

MIT

## Support

For issues or questions:
1. Check [BACKEND_SETUP.md](./BACKEND_SETUP.md) for backend configuration
2. Review console errors in browser dev tools
3. Test API endpoints with curl or Postman

---

Made with ❤️ for better relationships

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
