import React, { useState } from "react";
import axios from "axios";
import "./AIChatbot.css";

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ typing indicator state

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setLoading(true); // 👈 AI typing starts

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        message: userText,
      });

      // Add bot message
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I’m having trouble right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false); // 👈 AI typing ends
    }
  };

  return (
    <>
      <button className="ai-chat-toggle" onClick={() => setOpen(!open)}>
        💄 AI Beauty Assistant
      </button>

      {open && (
        <div className="ai-chatbox">
          <div className="ai-chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "user" ? "user-msg" : "bot-msg"}
              >
                {msg.text}
              </div>
            ))}

            {/* ✅ Typing Indicator */}
            {loading && (
              <div className="bot-msg typing">
                AI is typing<span className="dots">...</span>
              </div>
            )}
          </div>

          <div className="ai-chat-input">
            <input
              placeholder="Ask about skincare, makeup..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
