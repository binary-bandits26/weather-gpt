function InfoCard({ title, content }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
      <h3 className="text-sm font-semibold text-blue-400 mb-2">{title}</h3>
      <p className="text-sm text-gray-200">{content}</p>
    </div>
  );
}

export default InfoCard;
