import React, { useState } from "react";
import { Bot, Send, User, Sparkles } from "lucide-react";

function Chat() {
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
      { role: "user", content: text },
    ]);
    setInput("");

    // Backend integration will be connected here.
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <section className="mx-auto flex h-[calc(100vh-2rem)] max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:h-[calc(100vh-3rem)]">
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Chat</h1>
              <p className="text-sm text-slate-500">Weather Assistant</p>
            </div>
          </div>

          <span className="flex items-center gap-2 text-sm text-slate-500">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Online
          </span>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  message.role === "assistant"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {message.role === "assistant" ? (
                  <Bot size={18} />
                ) : (
                  <User size={18} />
                )}
              </div>

              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "assistant"
                    ? "rounded-tl-sm bg-slate-100 text-slate-800"
                    : "rounded-tr-sm bg-blue-600 text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="border-t border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 p-2 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the weather..."
              aria-label="Message"
              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={19} />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Chat;
