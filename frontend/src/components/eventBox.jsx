function EventBox({ text }) {
  return (
    <div
      className="rounded-2xl bg-white/5 border border-white/10 px-6 py-4 flex items-center justify-center"
      style={{ animation: "fade-in-up 0.6s ease-out both" }}
    >
      <span
        className="text-xl font-bold text-white"
        style={{ animation: "bounce-continuous 2s ease-in-out infinite" }}
      >
        {text}
      </span>
    </div>
  );
}

export default EventBox;
