function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-500"
    >
      {text}
    </button>
  );
}

export default Button;
