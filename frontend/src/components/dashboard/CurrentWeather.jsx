import {
  Sun,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Activity,
  Compass,
} from 'lucide-react';
import { formatTemperature, formatWindSpeed, formatPressure, formatVisibility, formatTime } from '../../utils/formatters';
import { getWmoInfo, getAQIInfo, getUVInfo } from '../../utils/weatherUtils';
import useStore from '../../store/useStore';

export const CurrentWeather = ({ data, location }) => {
  const units = useStore((state) => state.units);
  if (!data || !data.current) return null;

  const cur = data.current;
  const d0 = data.daily?.[0] || {};
  const wmo = getWmoInfo(cur.weatherCode);
  const aqi = getAQIInfo(cur.aqi);
  const uv = getUVInfo(cur.uvIndex);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-cyan-950/30 border border-slate-700/80 p-6 shadow-xl backdrop-blur-xl space-y-6">
      
      {/* Top Bar: Location & Station status */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {location?.city || 'Selected Station'}
            </h2>
            {location?.state && (
              <span className="text-sm font-medium text-slate-400">
                ({location.state})
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Coordinates: {data.latitude?.toFixed(2)}° N, {data.longitude?.toFixed(2)}° E • Elevation {data.elevation}m
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Live Weather (Open-Meteo)
          </span>
        </div>
      </div>

      {/* Main Hero Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Big Temp */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-inner shrink-0">
            {cur.weatherCode >= 95 ? (
              <CloudLightning className="w-10 h-10 text-amber-400 animate-pulse" />
            ) : cur.weatherCode >= 51 ? (
              <CloudRain className="w-10 h-10 text-cyan-400" />
            ) : (
              <Sun className="w-10 h-10 text-amber-400" />
            )}
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {formatTemperature(cur.temp, units)}
            </div>
            <div className="text-xs text-slate-300 mt-0.5 font-medium">
              Feels like <strong className="text-white">{formatTemperature(cur.feelsLike, units)}</strong>
            </div>
            <div className="text-xs text-cyan-400 font-semibold mt-0.5">
              {wmo.label}
            </div>
          </div>
        </div>

        {/* High/Low & Sunrise/Sunset */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Day Max / Min</span>
            <span className="font-bold text-white">
              {formatTemperature(d0.tempMax, units)} / {formatTemperature(d0.tempMin, units)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Sunrise className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-slate-400 text-[10px]">Sunrise</div>
                <div className="font-semibold text-slate-200">{formatTime(d0.sunrise)}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sunset className="w-4 h-4 text-orange-400" />
              <div>
                <div className="text-slate-400 text-[10px]">Sunset</div>
                <div className="font-semibold text-slate-200">{formatTime(d0.sunset)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Air Quality (AQI) Meter */}
        <div className={`p-4 rounded-xl border ${aqi.bg} ${aqi.border} space-y-2`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Activity className={`w-4 h-4 ${aqi.color}`} />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Air Quality (AQI)
              </span>
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${aqi.color} bg-slate-950/60`}>
              {aqi.label}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black ${aqi.color}`}>{cur.aqi}</span>
            <span className="text-xs text-slate-400">US AQI Standard</span>
          </div>

          <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-white/10 text-[10px] text-slate-300">
            <div>PM2.5: <strong className="text-white">{cur.pm2_5}</strong></div>
            <div>PM10: <strong className="text-white">{cur.pm10}</strong></div>
            <div>NO₂: <strong className="text-white">{cur.no2}</strong></div>
          </div>
        </div>

      </div>

      {/* Meteorological Micro-Sensors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-cyan-400 text-xs mb-1">
            <Droplets className="w-3.5 h-3.5" />
            <span className="text-slate-400 font-medium">Humidity</span>
          </div>
          <div className="text-base font-bold text-white">{cur.humidity}%</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-blue-400 text-xs mb-1">
            <Wind className="w-3.5 h-3.5" />
            <span className="text-slate-400 font-medium">Wind Speed</span>
          </div>
          <div className="text-base font-bold text-white">{formatWindSpeed(cur.windSpeed, units)}</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs mb-1">
            <Gauge className="w-3.5 h-3.5" />
            <span className="text-slate-400 font-medium">Pressure</span>
          </div>
          <div className="text-base font-bold text-white">{formatPressure(cur.pressure)}</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs mb-1">
            <Eye className="w-3.5 h-3.5" />
            <span className="text-slate-400 font-medium">Visibility</span>
          </div>
          <div className="text-base font-bold text-white">{formatVisibility(cur.visibility)}</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-purple-400 text-xs mb-1">
            <Sun className="w-3.5 h-3.5" />
            <span className="text-slate-400 font-medium">UV Index</span>
          </div>
          <div className="text-base font-bold text-white">{cur.uvIndex.toFixed(1)}</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-cyan-300 text-xs mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span className="text-slate-400 font-medium">Wind Angle</span>
          </div>
          <div className="text-base font-bold text-white">{cur.windDirection}°</div>
        </div>

      </div>

    </div>
  );
};
