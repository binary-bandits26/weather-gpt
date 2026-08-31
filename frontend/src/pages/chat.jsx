import { useState, useEffect, useRef } from "react";
import NavBar from "../components/navBar.jsx";
import InputBox from "../components/inputBox.jsx";
import Button from "../components/button.jsx";
import ChatCard from "../components/chatCard.jsx";
import Loader from "../components/loader.jsx";
import useChat from "../hooks/useChat.js";

function Chat() {
  const { messages, input, setInput, loading, sendMessage } = useChat();
  const [streamIndex, setStreamIndex] = useState(-1);
  const [visibleWords, setVisibleWords] = useState(0);
  const scrollRef = useRef(null);
  const lastStreamedRef = useRef(-1);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const lastAIIndex = messages.map((m) => m.role).lastIndexOf("ai");

  useEffect(() => {
    if (lastAIIndex === -1 || lastAIIndex <= lastStreamedRef.current) return;
    lastStreamedRef.current = lastAIIndex;
    setStreamIndex(lastAIIndex);
    setVisibleWords(0);
    const wordCount = (messages[lastAIIndex].message || "").split(" ").length;

    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setVisibleWords(count);
      if (count >= wordCount) {
        clearInterval(interval);
        setStreamIndex(-1);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [lastAIIndex, loading, messages]);

  return (
    <div className="h-svh overflow-hidden bg-gray-950 text-gray-100 flex flex-col">
      <NavBar />

      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto mx-auto w-full max-w-3xl px-4 pt-24 pb-6 chat-scrollbar [mask-image:linear-gradient(to_bottom,transparent,black_2rem,black_calc(100%-2rem),transparent)]"
      >
        <div className="flex flex-col gap-4">
          {messages.map((msg, index) => (
            <ChatCard
              key={index}
              message={msg.message}
              role={msg.role}
              visibleWords={
                index === streamIndex ? visibleWords : undefined
              }
            />
          ))}

          {loading && (
            <div className="flex w-full justify-start">
              <div className="max-w-[70%] rounded-2xl px-4 py-3 text-sm bg-white/5 border border-white/10 text-left">
                <Loader />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 pb-6 pt-3 px-4 mx-auto w-full max-w-3xl flex gap-3 bg-gray-950/80 backdrop-blur-sm">
        <InputBox
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          text={loading ? "..." : "Send"}
          onClick={() => sendMessage(input)}
        />
      </div>
    </div>
  );
}

export default Chat;
