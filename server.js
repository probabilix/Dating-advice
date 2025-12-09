require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Log function
const log = (msg) => {
  const timestamp = new Date().toISOString();
  const logMsg = `[${timestamp}] ${msg}\n`;
  console.log(logMsg.trim());
  fs.appendFileSync('server.log', logMsg);
};

log('Starting server...');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health endpoint
app.get('/api/health', (req, res) => {
  log('Health check requested');
  res.json({ status: 'ok' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    log(`Chat request: ${message}`);

    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: 'You are a helpful relationship coach.' }]
        },
        contents: [{ role: 'user', parts: [{ text: message }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
      })
    });

    if (!response.ok) {
      const err = await response.json();
      log(`API error: ${JSON.stringify(err)}`);
      return res.status(500).json({ error: 'API failed' });
    }

    const data = await response.json();
    let responseText = '';
    
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      responseText = data.candidates[0].content.parts[0].text;
    }

    log(`Response: ${responseText.substring(0, 50)}...`);
    res.json({ message: responseText });

  } catch (error) {
    log(`Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint
app.post('/api/webhook/voice-agent', (req, res) => {
  res.json({ success: true });
});

// Start server
const server = app.listen(PORT, () => {
  log(`🚀 Backend running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  log(`Server error: ${err.message}`);
});

process.on('SIGTERM', () => {
  log('SIGTERM received, closing server');
  process.exit(0);
});

process.on('SIGINT', () => {
  log('SIGINT received, closing server');
  process.exit(0);
});