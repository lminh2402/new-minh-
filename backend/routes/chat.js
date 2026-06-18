const express = require('express');
const router = express.Router();

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_KEYS = {
  guest: process.env.GROQ_API_KEY_LOGIN || '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',
  patient: process.env.GROQ_API_KEY_PATIENT || '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',
};

router.post('/', async (req, res) => {
  try {
    const { mode = 'guest', messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages is required' });
    }

    const apiKey = mode === 'patient' ? GROQ_KEYS.patient : GROQ_KEYS.guest;

    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      return res.status(groqRes.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error('Chat API error:', err);
    res.status(500).json({ error: 'Failed to reach Groq API' });
  }
});

module.exports = router;
