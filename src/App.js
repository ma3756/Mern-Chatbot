import React, { useState } from "react";
import "./Chat.css";

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { text: input, user: true }]);
        setInput("");

        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            console.log("Bot Response:", data);

            setMessages((prevMessages) => [...prevMessages, { text: data.reply, user: false }]);
        } catch (error) {
            console.error("Fetch error:", error);
            setMessages((prevMessages) => [...prevMessages, { text: "Error: Unable to fetch response.", user: false }]);
        }
    };

    return (
        <div className="chat-container">
            <h1>Chatbot</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <p key={index} className={msg.user ? "user-msg" : "bot-msg"}>
                        <strong>{msg.user ? "User:" : "Bot:"} </strong> {msg.text}
                    </p>
                ))}
            </div>
            <div className="input-area">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..." 
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;
