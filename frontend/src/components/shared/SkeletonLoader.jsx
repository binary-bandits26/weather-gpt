export const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'hero') {
    return (
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-6 animate-pulse">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="space-y-2">
            <div className="h-7 w-48 bg-slate-800 rounded-lg" />
            <div className="h-4 w-64 bg-slate-850 rounded" />
          </div>
          <div className="h-6 w-24 bg-slate-800 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl shrink-0" />
            <div className="space-y-2">
              <div className="h-12 w-28 bg-slate-800 rounded-xl" />
              <div className="h-4 w-20 bg-slate-850 rounded" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="h-4 w-full bg-slate-800 rounded" />
            <div className="h-4 w-3/4 bg-slate-800 rounded" />
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="h-4 w-full bg-slate-800 rounded" />
            <div className="h-4 w-1/2 bg-slate-800 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="h-3 w-12 bg-slate-800 rounded" />
              <div className="h-6 w-16 bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'hourly') {
    return (
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3 animate-pulse">
        <div className="h-5 w-40 bg-slate-800 rounded" />
        <div className="flex gap-3 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="min-w-[80px] p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col items-center space-y-2">
              <div className="h-3 w-8 bg-slate-800 rounded" />
              <div className="w-8 h-8 rounded-full bg-slate-800" />
              <div className="h-4 w-10 bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4 animate-pulse">
      <div className="h-6 w-1/3 bg-slate-800 rounded" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-800/60 rounded" />
        <div className="h-4 w-5/6 bg-slate-800/60 rounded" />
        <div className="h-4 w-4/6 bg-slate-800/60 rounded" />
      </div>
    </div>
  );
};
