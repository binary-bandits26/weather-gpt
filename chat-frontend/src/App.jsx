import React, { useState } from "react";
import { Bot, Send, User, Sparkles } from "lucide-react";
import "./index.css";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your weather assistant. Ask me about the current weather, forecast, temperature, or weather conditions.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();

    const text = input.trim();

    if (!text) return;

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: text,
      },
    ]);

    setInput("");
  };

  return (
    <main className="app-shell">
      <section className="chat-card">
        <header className="chat-header">
          <div className="brand">
            <div className="brand-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <h1>Chat</h1>
              <p>Weather Assistant</p>
            </div>
          </div>

          <span className="status">
            <i />
            Online
          </span>
        </header>

        <div className="messages">
          {messages.map((message, index) => (
            <div
              className={`message-row ${message.role}`}
              key={index}
            >
              <div className="avatar">
                {message.role === "assistant" ? (
                  <Bot size={18} />
                ) : (
                  <User size={18} />
                )}
              </div>

              <div className="bubble">
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <form className="composer" onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about the weather..."
            aria-label="Message"
          />

          <button type="submit" aria-label="Send message">
            <Send size={19} />
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;