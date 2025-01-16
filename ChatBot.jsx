import React, { useState } from "react";

function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userInput }),
      });
      const data = await response.json();
      const botMessage = { sender: "bot", text: data.response };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: "bot", text: "Something went wrong. Please try again later." };
      setChatHistory((prev) => [...prev, errorMessage]);
    }

    setUserInput("");
  };

  return (
    <div style={{ width: "400px", margin: "20px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h3>Tourism Chatbot</h3>
      <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "10px" }}>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "5px 0",
              padding: "5px",
              backgroundColor: msg.sender === "user" ? "#d4f8e8" : "#f4f4f4",
              borderRadius: "10px",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ flex: 1, padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          placeholder="Ask something..."
        />
        <button onClick={handleSend} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#4caf50", color: "#fff" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
