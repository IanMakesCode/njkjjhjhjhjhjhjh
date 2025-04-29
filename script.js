const inputField = document.getElementById("input");
const terminal = document.getElementById("terminal");

// Function to send the query to the backend
async function fetchAIResponse(query) {
    try {
        const response = await fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: query })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error: Unable to fetch a response from the server.";
    }
}

inputField.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
        const query = inputField.value;
        if (query.trim() === "") return; // Ignore empty input

        terminal.textContent += `> ${query}\n`;
        inputField.value = "";

        const aiResponse = await fetchAIResponse(query);
        terminal.textContent += `${aiResponse}\n`;
    }
});
