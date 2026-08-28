import { CloudRain, Sun, CloudLightning, Clock, Droplets } from 'lucide-react';
import { formatTemperature, formatTime } from '../../utils/formatters';
import { getWmoInfo } from '../../utils/weatherUtils';
import useStore from '../../store/useStore';

export const HourlyForecast = ({ hourly = [] }) => {
  const units = useStore((state) => state.units);
  if (!hourly || hourly.length === 0) return null;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Hourly Forecast (Next 24 Hours)
          </h3>
        </div>
        <span className="text-xs text-slate-400">Open-Meteo Hourly Model</span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-cyan-500/20">
        {hourly.slice(0, 24).map((h, i) => {
          const wmo = getWmoInfo(h.weatherCode);
          return (
            <div
              key={i}
              className={`flex flex-col items-center justify-between p-3 rounded-xl min-w-[80px] border transition-all ${
                i === 0
                  ? 'bg-cyan-950/40 border-cyan-500/40 shadow-sm ring-1 ring-cyan-400/30'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <span className="text-xs font-semibold text-slate-300">
                {i === 0 ? 'Now' : formatTime(h.time)}
              </span>

              <div className="my-2">
                {h.weatherCode >= 95 ? (
                  <CloudLightning className="w-5 h-5 text-amber-400" />
                ) : h.weatherCode >= 51 ? (
                  <CloudRain className="w-5 h-5 text-cyan-400" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-400" />
                )}
              </div>

              <div className="text-sm font-bold text-white">
                {formatTemperature(h.temp, units)}
              </div>

              <div className="mt-1.5 flex items-center gap-1 text-[10px] text-cyan-300 font-medium">
                <Droplets className="w-3 h-3 text-cyan-400" />
                <span>{h.precipProb}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
