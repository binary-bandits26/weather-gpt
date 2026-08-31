import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const STORAGE_KEY = "chatMessages";

function loadMessages() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function useChat() {
  const [messages, setMessages] = useState(loadMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore persistence errors
    }
  }, [messages]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { message: text, role: "user" }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/v1/chat", { userQuery: text });
      setMessages((prev) => [
        ...prev,
        { message: res.data.ai, role: "ai" },
      ]);
    } catch {
      setError("Failed to get response from the server.");
      setMessages((prev) => [
        ...prev,
        { message: "Something went wrong. Please try again.", role: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { messages, input, setInput, loading, error, sendMessage };
}

export default useChat;
