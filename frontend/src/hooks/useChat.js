import { useState } from "react";
import axios from "axios";

function useChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (text) => {
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
  };

  return { messages, input, setInput, loading, error, sendMessage };
}

export default useChat;
