const express = require("express");
const fetch = require("node-fetch"); // Make sure you have 'node-fetch' installed
const dotenv = require("dotenv"); // For storing API key securely in a .env file

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

app.post("/api/send", async (req, res) => {
    const { prompt } = req.body;

    try {
        const apiResponse = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // Use API key from .env file
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "text-davinci-003", // Specify the model you want to use
                prompt: prompt,
                max_tokens: 100, // Customize the token limit as needed
            }),
        });

        const data = await apiResponse.json();
        res.json({ response: data.choices[0].text.trim() });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        res.status(500).json({ error: "Failed to process the request." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
// Ensure you have a .env file with your OpenAI API key