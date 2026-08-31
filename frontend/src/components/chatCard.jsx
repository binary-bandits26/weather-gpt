import { motion } from "motion/react";

function ChatCard({ message, role, visibleWords }) {
  const isUser = role === "user";
  const words = (message || "").split(" ");
  const shown = visibleWords ? words.slice(0, visibleWords) : words;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
          isUser
            ? "bg-blue-600/80 text-white text-right"
            : "bg-white/5 text-gray-100 border border-white/10 text-left"
        }`}
      >
        {shown.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block mr-1"
            style={{
              filter: "blur(6px)",
              opacity: 0,
            }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default ChatCard;
