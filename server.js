const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Updated with `mern-chatbot` Database Name)
mongoose.connect("mongodb://127.0.0.1:27017/mern-chatbot").then(() => console.log("MongoDB Connected to 'mern-chatbot'"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Chat Schema
const chatSchema = new mongoose.Schema({
    sender: String,  // "User" or "Bot"
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model("Chat", chatSchema);

// Hugging Face API Configuration
const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
const API_KEY = process.env.HUGGINGFACE_API_KEY; // Add this in .env file

// Chatbot Route
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    // Save User Message
    await Chat.create({ sender: "User", message });

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: message })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Hugging Face API Error:", data.error);
            return res.status(500).json({ error: "Error getting response from AI" });
        }

        const botReply = data[0]?.generated_text || "I couldn't process your request.";

        // Save Bot Response
        await Chat.create({ sender: "Bot", message: botReply });

        res.json({ reply: botReply });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to Fetch Chat History
app.get("/history", async (req, res) => {
    try {
        const chatHistory = await Chat.find().sort({ timestamp: 1 });
        res.json(chatHistory);
    } catch (error) {
        res.status(500).json({ error: "Error fetching chat history" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
