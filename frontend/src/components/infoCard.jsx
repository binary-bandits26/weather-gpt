function InfoCard({ logo, num, title }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col items-center gap-3">
      {logo && <div className="w-8 h-8">{logo}</div>}
      {num && (
        <span className="text-2xl font-bold text-white">{num}</span>
      )}
      {title && (
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {title}
        </h3>
      )}
    </div>
  );
}

export default InfoCard;
