export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ text: 'No prompt given' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ text: 'ERROR: GROQ_API_KEY not set in Vercel! Go to Vercel → Settings → Environment Variables' });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are KTIX AI, expert in premium US website copy. Give hero title, tagline, and 3 premium colors.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.8
      })
    });

    const data = await groqRes.json();
    
    if (!groqRes.ok) {
      return res.status(500).json({ text: `Groq Error: ${JSON.stringify(data)}` });
    }

    const text = data.choices?.[0]?.message?.content || 'No response from AI';
    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ text: 'Server Error: ' + e.message });
  }
}
