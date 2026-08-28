import React from 'react';

export const WeatherBackground = ({ weatherCode = 0, isDay = true }) => {
  // Determine ambient sky aura based on weather and day/night
  const isRain = weatherCode >= 51 && weatherCode <= 67;
  const isThunder = weatherCode >= 95;
  const isCloudy = weatherCode >= 1 && weatherCode <= 3;
  const isSnow = weatherCode >= 71 && weatherCode <= 77;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic ambient gradients */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isThunder
            ? 'bg-gradient-to-b from-purple-950/40 via-slate-950 to-navy-950'
            : isRain
            ? 'bg-gradient-to-b from-blue-950/40 via-slate-950 to-navy-950'
            : isCloudy
            ? 'bg-gradient-to-b from-slate-900/40 via-navy-900 to-navy-950'
            : isDay
            ? 'bg-gradient-to-b from-cyan-950/20 via-navy-900 to-navy-950'
            : 'bg-gradient-to-b from-indigo-950/30 via-slate-950 to-navy-950'
        }`}
      />

      {/* Floating Glowing Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Subtle Rain Streaks Effect if rainy */}
      {isRain && (
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#67e8f9_1px,transparent_1px)] [background-size:16px_24px] animate-pulse" />
      )}

      {/* Thunder Glow Effect */}
      {isThunder && (
        <div className="absolute inset-0 bg-indigo-500/5 animate-pulse" style={{ animationDuration: '4s' }} />
      )}

      {/* Subtle Grid overlay for high-tech meteorological dashboard look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};
