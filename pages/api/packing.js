// pages/api/packing.js

// Helper: pull the first valid {...} JSON object out of a chatty LLM response
function extractJSONBlock(text) {
  if (!text) return null;

  const firstBrace = text.indexOf('{');
  if (firstBrace === -1) return null;

  let depth = 0;
  for (let i = firstBrace; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') depth++;
    else if (ch === '}') depth--;

    if (depth === 0) {
      // we closed the top-level object
      const candidate = text.slice(firstBrace, i + 1);
      return candidate;
    }
  }

  return null;
}

// THIS IS AN API ROUTE. NO HOOKS. NO JSX.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // only allow POST
    return res.status(405).json({ error: 'use POST' });
  }

  const { destination, vibe, dates } = req.body || {};

  const prompt = `
You are TripMuse, an expert travel pack assistant.

Create a packing checklist for this trip:
- Destination: ${destination}
- Vibe / Style: ${vibe}
- Dates / Season: ${dates}

Return ONLY valid JSON. Do not include any explanation, intro text, or markdown fences.
Shape must be exactly:

{
 "Clothing": [{"label": "light jacket","packed": false}, ...],
 "Toiletries": [...],
 "Tech / Essentials": [...],
 "Documents / Money": [...]
}

- Use short item labels.
- "packed" must be false for all items initially.
- Keep it practical, weather-aware, and minimal.
`.trim();

  try {
    // talk to local Ollama
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
    const raw = data.response || "";

    let categories = null;

    // try direct parse first
    try {
      categories = JSON.parse(raw);
    } catch (e1) {
      // if llama said "Here is the list:" first, extract just the { ... }
      const cleaned = extractJSONBlock(raw);
      if (cleaned) {
        try {
          categories = JSON.parse(cleaned);
        } catch (e2) {
          console.error("Second parse failed:", e2);
        }
      }
    }

    // Fallback if parsing failed or response empty
    if (!categories || typeof categories !== 'object') {
      console.error("Failed to parse Ollama packing JSON. Raw was:\n", raw);

      categories = {
        "Clothing":[
          {"label":"T-shirt","packed":false},
          {"label":"Comfortable walking shoes","packed":false},
          {"label":"Light jacket","packed":false}
        ],
        "Toiletries":[
          {"label":"Toothbrush","packed":false},
          {"label":"Travel-size sunscreen","packed":false},
          {"label":"Deodorant (travel size)","packed":false}
        ],
        "Tech / Essentials":[
          {"label":"Phone charger","packed":false},
          {"label":"Portable battery","packed":false},
          {"label":"Power adapter","packed":false}
        ],
        "Documents / Money":[
          {"label":"Passport / ID","packed":false},
          {"label":"Credit card","packed":false}
        ]
      };
    }

    // success
    return res.status(200).json({ categories });

  } catch (err) {
    // if Ollama itself threw, still respond with fallback instead of crashing
    console.error("Packing API error:", err);
    return res.status(200).json({
      categories: {
        "Clothing":[
          {"label":"Breathable shirt","packed":false},
          {"label":"Comfortable shoes","packed":false}
        ],
        "Toiletries":[
          {"label":"Toothbrush","packed":false},
          {"label":"Deodorant (travel size)","packed":false}
        ],
        "Tech / Essentials":[
          {"label":"Phone charger","packed":false},
          {"label":"Portable battery","packed":false}
        ],
        "Documents / Money":[
          {"label":"Passport / ID","packed":false},
          {"label":"Credit card","packed":false}
        ]
      }
    });
  }
}
