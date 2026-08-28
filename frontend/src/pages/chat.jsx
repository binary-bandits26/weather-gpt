import NavBar from "../components/navBar.jsx";
import InputBox from "../components/inputBox.jsx";
import Button from "../components/button.jsx";
import ChatCard from "../components/chatCard.jsx";
import useChat from "../hooks/useChat.js";

function Chat() {
  const { messages, input, setInput, loading, sendMessage } = useChat();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <NavBar />

      <div className="flex-1 flex flex-col px-4 pt-28 pb-6 mx-auto w-full max-w-3xl">
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <ChatCard key={index} message={msg.message} role={msg.role} />
          ))}
        </div>

        <div className="flex gap-3 mt-4">
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
    </div>
  );
}

export default Chat;
