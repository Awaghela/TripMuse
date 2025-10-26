export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'use POST' });
  }

  const { destination, vibe } = req.body;

  const prompt = `
You are TripMuse, a poetic travel moodboard generator.
Write a 4-5 sentence "trip vibe" description for a traveler going to ${destination}.
Overall mood: ${vibe}.
Style: dreamy, cinematic, sensory. Mention what it feels like to arrive, what the air smells like,
what the nights feel like, and one specific small detail they should look forward to.
Do NOT use bullet points. Just flowing prose.
  `.trim();

  try {
    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false
      })
    });

    const data = await ollamaRes.json();

    return res.status(200).json({
      vibe: data.response || ""
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      vibe: "Soft lantern light and warm street steam, a city that hums even after midnight..."
    });
  }
}
