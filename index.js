import { useState } from "react";
import styles from "./styles.module.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [terminalText, setTerminalText] = useState("> Welcome to the AI Terminal! Type your query below:\n\n");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      setTerminalText((prev) => prev + `> ${query}\n`);
      setQuery("");

      try {
        const response = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: query }),
        });

        const data = await response.json();
        setTerminalText((prev) => prev + `${data.response}\n`);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setTerminalText((prev) => prev + "Error: Unable to fetch a response from the server.\n");
      }
    }
  };

  return (
    <div className={styles.container}>
      <pre className={styles.terminal}>{terminalText}</pre>
      <input
        type="text"
        className={styles.input}
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        autoFocus
      />
    </div>
  );
}
