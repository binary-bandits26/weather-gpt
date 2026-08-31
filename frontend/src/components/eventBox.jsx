import { motion } from "motion/react";

function EventBox({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-2xl bg-white/5 border border-white/10 px-6 py-4 flex items-center justify-center"
    >
      <motion.span
        className="text-xl font-bold text-white"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

export default EventBox;
