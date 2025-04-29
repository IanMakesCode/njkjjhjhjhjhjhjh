const inputField = document.getElementById("input");
const terminal = document.getElementById("terminal");

// Function to send the query to your backend
async function fetchAIResponse(query) {
    const response = await fetch("/api/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: query })
    });
    const data = await response.json();
    return data.response; // Adjust based on your backend response structure
}

inputField.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
        const query = inputField.value;
        terminal.textContent += `> ${query}\n`;
        inputField.value = "";

        // Fetch AI response
        const aiResponse = await fetchAIResponse(query);
        terminal.textContent += `${aiResponse}\n`;
    }
});
