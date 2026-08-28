function InputBox({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Type your message..."
      className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-gray-100 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-blue-500"
    />
  );
}

export default InputBox;
