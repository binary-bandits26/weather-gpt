import { Calendar, CloudRain, Sun, CloudLightning, Droplets } from 'lucide-react';
import { formatTemperature, formatDayName, formatDateFull } from '../../utils/formatters';
import { getWmoInfo } from '../../utils/weatherUtils';
import useStore from '../../store/useStore';

export const ForecastStrip = ({ daily = [] }) => {
  const units = useStore((state) => state.units);
  if (!daily || daily.length === 0) return null;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-5 shadow-xl backdrop-blur-xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            7-Day Forecast Outlook
          </h3>
        </div>
        <span className="text-xs text-slate-400">Open-Meteo Daily Model</span>
      </div>

      <div className="space-y-2">
        {daily.map((day, idx) => {
          const wmo = getWmoInfo(day.weatherCode);
          const isToday = idx === 0;

          return (
            <div
              key={day.date}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isToday
                  ? 'bg-cyan-950/30 border-cyan-500/30'
                  : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/60'
              }`}
            >
              {/* Day Name & Date */}
              <div className="w-24 sm:w-32">
                <div className="font-bold text-xs sm:text-sm text-white">
                  {isToday ? 'Today' : formatDayName(day.date, 'en-US', false)}
                </div>
                <div className="text-[10px] text-slate-400">
                  {formatDateFull(day.date)}
                </div>
              </div>

              {/* Weather Condition & Icon */}
              <div className="flex items-center gap-2 flex-1 max-w-[180px]">
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  {day.weatherCode >= 95 ? (
                    <CloudLightning className="w-4 h-4 text-amber-400" />
                  ) : day.weatherCode >= 51 ? (
                    <CloudRain className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-400" />
                  )}
                </div>
                <span className="text-xs font-medium text-slate-300 truncate hidden sm:inline">
                  {wmo.label}
                </span>
              </div>

              {/* Rain Chance */}
              <div className="flex items-center gap-1 text-xs text-cyan-300 font-semibold w-16">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                <span>{day.precipProbMax}%</span>
              </div>

              {/* Min / Max Temp Bar */}
              <div className="flex items-center gap-2.5 text-right">
                <span className="text-xs text-slate-400 font-medium">
                  {formatTemperature(day.tempMin, units)}
                </span>

                <div className="hidden sm:block w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-red-500"
                    style={{
                      marginLeft: `${Math.max(0, Math.min(60, (day.tempMin / 45) * 100))}%`,
                      width: `${Math.max(20, Math.min(80, ((day.tempMax - day.tempMin) / 20) * 100))}%`,
                    }}
                  />
                </div>

                <span className="text-xs sm:text-sm font-bold text-white min-w-[32px]">
                  {formatTemperature(day.tempMax, units)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
