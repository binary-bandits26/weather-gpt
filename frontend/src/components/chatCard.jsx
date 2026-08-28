function ChatCard({ message, role }) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm text-center ${
          isUser
            ? "bg-blue-600/80 text-white"
            : "bg-white/5 text-gray-100 border border-white/10"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default ChatCard;
