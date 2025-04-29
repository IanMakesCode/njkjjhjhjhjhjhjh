app.post("/api/send", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
    }

    try {
        const apiResponse = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4", // Change model to 'gpt-4'
                prompt: prompt,
                max_tokens: 4096, // Customize token limit based on your requirements
            }),
        });

        if (!apiResponse.ok) {
            throw new Error(`API error: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        res.json({ response: data.choices[0].text.trim() });
    } catch (error) {
        console.error("Error with OpenAI API:", error.message);
        res.status(500).json({ error: "Failed to process the request." });
    }
});
