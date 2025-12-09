#!/usr/bin/env node
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('[CHAT] Received:', message);
    
    if (!message) return res.status(400).json({ error: 'Message required' });

    const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'API key missing' });

    console.log('[CHAT] API Key:', apiKey.substring(0, 10) + '...');
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    console.log('[CHAT] URL:', url.substring(0, 80) + '...');

    const requestBody = {
      system_instruction: { 
        parts: [{ text: 'You are a helpful relationship coach. Keep responses under 150 words.' }] 
      },
      contents: [{ 
        role: 'user', 
        parts: [{ text: message }] 
      }],
      generationConfig: { 
        temperature: 0.7, 
        maxOutputTokens: 300 
      }
    };

    console.log('[CHAT] Request body:', JSON.stringify(requestBody).substring(0, 100) + '...');

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    console.log('[CHAT] Response status:', response.status);
    console.log('[CHAT] Response headers:', response.headers.get('content-type'));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[CHAT] Error response:', errorText);
      return res.status(500).json({ error: 'API error: ' + errorText });
    }

    const data = await response.json();
    console.log('[CHAT] Response data:', JSON.stringify(data).substring(0, 200) + '...');
    
    let responseText = '';
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      responseText = data.candidates[0].content.parts[0].text;
    }

    console.log('[CHAT] Response text:', responseText.substring(0, 100) + '...');
    res.json({ message: responseText });
  } catch (error) {
    console.error('[CHAT] Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Webhook
app.post('/api/webhook/voice-agent', (req, res) => {
  res.json({ success: true });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
  process.exit(1);
});


