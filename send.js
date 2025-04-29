import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ error: "Prompt is required." });
      return;
    }

    try {
      const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "o4-mini-2025-04-16", // Using the specified snapshot
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
          ],
          max_tokens: 4096,
        }),
      });

      if (!apiResponse.ok) {
        throw new Error(`API error: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      res.status(200).json({ response: data.choices[0].message.content.trim() });
    } catch (error) {
      console.error("Error with OpenAI API:", error.message);
      res.status(500).json({ error: "Failed to process the request." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
